sap.ui.define(["exports","sap/ui/webc/common/thirdparty/lit-html/lit-html","../FeaturesRegistry","sap/ui/webc/common/thirdparty/lit-html/directives/repeat","sap/ui/webc/common/thirdparty/lit-html/directives/class-map","./directives/style-map","sap/ui/webc/common/thirdparty/lit-html/directives/if-defined","sap/ui/webc/common/thirdparty/lit-html/directives/unsafe-html"],function(e,t,r,i,n,s,a,c){"use strict";Object.defineProperty(e,"__esModule",{value:true});Object.defineProperty(e,"classMap",{enumerable:true,get:function(){return n.classMap}});e.html=e.default=void 0;Object.defineProperty(e,"ifDefined",{enumerable:true,get:function(){return a.ifDefined}});Object.defineProperty(e,"repeat",{enumerable:true,get:function(){return i.repeat}});e.scopeTag=void 0;Object.defineProperty(e,"styleMap",{enumerable:true,get:function(){return s.styleMap}});e.svg=void 0;Object.defineProperty(e,"unsafeHTML",{enumerable:true,get:function(){return c.unsafeHTML}});const u=(e,...i)=>{const n=(0,r.getFeature)("LitStatic");const s=n?n.html:t.html;return s(e,...i)};e.html=u;const l=(e,...i)=>{const n=(0,r.getFeature)("LitStatic");const s=n?n.svg:t.svg;return s(e,...i)};e.svg=l;const o=(e,i,n,s,a)=>{const c=(0,r.getFeature)("OpenUI5Enablement");if(c&&!s){e=c.wrapTemplateResultInBusyMarkup(u,a.host,e)}if(typeof n==="string"){e=u`<style>${n}</style>${e}`}else if(Array.isArray(n)&&n.length){e=u`${n.map(e=>u`<link type="text/css" rel="stylesheet" href="${e}">`)}${e}`}(0,t.render)(e,i,a)};const p=(e,t,i)=>{const n=(0,r.getFeature)("LitStatic");if(n){return n.unsafeStatic((t||[]).includes(e)?`${e}-${i}`:e)}};e.scopeTag=p;var f=o;e.default=f});
//# sourceMappingURL=LitRenderer.js.map