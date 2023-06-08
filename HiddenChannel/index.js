(function(d,i,n,r,y,P){"use strict";const{View:R,Text:f,Pressable:E}=i.findByProps("Button","Text","View"),h=i.findByProps("extractTimestamp"),l=n.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:n.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:y.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:y.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function u(t){let{date:e}=t;return React.createElement(E,{style:l.dateContainer,onPress:function(){n.toasts.open({content:n.moment(e).toLocaleString(),source:P.getAssetByName("clock").id})},onLongPress:function(){n.clipboard.setString(e.getTime().toString()),n.toasts.open({content:"Copied to clipboard"})}},React.createElement(f,{style:l.text},n.moment(e).fromNow()))}function m(t){let{channel:e}=t;return React.createElement(R,{style:l.container},React.createElement(f,{style:l.title},"This channel is hidden."),React.createElement(f,{style:l.text},"Topic: ",e.topic||"No topic.",`

`,"Creation date: ",React.createElement(u,{date:new Date(h.extractTimestamp(e.id))}),`

`,"Last message: ",e.lastMsgId?React.createElement(u,{date:new Date(h.extractTimestamp(e.lastMsgId))}):"No messages.",`

`,"Last pin: ",e.lastPinTimestamp?React.createElement(u,{date:new Date(e.lastPinTimestamp)}):"No pins."))}let c=[];const C=i.findByProps("getChannelPermissions","can"),M=i.findByProps("transitionToGuild"),T=i.findByProps("stores","fetchMessages"),{ChannelTypes:g}=i.findByProps("ChannelTypes"),{getChannel:I}=i.findByProps("getChannel"),x=[g.DM,g.GROUP_DM,g.GUILD_CATEGORY];function p(t){if(t==null||(typeof t=="string"&&(t=I(t)),!t||x.includes(t.type)))return!1;t.realCheck=!0;let e=!C.can(n.constants.Permissions.VIEW_CHANNEL,t);return delete t.realCheck,e}function A(){console.log("HiddenChannel loaded 1.0");const t=i.findByName("MessagesWrapperConnected",!1);c.push(r.after("can",C,function(e,s){let[o,a]=e;return!a?.realCheck&&o===n.constants.Permissions.VIEW_CHANNEL?(a.id=="933799544737656952"&&(console.log(a),a.lastMsgId=a.lastMessageId,console.log(a.lastMsgId),a.lastMessageId=void 0),!0):s})),c.push(r.instead("transitionToGuild",M,function(e,s){const[o,a]=e;!p(a)&&typeof s=="function"&&s(e)})),c.push(r.instead("fetchMessages",T,function(e,s){const[o]=e;!p(o)&&typeof s=="function"&&s(e)})),c.push(r.instead("default",t,function(e,s){const o=e[0]?.channel;return!p(o)&&typeof s=="function"?s(...e):(console.log("Showing hidden channel stuff"),n.React.createElement(m,{channel:o}))}))}var B={onLoad:A,onUnload:function(){for(const t of c)t()}};return d.default=B,Object.defineProperty(d,"__esModule",{value:!0}),d})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets);