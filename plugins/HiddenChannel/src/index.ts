import { findByName, findByStoreName, findByProps } from "@vendetta/metro";
import { constants, React } from "@vendetta/metro/common";
import { instead, after } from "@vendetta/patcher";
import HiddenChannel from "./HiddenChannel";

let patches = [];

const Permissions = findByProps("getChannelPermissions", "can");
const Router = findByProps("transitionToGuild");
const Fetcher = findByProps("stores", "fetchMessages");
const { ChannelTypes } = findByProps("ChannelTypes");
const {getChannel} = findByProps("getChannel");
const ReadStateStore = findByStoreName("ReadStateStore")

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
        if (channel.lMsg == undefined || channel.lMsg != channel.lastMessageId) channel.lMsg = channel.lastMessageId;
        channel.lastMessageId = undefined;
    }
}

function onLoad() {
    console.log("HiddenChannel loaded 3.5");
    const MessagesConnected = findByName("MessagesWrapperConnected", false);

    patches.push(instead("hasUnread", ReadStateStore, (args, orig) => {
        console.log("hasUnread ", args, orig);
        console.log(orig(args));
    }));

    patches.push(after("can", Permissions, ([permID, channel], res) => {
        if (!channel?.realCheck && permID === constants.Permissions.VIEW_CHANNEL) {
            channelOverride(channel);
            channel.lastMessageId = undefined;
            return true;
        };
        return res;
    }));

    patches.push(instead("transitionToGuild", Router, (args, orig) => {
        const [_, channel] = args;
        channelOverride(channel);
        if (!isHidden(channel) && typeof orig === "function") orig(args);
    }));

    patches.push(instead("fetchMessages", Fetcher, (args, orig) => {
        const [channel] = args;
        channelOverride(channel);
        console.log("fetchMessages", channel);
        console.log(args)
        if (!isHidden(channel) && typeof orig === "function") orig(args);
    }));

    patches.push(instead("default", MessagesConnected, (args, orig) => {
        const channel = args[0]?.channel;
        channelOverride(channel);
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