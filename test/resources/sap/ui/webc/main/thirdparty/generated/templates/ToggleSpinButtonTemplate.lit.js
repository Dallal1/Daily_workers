sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i,t){"use strict";Object.defineProperty(i,"__esModule",{value:true});i.default=void 0;function e(i,e,o){return(0,t.html)`<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  aria-pressed="${(0,t.ifDefined)(this.pressed)}" aria-valuemin="${(0,t.ifDefined)(this.valueMin)}" aria-valuemax="${(0,t.ifDefined)(this.valueMax)}" aria-valuenow="${(0,t.ifDefined)(this.valueNow)}" aria-valuetext="${(0,t.ifDefined)(this.valueText)}" role="spinbutton"  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${(0,t.ifDefined)(this.tabIndexValue)} aria-expanded="${(0,t.ifDefined)(this.accessibilityAttributes.expanded)}" aria-controls="${(0,t.ifDefined)(this.accessibilityAttributes.controls)}" aria-haspopup="${(0,t.ifDefined)(this.accessibilityAttributes.hasPopup)}" aria-label="${(0,t.ifDefined)(this.ariaLabelText)}" title="${(0,t.ifDefined)(this.buttonTitle)}" part="button">${this.icon?n.call(this,i,e,o):undefined}<span id="${(0,t.ifDefined)(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType?s.call(this,i,e,o):undefined}</button> `}function n(i,e,n){return n?(0,t.html)`<${(0,t.scopeTag)("ui5-icon",e,n)} class="ui5-button-icon" name="${(0,t.ifDefined)(this.icon)}" accessible-role="${(0,t.ifDefined)(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${(0,t.scopeTag)("ui5-icon",e,n)}>`:(0,t.html)`<ui5-icon class="ui5-button-icon" name="${(0,t.ifDefined)(this.icon)}" accessible-role="${(0,t.ifDefined)(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`}function s(i,e,n){return(0,t.html)`<span class="ui5-hidden-text">${(0,t.ifDefined)(this.buttonTypeText)}</span>`}var o=e;i.default=o});
//# sourceMappingURL=ToggleSpinButtonTemplate.lit.js.map