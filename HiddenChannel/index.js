(function(f,i,c,s,y,I,L,P,A){"use strict";var r;(function(e){e[e.BUILT_IN=0]="BUILT_IN",e[e.BUILT_IN_TEXT=1]="BUILT_IN_TEXT",e[e.BUILT_IN_INTEGRATION=2]="BUILT_IN_INTEGRATION",e[e.BOT=3]="BOT",e[e.PLACEHOLDER=4]="PLACEHOLDER"})(r||(r={}));var m;(function(e){e[e.SUB_COMMAND=1]="SUB_COMMAND",e[e.SUB_COMMAND_GROUP=2]="SUB_COMMAND_GROUP",e[e.STRING=3]="STRING",e[e.INTEGER=4]="INTEGER",e[e.BOOLEAN=5]="BOOLEAN",e[e.USER=6]="USER",e[e.CHANNEL=7]="CHANNEL",e[e.ROLE=8]="ROLE",e[e.MENTIONABLE=9]="MENTIONABLE",e[e.NUMBER=10]="NUMBER",e[e.ATTACHMENT=11]="ATTACHMENT"})(m||(m={}));var u;(function(e){e[e.CHAT=1]="CHAT",e[e.USER=2]="USER",e[e.MESSAGE=3]="MESSAGE"})(u||(u={}));const{View:O,Text:g,Pressable:U}=i.findByProps("Button","Text","View"),C=i.findByProps("extractTimestamp"),o=s.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:s.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:A.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:A.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function h(e){let{date:t}=e;return React.createElement(U,{style:o.dateContainer,onPress:function(){s.toasts.open({content:s.moment(t).toLocaleString(),source:y.getAssetByName("clock").id})},onLongPress:function(){s.clipboard.setString(t.getTime().toString()),s.toasts.open({content:"Copied to clipboard"})}},React.createElement(g,{style:o.text},s.moment(t).fromNow()))}function S(e){let{channel:t}=e;return React.createElement(O,{style:o.container},React.createElement(g,{style:o.title},"This channel is hidden."),React.createElement(g,{style:o.text},"Topic: ",t.topic||"No topic.",`

`,"Creation date: ",React.createElement(h,{date:new Date(C.extractTimestamp(t.id))}),`

`,"Last message: ",t.lMsg?React.createElement(h,{date:new Date(C.extractTimestamp(t.lMsg))}):"No messages.",`

`,"Last pin: ",t.lastPinTimestamp?React.createElement(h,{date:new Date(t.lastPinTimestamp)}):"No pins."))}let d=[];const E=i.findByProps("sendBotMessage"),R=i.findByProps("getChannelPermissions","can"),D=i.findByProps("transitionToGuild"),H=i.findByProps("stores","fetchMessages"),{ChannelTypes:N}=i.findByProps("ChannelTypes"),{getChannel:k}=i.findByProps("getChannel"),{bulkAck:B}=i.findByProps("bulkAck"),x=[N.DM,N.GROUP_DM,N.GUILD_CATEGORY],p=new Map;function T(e){if(e==null||(typeof e=="string"&&(e=k(e)),!e||x.includes(e.type)))return!1;e.realCheck=!0;let t=!R.can(s.constants.Permissions.VIEW_CHANNEL,e);return delete e.realCheck,t}function G(e){var t=p.get(e.guild_id);t||(t=[]),t.includes(e.id)||t.push({channelId:e.id,messageId:e.lastMessageId}),p.set(e.guild_id,t)}let M,_;function v(){console.log("HiddenChannel 5.4 loaded"),M=I.registerCommand({name:"markhiddenread",displayName:"markhiddenread",description:"mark all hidden channels in this guild as read",displayDescription:"mark all hidden channels in this guild as read",options:[],inputType:r.BUILT_IN_TEXT,type:u.CHAT,execute:async function(t,n){try{return B(p.get(n.guild.id)),p.delete(n.guild.id),L.showToast("Marked all hidden channels as read",y.getAssetIDByName("check"))}catch(a){return console.log(a),P.logger.error(a),E.sendBotMessage(n.channel.id,"Error marking channels as read")}}}),_=I.registerCommand({name:"mutehidden",displayName:"mutehidden",description:"mute all hidden channels in this guild",displayDescription:"mute all hidden channels in this guild",options:[],inputType:r.BUILT_IN_TEXT,type:u.CHAT,execute:async function(t,n){}});const e=i.findByName("MessagesWrapperConnected",!1);d.push(c.after("can",R,function(t,n){let[a,l]=t;return!l?.realCheck&&a===s.constants.Permissions.VIEW_CHANNEL?(T(l)&&G(l),!0):n})),d.push(c.instead("transitionToGuild",D,function(t,n){const[a,l]=t;!T(l)&&typeof n=="function"&&n(t)})),d.push(c.instead("fetchMessages",H,function(t,n){const[a]=t;!T(a)&&typeof n=="function"&&n(t)})),d.push(c.instead("default",e,function(t,n){const a=t[0]?.channel;return!T(a)&&typeof n=="function"?n(...t):(B({channelId:a.id,messageId:a.lastMessageId}),s.React.createElement(S,{channel:a}))}))}var w={onLoad:v,onUnload:function(){M(),_();for(const e of d)e()}};return f.default=w,Object.defineProperty(f,"__esModule",{value:!0}),f})({},vendetta.metro,vendetta.patcher,vendetta.metro.common,vendetta.ui.assets,vendetta.commands,vendetta.ui.toasts,vendetta,vendetta.ui);
