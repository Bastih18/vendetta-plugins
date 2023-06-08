(function(u,i,s,r,h,E){"use strict";const{View:P,Text:g,Pressable:R}=i.findByProps("Button","Text","View"),M=i.findByProps("extractTimestamp"),l=s.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:s.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:h.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:h.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function p(e){let{date:t}=e;return React.createElement(R,{style:l.dateContainer,onPress:function(){s.toasts.open({content:s.moment(t).toLocaleString(),source:E.getAssetByName("clock").id})},onLongPress:function(){s.clipboard.setString(t.getTime().toString()),s.toasts.open({content:"Copied to clipboard"})}},React.createElement(g,{style:l.text},s.moment(t).fromNow()))}function m(e){let{channel:t}=e;return React.createElement(P,{style:l.container},React.createElement(g,{style:l.title},"This channel is hidden."),React.createElement(g,{style:l.text},"Topic: ",t.topic||"No topic.",`

`,"Creation date: ",React.createElement(p,{date:new Date(M.extractTimestamp(t.id))}),`

`,"Last message: ",t.lMsg?React.createElement(p,{date:new Date(M.extractTimestamp(t.lMsg))}):"No messages.",`

`,"Last pin: ",t.lastPinTimestamp?React.createElement(p,{date:new Date(t.lastPinTimestamp)}):"No pins."))}let c=[];const C=i.findByProps("getChannelPermissions","can"),I=i.findByProps("transitionToGuild"),T=i.findByProps("stores","fetchMessages"),{ChannelTypes:y}=i.findByProps("ChannelTypes"),{getChannel:x}=i.findByProps("getChannel"),v=[y.DM,y.GROUP_DM,y.GUILD_CATEGORY];function d(e){if(e==null||(typeof e=="string"&&(e=x(e)),!e||v.includes(e.type)))return!1;e.realCheck=!0;let t=!C.can(s.constants.Permissions.VIEW_CHANNEL,e);return delete e.realCheck,t}function f(e){d(e)&&((e.lMsg==null||e.lMsg!=e.lastMessageId)&&(e.lMsg=e.lastMessageId),e.lastMessageId=void 0)}function A(){console.log("HiddenChannel loaded 2.7");const e=i.findByName("MessagesWrapperConnected",!1);c.push(r.after("can",C,function(t,a){let[n,o]=t;return!o?.realCheck&&n===s.constants.Permissions.VIEW_CHANNEL?(f(o),o.lastMessageId=void 0,!0):a})),c.push(r.instead("transitionToGuild",I,function(t,a){const[n,o]=t;f(o),o.lastMessageId=void 0,!d(o)&&typeof a=="function"&&a(t)})),c.push(r.instead("fetchMessages",T,function(t,a){const[n]=t;f(n),n.lastMessageId=void 0,!d(n)&&typeof a=="function"&&a(t)})),c.push(r.instead("default",e,function(t,a){const n=t[0]?.channel;return f(n),n.lastMessageId=void 0,!d(n)&&typeof a=="function"?a(...t):s.React.createElement(m,{channel:n})}))}var B={onLoad:A,onUnload:function(){for(const e of c)e()}};return u.default=B,Object.defineProperty(u,"__esModule",{value:!0}),u})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets);
