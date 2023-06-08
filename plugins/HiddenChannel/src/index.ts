import { findByName, findByStoreName, findByProps } from "@vendetta/metro";
import { constants, React } from "@vendetta/metro/common";
import { instead, after, before } from "@vendetta/patcher";
import HiddenChannel from "./HiddenChannel";

let patches = [];

const Permissions = findByProps("getChannelPermissions", "can");
const Router = findByProps("transitionToGuild");
const Fetcher = findByProps("stores", "fetchMessages");
const { ChannelTypes } = findByProps("ChannelTypes");
const {getChannel} = findByProps("getChannel");
const ReadStateStore = findByStoreName("ReadStateStore");
const ChannelStore = findByStoreName("ChannelStore");

const skipChannels = [
    ChannelTypes.DM, 
    ChannelTypes.GROUP_DM, 
    ChannelTypes.GUILD_CATEGORY
]

function isHidden(channel: any | undefined) {
    if (channel == undefined) return false;
    if (typeof channel === 'string')
        channel = getChannel(channel);
    if (!channel || skipChannels.includes(channel.type)) return false;
    channel.realCheck = true;
    let res = !Permissions.can(constants.Permissions.VIEW_CHANNEL, channel);
    delete channel.realCheck;
    return res;
}

function channelOverride(channel: any | undefined) {
    if(isHidden(channel)) {
        if ((channel.lMsg == undefined || channel.lMsg != channel.lastMessageId) && channel.lastMessageId != undefined) channel.lMsg = channel.lastMessageId;
        channel.lastMessageId = undefined;
    }
}

function onLoad() {
    console.log("HiddenChannel loaded 4.5");
    const MessagesConnected = findByName("MessagesWrapperConnected", false);

    
    console.log("Patch getForDebugging");
    const __tempPatch = after("getForDebugging", ReadStateStore, (_, ret) => {
        console.log("HiddenChannel: Patching channel overrides");
        patches.push(before("canBeUnread", ret.__proto__, function() {if (isHidden(getChannel(this.channelId))) return false;}));
        __tempPatch();
        return ret;
    });
    console.log("HiddenChannel: Patching channel overrides done");
    //ReadStateStore.getForDebugging(Object.keys(ChannelStore.__getLocalVars().guildChannels)[0])
    //console.log("HiddenChannel: Patching channel overrides done 2"); */
    
    patches.push(instead("hasUnread", ReadStateStore, (args, orig) => {
        const channel = getChannel(args[0]);
        if (isHidden(channel)) {
            ReadStateStore.getForDebugging(channel.id);
            return false;
        };
        return orig(args);
    }));

    patches.push(after("can", Permissions, ([permID, channel], res) => {
        if (!channel?.realCheck && permID === constants.Permissions.VIEW_CHANNEL) {
            return true;
        };
        return res;
    }));

    patches.push(instead("transitionToGuild", Router, (args, orig) => {
        const [_, channel] = args;
        if (!isHidden(channel) && typeof orig === "function") orig(args);
    }));

    patches.push(instead("fetchMessages", Fetcher, (args, orig) => {
        const [channel] = args;
        if (!isHidden(channel) && typeof orig === "function") orig(args);
    }));

    patches.push(instead("default", MessagesConnected, (args, orig) => {
        const channel = args[0]?.channel;
        if (!isHidden(channel) && typeof orig === "function") return orig(...args);
        else {return React.createElement(HiddenChannel, {channel})};
    }));
}

export default {
    onLoad,
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    }
}