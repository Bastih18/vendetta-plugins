import { ApplicationCommandType, ApplicationCommandInputType } from "../../../ApplicationCommandTypes"
import { findByName, findByStoreName, findByProps } from "@vendetta/metro";
import { instead, after, before } from "@vendetta/patcher";
import { constants, React } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets"
import { registerCommand } from "@vendetta/commands"
import { showToast } from "@vendetta/ui/toasts"
import { logger } from "@vendetta"
import HiddenChannel from "./HiddenChannel";

let patches = [];

const ClydeUtils = findByProps("sendBotMessage")
const Permissions = findByProps("getChannelPermissions", "can");
const Router = findByProps("transitionToGuild");
const Fetcher = findByProps("stores", "fetchMessages");
const { ChannelTypes } = findByProps("ChannelTypes");
const {getChannel} = findByProps("getChannel");
const { bulkAck } = findByProps("bulkAck")
const ReadStateStore = findByStoreName("ReadStateStore");
const ChannelStore = findByStoreName("ChannelStore");

const skipChannels = [
    ChannelTypes.DM, 
    ChannelTypes.GROUP_DM, 
    ChannelTypes.GUILD_CATEGORY
]

const unreadChannels = new Map();

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

function addUnreadChannel(channel: any | undefined) {
    var guildUnread = unreadChannels.get(channel.guild_id)
    if (!guildUnread) guildUnread = [];
    if (!guildUnread.includes(channel.id)) guildUnread.push({channelId: channel.id, messageId: channel.lastMessageId});
    unreadChannels.set(channel.guild_id, guildUnread);
}

let readCmd = undefined;

function onLoad() {
    console.log("HiddenChannel 5.2 loaded");

    readCmd = registerCommand({
        name: "markhiddenread",
        displayName: "markhiddenread",
        description: "mark all hidden channels in this guild as read",
        displayDescription: "mark all hidden channels in this guild as read",
        options: [],
        inputType: ApplicationCommandInputType.BUILT_IN_TEXT as number,
        type: ApplicationCommandType.CHAT as number,
        execute: async (args, ctx) => {
            try {
                bulkAck(unreadChannels.get(ctx.guild.id));
                return showToast("Marked all hidden channels as read", getAssetIDByName("check"));
            } catch(e) {
                console.log(e);
                logger.error(e);
                return ClydeUtils.sendBotMessage(ctx.channel.id, "Error marking channels as read");
            }
        }
    })
    
    const MessagesConnected = findByName("MessagesWrapperConnected", false);
        
    patches.push(after("can", Permissions, ([permID, channel], res) => {
        if (!channel?.realCheck && permID === constants.Permissions.VIEW_CHANNEL) {
            if (isHidden(channel)) {
                addUnreadChannel(channel);
            }
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
        readCmd();
        for (const unpatch of patches) {
            unpatch();
        };
    }
}