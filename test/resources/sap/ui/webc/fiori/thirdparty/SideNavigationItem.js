sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/decorators/slot","sap/ui/webc/main/thirdparty/types/HasPopup"],function(e,t,o,a,r,i,d){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=p(t);o=p(o);a=p(a);r=p(r);i=p(i);d=p(d);function p(e){return e&&e.__esModule?e:{default:e}}var l=void 0&&(void 0).__decorate||function(e,t,o,a){var r=arguments.length,i=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,o):a,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")i=Reflect.decorate(e,t,o,a);else for(var p=e.length-1;p>=0;p--)if(d=e[p])i=(r<3?d(i):r>3?d(t,o,i):d(t,o))||i;return r>3&&i&&Object.defineProperty(t,o,i),i};let n=class e extends t.default{get _tooltip(){return this.title||this.text}get _ariaHasPopup(){if(this.parentNode.collapsed&&this.items.length){return d.default.Tree}return undefined}};l([(0,r.default)()],n.prototype,"text",void 0);l([(0,r.default)()],n.prototype,"icon",void 0);l([(0,r.default)({type:Boolean})],n.prototype,"expanded",void 0);l([(0,r.default)({type:Boolean})],n.prototype,"selected",void 0);l([(0,r.default)({type:Boolean})],n.prototype,"wholeItemToggleable",void 0);l([(0,r.default)()],n.prototype,"title",void 0);l([(0,r.default)({type:Boolean})],n.prototype,"_fixed",void 0);l([(0,i.default)({type:HTMLElement,invalidateOnChildChange:true,default:true})],n.prototype,"items",void 0);n=l([(0,o.default)("ui5-side-navigation-item"),(0,a.default)("click")],n);n.define();var u=n;e.default=u});
//# sourceMappingURL=SideNavigationItem.js.map