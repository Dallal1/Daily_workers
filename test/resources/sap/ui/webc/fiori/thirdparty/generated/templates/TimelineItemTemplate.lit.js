sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i,t){"use strict";Object.defineProperty(i,"__esModule",{value:true});i.default=void 0;function e(i,e,a){return(0,t.html)`<div class="ui5-tli-root" dir="${(0,t.ifDefined)(this.effectiveDir)}"><div class="${(0,t.classMap)(this.classes.indicator)}"><div class="ui5-tli-icon-outer">${this.icon?s.call(this,i,e,a):n.call(this,i,e,a)}</div></div><div class="ui5-tli-bubble" tabindex="${(0,t.ifDefined)(this._tabIndex)}" data-sap-focus-ref><div class="ui5-tli-title">${this.name?l.call(this,i,e,a):undefined}<span>${(0,t.ifDefined)(this.titleText)}</span></div><div class="ui5-tli-subtitle">${(0,t.ifDefined)(this.subtitleText)}</div>${this.textContent?u.call(this,i,e,a):undefined}<span class="${(0,t.classMap)(this.classes.bubbleArrowPosition)}"></span></div></div>`}function s(i,e,s){return s?(0,t.html)`<${(0,t.scopeTag)("ui5-icon",e,s)} class="ui5-tli-icon" name="${(0,t.ifDefined)(this.icon)}"></${(0,t.scopeTag)("ui5-icon",e,s)}>`:(0,t.html)`<ui5-icon class="ui5-tli-icon" name="${(0,t.ifDefined)(this.icon)}"></ui5-icon>`}function n(i,e,s){return(0,t.html)`<div class="ui5-tli-dummy-icon-container"></div>`}function l(i,e,s){return(0,t.html)`${this.nameClickable?a.call(this,i,e,s):c.call(this,i,e,s)}`}function a(i,e,s){return s?(0,t.html)`<${(0,t.scopeTag)("ui5-link",e,s)} @ui5-click="${(0,t.ifDefined)(this.onNamePress)}" class="ui5-tli-title-name-clickable">${(0,t.ifDefined)(this.name)}&nbsp;</${(0,t.scopeTag)("ui5-link",e,s)}>`:(0,t.html)`<ui5-link @ui5-click="${(0,t.ifDefined)(this.onNamePress)}" class="ui5-tli-title-name-clickable">${(0,t.ifDefined)(this.name)}&nbsp;</ui5-link>`}function c(i,e,s){return(0,t.html)`<span class="ui5-tli-title-name">${(0,t.ifDefined)(this.name)}&nbsp;</span>`}function u(i,e,s){return(0,t.html)`<div class="ui5-tli-desc"><slot></slot></div>`}var d=e;i.default=d});
//# sourceMappingURL=TimelineItemTemplate.lit.js.map