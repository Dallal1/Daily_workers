sap.ui.define(["exports","./CustomStyle","./getStylesString","../FeaturesRegistry"],function(t,e,s,a){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=void 0;s=n(s);function n(t){return t&&t.__esModule?t:{default:t}}const l=new Map;(0,e.attachCustomCSSChange)(t=>{l.delete(`${t}_normal`)});const u=(t,n=false)=>{const u=t.getMetadata().getTag();const o=`${u}_${n?"static":"normal"}`;const r=(0,a.getFeature)("OpenUI5Enablement");if(!l.has(o)){let a;let c="";if(r){c=(0,s.default)(r.getBusyIndicatorStyles())}if(n){a=(0,s.default)(t.staticAreaStyles)}else{const n=(0,e.getCustomCSS)(u)||"";const l=(0,s.default)(t.styles);a=`${l} ${n}`}a=`${a} ${c}`;l.set(o,a)}return l.get(o)};var o=u;t.default=o});
//# sourceMappingURL=getEffectiveStyle.js.map