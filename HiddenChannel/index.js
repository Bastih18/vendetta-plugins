(function(f,a,c,i,y,A,_,L,C){"use strict";var r;(function(e){e[e.BUILT_IN=0]="BUILT_IN",e[e.BUILT_IN_TEXT=1]="BUILT_IN_TEXT",e[e.BUILT_IN_INTEGRATION=2]="BUILT_IN_INTEGRATION",e[e.BOT=3]="BOT",e[e.PLACEHOLDER=4]="PLACEHOLDER"})(r||(r={}));var m;(function(e){e[e.SUB_COMMAND=1]="SUB_COMMAND",e[e.SUB_COMMAND_GROUP=2]="SUB_COMMAND_GROUP",e[e.STRING=3]="STRING",e[e.INTEGER=4]="INTEGER",e[e.BOOLEAN=5]="BOOLEAN",e[e.USER=6]="USER",e[e.CHANNEL=7]="CHANNEL",e[e.ROLE=8]="ROLE",e[e.MENTIONABLE=9]="MENTIONABLE",e[e.NUMBER=10]="NUMBER",e[e.ATTACHMENT=11]="ATTACHMENT"})(m||(m={}));var u;(function(e){e[e.CHAT=1]="CHAT",e[e.USER=2]="USER",e[e.MESSAGE=3]="MESSAGE"})(u||(u={}));const{View:P,Text:h,Pressable:O}=a.findByProps("Button","Text","View"),I=a.findByProps("extractTimestamp"),o=i.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:i.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:C.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:C.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function g(e){let{date:t}=e;return React.createElement(O,{style:o.dateContainer,onPress:function(){i.toasts.open({content:i.moment(t).toLocaleString(),source:y.getAssetByName("clock").id})},onLongPress:function(){i.clipboard.setString(t.getTime().toString()),i.toasts.open({content:"Copied to clipboard"})}},React.createElement(h,{style:o.text},i.moment(t).fromNow()))}function U(e){let{channel:t}=e;return React.createElement(P,{style:o.container},React.createElement(h,{style:o.title},"This channel is hidden."),React.createElement(h,{style:o.text},"Topic: ",t.topic||"No topic.",`

`,"Creation date: ",React.createElement(g,{date:new Date(I.extractTimestamp(t.id))}),`

`,"Last message: ",t.lMsg?React.createElement(g,{date:new Date(I.extractTimestamp(t.lMsg))}):"No messages.",`

`,"Last pin: ",t.lastPinTimestamp?React.createElement(g,{date:new Date(t.lastPinTimestamp)}):"No pins."))}let l=[];const S=a.findByProps("sendBotMessage"),R=a.findByProps("getChannelPermissions","can"),E=a.findByProps("transitionToGuild"),D=a.findByProps("stores","fetchMessages"),{ChannelTypes:N}=a.findByProps("ChannelTypes"),{getChannel:H}=a.findByProps("getChannel"),{bulkAck:k}=a.findByProps("bulkAck"),x=[N.DM,N.GROUP_DM,N.GUILD_CATEGORY],p=new Map;function T(e){if(e==null||(typeof e=="string"&&(e=H(e)),!e||x.includes(e.type)))return!1;e.realCheck=!0;let t=!R.can(i.constants.Permissions.VIEW_CHANNEL,e);return delete e.realCheck,t}function G(e){var t=p.get(e.guild_id);t||(t=[]),t.includes(e.id)||t.push({channelId:e.id,messageId:e.lastMessageId}),p.set(e.guild_id,t)}let B,M;function v(){console.log("HiddenChannel 5.3 loaded"),B=A.registerCommand({name:"markhiddenread",displayName:"markhiddenread",description:"mark all hidden channels in this guild as read",displayDescription:"mark all hidden channels in this guild as read",options:[],inputType:r.BUILT_IN_TEXT,type:u.CHAT,execute:async function(t,n){try{return k(p.get(n.guild.id)),p.delete(n.guild.id),_.showToast("Marked all hidden channels as read",y.getAssetIDByName("check"))}catch(s){return console.log(s),L.logger.error(s),S.sendBotMessage(n.channel.id,"Error marking channels as read")}}}),M=A.registerCommand({name:"mutehidden",displayName:"mutehidden",description:"mute all hidden channels in this guild",displayDescription:"mute all hidden channels in this guild",options:[],inputType:r.BUILT_IN_TEXT,type:u.CHAT,execute:async function(t,n){}});const e=a.findByName("MessagesWrapperConnected",!1);l.push(c.after("can",R,function(t,n){let[s,d]=t;return!d?.realCheck&&s===i.constants.Permissions.VIEW_CHANNEL?(T(d)&&G(d),!0):n})),l.push(c.instead("transitionToGuild",E,function(t,n){const[s,d]=t;!T(d)&&typeof n=="function"&&n(t)})),l.push(c.instead("fetchMessages",D,function(t,n){const[s]=t;!T(s)&&typeof n=="function"&&n(t)})),l.push(c.instead("default",e,function(t,n){const s=t[0]?.channel;return!T(s)&&typeof n=="function"?n(...t):i.React.createElement(U,{channel:s})}))}var w={onLoad:v,onUnload:function(){B(),M();for(const e of l)e()}};return f.default=w,Object.defineProperty(f,"__esModule",{value:!0}),f})({},vendetta.metro,vendetta.patcher,vendetta.metro.common,vendetta.ui.assets,vendetta.commands,vendetta.ui.toasts,vendetta,vendetta.ui);
