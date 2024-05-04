sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/types/Integer","./types/BusyIndicatorSize","./Label","./generated/templates/BusyIndicatorTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/BusyIndicator.css"],function(e,t,i,r,s,a,o,u,d,n,l,c,y){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=p(t);i=p(i);r=p(r);s=p(s);u=p(u);d=p(d);n=p(n);l=p(l);y=p(y);function p(e){return e&&e.__esModule?e:{default:e}}var f=void 0&&(void 0).__decorate||function(e,t,i,r){var s=arguments.length,a=s<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,o;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")a=Reflect.decorate(e,t,i,r);else for(var u=e.length-1;u>=0;u--)if(o=e[u])a=(s<3?o(a):s>3?o(t,i,a):o(t,i))||a;return s>3&&a&&Object.defineProperty(t,i,a),a};var h;let m=h=class e extends t.default{constructor(){super();this._keydownHandler=this._handleKeydown.bind(this);this._preventEventHandler=this._preventEvent.bind(this)}onEnterDOM(){this.addEventListener("keydown",this._keydownHandler,{capture:true});this.addEventListener("keyup",this._preventEventHandler,{capture:true})}onExitDOM(){if(this._busyTimeoutId){clearTimeout(this._busyTimeoutId);delete this._busyTimeoutId}this.removeEventListener("keydown",this._keydownHandler,true);this.removeEventListener("keyup",this._preventEventHandler,true)}static async onDefine(){h.i18nBundle=await(0,a.getI18nBundle)("@ui5/webcomponents")}get ariaTitle(){return h.i18nBundle.getText(c.BUSY_INDICATOR_TITLE)}get labelId(){return this.text?`${this._id}-label`:undefined}get classes(){return{root:{"ui5-busy-indicator-root":true}}}onBeforeRendering(){if(this.active){if(!this._isBusy&&!this._busyTimeoutId){this._busyTimeoutId=setTimeout(()=>{delete this._busyTimeoutId;this._isBusy=true},Math.max(0,this.delay))}}else{if(this._busyTimeoutId){clearTimeout(this._busyTimeoutId);delete this._busyTimeoutId}this._isBusy=false}}_handleKeydown(e){if(!this._isBusy){return}e.stopImmediatePropagation();if((0,o.isTabNext)(e)){this.focusForward=true;this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();this.focusForward=false}}_preventEvent(e){if(this._isBusy){e.stopImmediatePropagation()}}_redirectFocus(e){if(this.focusForward){return}e.preventDefault();this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus()}};f([(0,r.default)()],m.prototype,"text",void 0);f([(0,r.default)({type:d.default,defaultValue:d.default.Medium})],m.prototype,"size",void 0);f([(0,r.default)({type:Boolean})],m.prototype,"active",void 0);f([(0,r.default)({validator:u.default,defaultValue:1e3})],m.prototype,"delay",void 0);f([(0,r.default)({type:Boolean})],m.prototype,"_isBusy",void 0);m=h=f([(0,i.default)({tag:"ui5-busy-indicator",languageAware:true,styles:y.default,renderer:s.default,template:l.default,dependencies:[n.default]})],m);m.define();var b=m;e.default=b});
//# sourceMappingURL=BusyIndicator.js.map