sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/types/ValueState","sap/ui/webc/common/thirdparty/base/decorators/slot","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/util/AriaLabelHelper","sap/ui/webc/common/thirdparty/base/util/getEffectiveScrollbarStyle","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/FeaturesRegistry","sap/ui/webc/common/thirdparty/base/Keys","./Popover","./Icon","sap/ui/webc/common/thirdparty/icons/error","sap/ui/webc/common/thirdparty/icons/alert","sap/ui/webc/common/thirdparty/icons/sys-enter-2","sap/ui/webc/common/thirdparty/icons/information","./generated/templates/TextAreaTemplate.lit","./generated/templates/TextAreaPopoverTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/TextArea.css","./generated/themes/ValueStateMessage.css","./generated/themes/BrowserScrollbar.css"],function(e,t,a,o,r,s,i,n,u,l,d,p,h,c,f,g,v,m,S,y,T,_,x,b,E,w,A){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=P(t);a=P(a);o=P(o);r=P(r);s=P(s);i=P(i);n=P(n);u=P(u);l=P(l);p=P(p);g=P(g);v=P(v);_=P(_);x=P(x);E=P(E);w=P(w);A=P(A);function P(e){return e&&e.__esModule?e:{default:e}}var R=void 0&&(void 0).__decorate||function(e,t,a,o){var r=arguments.length,s=r<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,a):o,i;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")s=Reflect.decorate(e,t,a,o);else for(var n=e.length-1;n>=0;n--)if(i=e[n])s=(r<3?i(s):r>3?i(t,a,s):i(t,a))||s;return r>3&&s&&Object.defineProperty(t,a,s),s};var V;let M=V=class e extends t.default{static async onDefine(){V.i18nBundle=await(0,h.getI18nBundle)("@ui5/webcomponents")}constructor(){super();this._firstRendering=true;this._openValueStateMsgPopover=false;this._fnOnResize=this._onResize.bind(this);this.previousValue=""}onEnterDOM(){u.default.register(this,this._fnOnResize)}onExitDOM(){u.default.deregister(this,this._fnOnResize)}onBeforeRendering(){if(!this.value){this.value=""}this._exceededTextProps=this._calcExceededText();this._mirrorText=this._tokenizeText(this.value);this.exceeding=!!this._exceededTextProps.leftCharactersCount&&this._exceededTextProps.leftCharactersCount<0;this._setCSSParams();const e=(0,c.getFeature)("FormSupport");if(e){e.syncNativeHiddenInput(this)}else if(this.name){console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`)}}onAfterRendering(){const e=this.getInputDomRef();if(this.rows===1){e.setAttribute("rows","1")}else{e.removeAttribute("rows")}this.toggleValueStateMessage(this.openValueStateMsgPopover);this._firstRendering=false}getInputDomRef(){return this.getDomRef().querySelector("textarea")}_onkeydown(e){this._keyDown=true;if((0,f.isEscape)(e)){const e=this.getInputDomRef();this.value=this.previousValue;e.value=this.value;this.fireEvent("input")}}_onkeyup(){this._keyDown=false}_onfocusin(){this.focused=true;this._openValueStateMsgPopover=true;this.previousValue=this.getInputDomRef().value}_onfocusout(e){const t=e.relatedTarget;const a=t?.shadowRoot?.querySelector(".ui5-valuestatemessage-root");this.focused=false;if(!a){this._openValueStateMsgPopover=false}}_onchange(){this.fireEvent("change",{})}_oninput(e){const t=this.getInputDomRef();if(e.target===t){e.stopImmediatePropagation()}this.value=t.value;this.fireEvent("input",{});this.fireEvent("value-changed")}_onResize(){if(this.displayValueStateMessagePopover){this._width=this.offsetWidth}}_setCSSParams(){this.style.setProperty("--_textarea_rows",this.rows?String(this.rows):"2");this.style.setProperty("--_textarea_growing_max_lines",String(this.growingMaxLines))}toggleValueStateMessage(e){if(e){this.openPopover()}else{this.closePopover()}}async openPopover(){this.valueStatePopover=await this._getPopover();this.valueStatePopover&&await this.valueStatePopover.showAt(this.shadowRoot.querySelector(".ui5-textarea-root .ui5-textarea-wrapper"))}async closePopover(){this.valueStatePopover=await this._getPopover();this.valueStatePopover&&this.valueStatePopover.close()}async _getPopover(){const e=await this.getStaticAreaItemDomRef();return e.querySelector("[ui5-popover]")}_tokenizeText(e){const t=e.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&apos;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n");if(t.length<this.rows){return this._mapTokenizedTextToObject([...t,...Array(this.rows-t.length).fill("")])}return this._mapTokenizedTextToObject(t)}_mapTokenizedTextToObject(e){return e.map((t,a)=>({text:t,last:a===e.length-1}))}_calcExceededText(){let e,t,a;if(this.showExceededText){const e=this.maxlength;if(e!==null&&e!==undefined){a=e-this.value.length;if(a>=0){t=V.i18nBundle.getText(b.TEXTAREA_CHARACTERS_LEFT,a)}else{t=V.i18nBundle.getText(b.TEXTAREA_CHARACTERS_EXCEEDED,Math.abs(a))}}}else{e=this.maxlength}return{exceededText:t,leftCharactersCount:a,calcedMaxLength:e}}get classes(){return{root:{"ui5-textarea-root":true,"ui5-content-native-scrollbars":(0,p.default)()},valueStateMsg:{"ui5-valuestatemessage--error":this.valueState===o.default.Error,"ui5-valuestatemessage--warning":this.valueState===o.default.Warning,"ui5-valuestatemessage--information":this.valueState===o.default.Information}}}get styles(){return{valueStateMsgPopover:{"max-width":`${this._width}px`}}}get tabIndex(){return this.disabled?-1:0}get ariaLabelText(){const e=(0,d.getEffectiveAriaLabelText)(this)||(0,d.getAssociatedLabelForTexts)(this);if(this.showExceededText){if(e){return e.concat(" ",this._exceededTextProps.exceededText)}return this._exceededTextProps.exceededText}return e}get ariaDescribedBy(){return this.hasValueState?`${this._id}-valueStateDesc`:undefined}get ariaValueStateHiddenText(){if(!this.hasValueState){return}if(this.valueState===o.default.None){return}if(this.hasCustomValueState){return`${this.valueStateTypeMappings[this.valueState]}`.concat(" ",this.valueStateMessageText.map(e=>e.textContent).join(" "))}return`${this.valueStateTypeMappings[this.valueState]} ${this.valueStateDefaultText}`}get valueStateDefaultText(){if(this.valueState!==o.default.None){return this.valueStateTextMappings[this.valueState]}return""}get ariaInvalid(){return this.valueState==="Error"?"true":null}get openValueStateMsgPopover(){return!this._firstRendering&&this._openValueStateMsgPopover&&this.displayValueStateMessagePopover}get displayValueStateMessagePopover(){return!this.readonly&&(this.hasCustomValueState||this.hasValueState)}get hasCustomValueState(){return!!this.valueStateMessage.length&&this.hasValueState}get hasValueState(){return this.valueState===o.default.Error||this.valueState===o.default.Warning||this.valueState===o.default.Information}get valueStateMessageText(){return this.valueStateMessage.map(e=>e.cloneNode(true))}get _valueStatePopoverHorizontalAlign(){return this.effectiveDir!=="rtl"?"Left":"Right"}get _valueStateMessageIcon(){const e={Error:"error",Warning:"alert",Success:"sys-enter-2",Information:"information"};return this.valueState!==o.default.None?e[this.valueState]:""}get valueStateTextMappings(){return{Success:V.i18nBundle.getText(b.VALUE_STATE_SUCCESS),Information:V.i18nBundle.getText(b.VALUE_STATE_INFORMATION),Error:V.i18nBundle.getText(b.VALUE_STATE_ERROR),Warning:V.i18nBundle.getText(b.VALUE_STATE_WARNING)}}get valueStateTypeMappings(){return{Success:V.i18nBundle.getText(b.VALUE_STATE_TYPE_SUCCESS),Information:V.i18nBundle.getText(b.VALUE_STATE_TYPE_INFORMATION),Error:V.i18nBundle.getText(b.VALUE_STATE_TYPE_ERROR),Warning:V.i18nBundle.getText(b.VALUE_STATE_TYPE_WARNING)}}};R([(0,a.default)()],M.prototype,"value",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"disabled",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"readonly",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"required",void 0);R([(0,a.default)()],M.prototype,"placeholder",void 0);R([(0,a.default)({type:o.default,defaultValue:o.default.None})],M.prototype,"valueState",void 0);R([(0,a.default)({validator:l.default,defaultValue:0})],M.prototype,"rows",void 0);R([(0,a.default)({validator:l.default,defaultValue:null})],M.prototype,"maxlength",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"showExceededText",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"growing",void 0);R([(0,a.default)({validator:l.default,defaultValue:0})],M.prototype,"growingMaxLines",void 0);R([(0,a.default)()],M.prototype,"name",void 0);R([(0,a.default)()],M.prototype,"accessibleName",void 0);R([(0,a.default)()],M.prototype,"accessibleNameRef",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"focused",void 0);R([(0,a.default)({type:Boolean})],M.prototype,"exceeding",void 0);R([(0,a.default)({type:Object,multiple:true})],M.prototype,"_mirrorText",void 0);R([(0,a.default)({noAttribute:true})],M.prototype,"_maxHeight",void 0);R([(0,a.default)({validator:l.default})],M.prototype,"_width",void 0);R([(0,r.default)()],M.prototype,"valueStateMessage",void 0);R([(0,r.default)()],M.prototype,"formSupport",void 0);M=V=R([(0,i.default)({tag:"ui5-textarea",languageAware:true,styles:[A.default,E.default],renderer:n.default,template:_.default,staticAreaTemplate:x.default,staticAreaStyles:w.default,dependencies:[g.default,v.default]}),(0,s.default)("change"),(0,s.default)("input")],M);M.define();var I=M;e.default=I});
//# sourceMappingURL=TextArea.js.map