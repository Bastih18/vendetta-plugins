(function(u,i,s,c,h,C){"use strict";const{View:E,Text:g,Pressable:M}=i.findByProps("Button","Text","View"),P=i.findByProps("extractTimestamp"),r=s.stylesheet.createThemedStyleSheet({container:{flex:1,padding:16,alignItems:"center",justifyContent:"center"},title:{fontFamily:s.constants.Fonts.PRIMARY_SEMIBOLD,fontSize:24,textAlign:"left",color:h.semanticColors.HEADER_PRIMARY,paddingVertical:25},text:{flex:1,flexDirection:"row",fontSize:16,textAlign:"justify",color:h.semanticColors.HEADER_PRIMARY},dateContainer:{height:16,alignSelf:"baseline"}});function p(t){let{date:e}=t;return React.createElement(M,{style:r.dateContainer,onPress:function(){s.toasts.open({content:s.moment(e).toLocaleString(),source:C.getAssetByName("clock").id})},onLongPress:function(){s.clipboard.setString(e.getTime().toString()),s.toasts.open({content:"Copied to clipboard"})}},React.createElement(g,{style:r.text},s.moment(e).fromNow()))}function m(t){let{channel:e}=t;return React.createElement(E,{style:r.container},React.createElement(g,{style:r.title},"This channel is hidden."),React.createElement(g,{style:r.text},"Topic: ",e.topic||"No topic.",`

`,"Creation date: ",React.createElement(p,{date:new Date(P.extractTimestamp(e.id))}),`

`,"Last message: ",e.lMsg?React.createElement(p,{date:new Date(P.extractTimestamp(e.lMsg))}):"No messages.",`

`,"Last pin: ",e.lastPinTimestamp?React.createElement(p,{date:new Date(e.lastPinTimestamp)}):"No pins."))}let o=[];const R=i.findByProps("getChannelPermissions","can"),T=i.findByProps("transitionToGuild"),x=i.findByProps("stores","fetchMessages"),{ChannelTypes:y}=i.findByProps("ChannelTypes"),{getChannel:I}=i.findByProps("getChannel"),B=i.findByStoreName("ReadStateStore"),N=[y.DM,y.GROUP_DM,y.GUILD_CATEGORY];function d(t){if(t==null||(typeof t=="string"&&(t=I(t)),!t||N.includes(t.type)))return!1;t.realCheck=!0;let e=!R.can(s.constants.Permissions.VIEW_CHANNEL,t);return delete t.realCheck,e}function f(t){d(t)&&((t.lMsg==null||t.lMsg!=t.lastMessageId)&&(t.lMsg=t.lastMessageId),t.lastMessageId=void 0)}function S(){console.log("HiddenChannel loaded 3.4");const t=i.findByName("MessagesWrapperConnected",!1);o.push(c.instead("hasUnread",B,function(e,n){d(e[0])&&(console.log("hasUnread ",e[0]," is hidden"),n(!1)),n(e)})),o.push(c.after("can",R,function(e,n){let[a,l]=e;return!l?.realCheck&&a===s.constants.Permissions.VIEW_CHANNEL?(f(l),l.lastMessageId=void 0,!0):n})),o.push(c.instead("transitionToGuild",T,function(e,n){const[a,l]=e;f(l),!d(l)&&typeof n=="function"&&n(e)})),o.push(c.instead("fetchMessages",x,function(e,n){const[a]=e;f(a),console.log("fetchMessages",a),console.log(e),!d(a)&&typeof n=="function"&&n(e)})),o.push(c.instead("default",t,function(e,n){const a=e[0]?.channel;return f(a),!d(a)&&typeof n=="function"?n(...e):s.React.createElement(m,{channel:a})}))}var A={onLoad:S,onUnload:function(){for(const t of o)t()}};return u.default=A,Object.defineProperty(u,"__esModule",{value:!0}),u})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui,vendetta.ui.assets);
