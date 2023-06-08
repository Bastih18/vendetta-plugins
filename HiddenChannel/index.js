(function(d,i,n,r,h,P){"use strict";const{View:R,Text:f,Pressable:M}=i.findByProps("Button","Text","View"),C=i.findByProps("extractTimestamp"),l=n.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:n.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:h.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:h.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function u(t){let{date:e}=t;return React.createElement(M,{style:l.dateContainer,onPress:function(){n.toasts.open({content:n.moment(e).toLocaleString(),source:P.getAssetByName("clock").id})},onLongPress:function(){n.clipboard.setString(e.getTime().toString()),n.toasts.open({content:"Copied to clipboard"})}},React.createElement(f,{style:l.text},n.moment(e).fromNow()))}function m(t){let{channel:e}=t;return React.createElement(R,{style:l.container},React.createElement(f,{style:l.title},"This channel is hidden."),React.createElement(f,{style:l.text},"Topic: ",e.topic||"No topic.",`

`,"Creation date: ",React.createElement(u,{date:new Date(C.extractTimestamp(e.id))}),`

`,"Last message: ",e.lMsgId?React.createElement(u,{date:new Date(C.extractTimestamp(e.lMsgId))}):"No messages.",`

`,"Last pin: ",e.lastPinTimestamp?React.createElement(u,{date:new Date(e.lastPinTimestamp)}):"No pins."))}let c=[];const E=i.findByProps("getChannelPermissions","can"),T=i.findByProps("transitionToGuild"),I=i.findByProps("stores","fetchMessages"),{ChannelTypes:p}=i.findByProps("ChannelTypes"),{getChannel:x}=i.findByProps("getChannel"),A=[p.DM,p.GROUP_DM,p.GUILD_CATEGORY],g=new Map;function y(t){if(t==null||(typeof t=="string"&&(t=x(t)),!t||A.includes(t.type)))return!1;t.realCheck=!0;let e=!E.can(n.constants.Permissions.VIEW_CHANNEL,t);return delete t.realCheck,e}function B(){console.log("HiddenChannel loaded 1.3");const t=i.findByName("MessagesWrapperConnected",!1);c.push(r.after("can",E,function(e,s){let[o,a]=e;return!a?.realCheck&&o===n.constants.Permissions.VIEW_CHANNEL?(a.id=="933799544737656952"&&(g.get(a.id)==null&&g.set(a.id,a.lastMessageId),a.lMsgId=g.get(a.id),a.lastMessageId=void 0),!0):s})),c.push(r.instead("transitionToGuild",T,function(e,s){const[o,a]=e;!y(a)&&typeof s=="function"&&s(e)})),c.push(r.instead("fetchMessages",I,function(e,s){const[o]=e;!y(o)&&typeof s=="function"&&s(e)})),c.push(r.instead("default",t,function(e,s){const o=e[0]?.channel;return!y(o)&&typeof s=="function"?s(...e):(console.log("Showing hidden channel stuff"),n.React.createElement(m,{channel:o}))}))}var D={onLoad:B,onUnload:function(){for(const t of c)t()}};return d.default=D,Object.defineProperty(d,"__esModule",{value:!0}),d})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets);
