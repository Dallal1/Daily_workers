sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/main/thirdparty/Icon","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/decorators/customElement","./generated/templates/ProductSwitchItemTemplate.lit","./generated/themes/ProductSwitchItem.css"],function(e,t,i,o,a,r,s,d,c,u){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=n(t);i=n(i);a=n(a);r=n(r);s=n(s);d=n(d);c=n(c);u=n(u);function n(e){return e&&e.__esModule?e:{default:e}}var f=void 0&&(void 0).__decorate||function(e,t,i,o){var a=arguments.length,r=a<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,s;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(e,t,i,o);else for(var d=e.length-1;d>=0;d--)if(s=e[d])r=(a<3?s(r):a>3?s(t,i,r):s(t,i))||r;return a>3&&r&&Object.defineProperty(t,i,r),r};let p=class e extends t.default{constructor(){super();this._deactivate=()=>{if(this.active){this.active=false}}}onEnterDOM(){document.addEventListener("mouseup",this._deactivate)}onExitDOM(){document.removeEventListener("mouseup",this._deactivate)}_onmousedown(){this.active=true}_onkeydown(e){if((0,o.isSpace)(e)||(0,o.isEnter)(e)){this.active=true}if((0,o.isSpace)(e)){e.preventDefault()}if((0,o.isEnter)(e)){this._fireItemClick()}}_onkeyup(e){if((0,o.isSpace)(e)||(0,o.isEnter)(e)){this.active=false}if((0,o.isSpace)(e)){if((0,o.isSpaceShift)(e)){e.stopPropagation()}this._fireItemClick()}}_onfocusout(){this.active=false;this.focused=false}_onfocusin(e){this.focused=true;this.fireEvent("_focused",e)}_fireItemClick(){this.fireEvent("click",{item:this})}};f([(0,r.default)()],p.prototype,"titleText",void 0);f([(0,r.default)()],p.prototype,"subtitleText",void 0);f([(0,r.default)()],p.prototype,"icon",void 0);f([(0,r.default)({defaultValue:"_self"})],p.prototype,"target",void 0);f([(0,r.default)()],p.prototype,"targetSrc",void 0);f([(0,r.default)({type:Boolean})],p.prototype,"active",void 0);f([(0,r.default)({type:Boolean})],p.prototype,"focused",void 0);f([(0,r.default)({type:Boolean})],p.prototype,"selected",void 0);f([(0,r.default)({defaultValue:"-1",noAttribute:true})],p.prototype,"_tabIndex",void 0);p=f([(0,d.default)({tag:"ui5-product-switch-item",renderer:i.default,styles:u.default,template:c.default,dependencies:[a.default]}),(0,s.default)("click"),(0,s.default)("_focused")],p);p.define();var l=p;e.default=l});
//# sourceMappingURL=ProductSwitchItem.js.map