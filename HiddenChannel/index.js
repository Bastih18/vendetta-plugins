(function(d,a,n,r,h,P){"use strict";const{View:E,Text:f,Pressable:R}=a.findByProps("Button","Text","View"),y=a.findByProps("extractTimestamp"),l=n.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:n.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:h.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:h.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function u(t){let{date:e}=t;return React.createElement(R,{style:l.dateContainer,onPress:function(){n.toasts.open({content:n.moment(e).toLocaleString(),source:P.getAssetByName("clock").id})},onLongPress:function(){n.clipboard.setString(e.getTime().toString()),n.toasts.open({content:"Copied to clipboard"})}},React.createElement(f,{style:l.text},n.moment(e).fromNow()))}function m(t){let{channel:e}=t;return React.createElement(E,{style:l.container},React.createElement(f,{style:l.title},"This channel is hidden."),React.createElement(f,{style:l.text},"Topic: ",e.topic||"No topic.",`

`,"Creation date: ",React.createElement(u,{date:new Date(y.extractTimestamp(e.id))}),`

`,"Last message: ",e.lastMsgId?React.createElement(u,{date:new Date(y.extractTimestamp(e.lastMsgId))}):"No messages.",`

`,"Last pin: ",e.lastPinTimestamp?React.createElement(u,{date:new Date(e.lastPinTimestamp)}):"No pins."))}let c=[];const C=a.findByProps("getChannelPermissions","can"),M=a.findByProps("transitionToGuild"),T=a.findByProps("stores","fetchMessages"),{ChannelTypes:g}=a.findByProps("ChannelTypes"),{getChannel:I}=a.findByProps("getChannel"),x=a.findByProps("UserChannelSettingsStore"),S=[g.DM,g.GROUP_DM,g.GUILD_CATEGORY];function p(t){if(t==null||(typeof t=="string"&&(t=I(t)),!t||S.includes(t.type)))return!1;t.realCheck=!0;let e=!C.can(n.constants.Permissions.VIEW_CHANNEL,t);return delete t.realCheck,e}function B(){console.log("HiddenChannel loaded 1.0");const t=a.findByName("MessagesWrapperConnected",!1);c.push(r.after("can",C,function(e,s){let[o,i]=e;return!i?.realCheck&&o===n.constants.Permissions.VIEW_CHANNEL?(i.id=="933799544737656952"&&(i.lastMsgId=i.lastMessageId,i.lastMessageId=void 0,console.log(x.getChannelSettings(i.id))),!0):s})),c.push(r.instead("transitionToGuild",M,function(e,s){const[o,i]=e;!p(i)&&typeof s=="function"&&s(e)})),c.push(r.instead("fetchMessages",T,function(e,s){const[o]=e;!p(o)&&typeof s=="function"&&s(e)})),c.push(r.instead("default",t,function(e,s){const o=e[0]?.channel;return!p(o)&&typeof s=="function"?s(...e):(console.log("Showing hidden channel stuff"),n.React.createElement(m,{channel:o}))}))}var A={onLoad:B,onUnload:function(){for(const t of c)t()}};return d.default=A,Object.defineProperty(d,"__esModule",{value:!0}),d})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets);
