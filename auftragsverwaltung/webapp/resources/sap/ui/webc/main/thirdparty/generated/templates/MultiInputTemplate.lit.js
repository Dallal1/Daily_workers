sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i,e){"use strict";Object.defineProperty(i,"__esModule",{value:true});i.default=void 0;function t(i,t,a){return a?(0,e.html)`<div class="ui5-input-root ui5-input-focusable-element" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}"><div class="ui5-input-content"><span id="${(0,e.ifDefined)(this._id)}-hiddenText-nMore" class="ui5-hidden-text">${(0,e.ifDefined)(this._tokensCountText)}</span><${(0,e.scopeTag)("ui5-tokenizer",t,a)} class="ui5-multi-input-tokenizer" .morePopoverOpener=${(0,e.ifDefined)(this.morePopoverOpener)} .popoverMinWidth=${(0,e.ifDefined)(this._inputWidth)} .valueState=${(0,e.ifDefined)(this.valueState)} ?expanded="${this.expandedTokenizer}" show-more @keydown="${this._onTokenizerKeydown}" @ui5-show-more-items-press=${(0,e.ifDefined)(this.showMorePress)} @ui5-token-delete=${(0,e.ifDefined)(this.tokenDelete)} @focusout="${this._tokenizerFocusOut}"><slot name="tokens"></slot><div slot="valueStateMessage">${this.shouldDisplayDefaultValueStateMessage?n.call(this,i,t,a):s.call(this,i,t,a)}</div></${(0,e.scopeTag)("ui5-tokenizer",t,a)}><input id="${(0,e.ifDefined)(this._id)}-inner" class="ui5-input-inner" style="${(0,e.styleMap)(this.styles.innerInput)}" type="${(0,e.ifDefined)(this.inputType)}" inner-input ?inner-input-with-icon="${this.icon.length}" ?disabled="${this.disabled}" ?readonly="${this._readonly}" .value="${(0,e.ifDefined)(this._innerValue)}" placeholder="${(0,e.ifDefined)(this._placeholder)}" maxlength="${(0,e.ifDefined)(this.maxlength)}" role="${(0,e.ifDefined)(this.accInfo.input.role)}" aria-controls="${(0,e.ifDefined)(this.accInfo.input.ariaControls)}" aria-invalid="${(0,e.ifDefined)(this.accInfo.input.ariaInvalid)}" aria-haspopup="${(0,e.ifDefined)(this.accInfo.input.ariaHasPopup)}" aria-describedby="${(0,e.ifDefined)(this.accInfo.input.ariaDescribedBy)}" aria-roledescription="${(0,e.ifDefined)(this.accInfo.input.ariaRoledescription)}" aria-autocomplete="${(0,e.ifDefined)(this.accInfo.input.ariaAutoComplete)}" aria-expanded="${(0,e.ifDefined)(this.accInfo.input.ariaExpanded)}" aria-label="${(0,e.ifDefined)(this.accInfo.input.ariaLabel)}" aria-required="${(0,e.ifDefined)(this.required)}" @input="${this._handleInput}" @change="${this._handleChange}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click=${this._click} @focusin=${this.innerFocusIn} data-sap-focus-ref step="${(0,e.ifDefined)(this.nativeInputAttributes.step)}" min="${(0,e.ifDefined)(this.nativeInputAttributes.min)}" max="${(0,e.ifDefined)(this.nativeInputAttributes.max)}" />${this.effectiveShowClearIcon?o.call(this,i,t,a):undefined}${this.icon.length?u.call(this,i,t,a):undefined}<div class="ui5-input-value-state-icon">${(0,e.unsafeHTML)(this._valueStateInputIcon)}</div>${this.showValueHelpIcon?d.call(this,i,t,a):undefined}${this.showSuggestions?l.call(this,i,t,a):undefined}${this.accInfo.input.ariaDescription?c.call(this,i,t,a):undefined}${this.hasValueState?h.call(this,i,t,a):undefined}</div><slot name="formSupport"></slot></div> `:(0,e.html)`<div class="ui5-input-root ui5-input-focusable-element" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}"><div class="ui5-input-content"><span id="${(0,e.ifDefined)(this._id)}-hiddenText-nMore" class="ui5-hidden-text">${(0,e.ifDefined)(this._tokensCountText)}</span><ui5-tokenizer class="ui5-multi-input-tokenizer" .morePopoverOpener=${(0,e.ifDefined)(this.morePopoverOpener)} .popoverMinWidth=${(0,e.ifDefined)(this._inputWidth)} .valueState=${(0,e.ifDefined)(this.valueState)} ?expanded="${this.expandedTokenizer}" show-more @keydown="${this._onTokenizerKeydown}" @ui5-show-more-items-press=${(0,e.ifDefined)(this.showMorePress)} @ui5-token-delete=${(0,e.ifDefined)(this.tokenDelete)} @focusout="${this._tokenizerFocusOut}"><slot name="tokens"></slot><div slot="valueStateMessage">${this.shouldDisplayDefaultValueStateMessage?n.call(this,i,t,a):s.call(this,i,t,a)}</div></ui5-tokenizer><input id="${(0,e.ifDefined)(this._id)}-inner" class="ui5-input-inner" style="${(0,e.styleMap)(this.styles.innerInput)}" type="${(0,e.ifDefined)(this.inputType)}" inner-input ?inner-input-with-icon="${this.icon.length}" ?disabled="${this.disabled}" ?readonly="${this._readonly}" .value="${(0,e.ifDefined)(this._innerValue)}" placeholder="${(0,e.ifDefined)(this._placeholder)}" maxlength="${(0,e.ifDefined)(this.maxlength)}" role="${(0,e.ifDefined)(this.accInfo.input.role)}" aria-controls="${(0,e.ifDefined)(this.accInfo.input.ariaControls)}" aria-invalid="${(0,e.ifDefined)(this.accInfo.input.ariaInvalid)}" aria-haspopup="${(0,e.ifDefined)(this.accInfo.input.ariaHasPopup)}" aria-describedby="${(0,e.ifDefined)(this.accInfo.input.ariaDescribedBy)}" aria-roledescription="${(0,e.ifDefined)(this.accInfo.input.ariaRoledescription)}" aria-autocomplete="${(0,e.ifDefined)(this.accInfo.input.ariaAutoComplete)}" aria-expanded="${(0,e.ifDefined)(this.accInfo.input.ariaExpanded)}" aria-label="${(0,e.ifDefined)(this.accInfo.input.ariaLabel)}" aria-required="${(0,e.ifDefined)(this.required)}" @input="${this._handleInput}" @change="${this._handleChange}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click=${this._click} @focusin=${this.innerFocusIn} data-sap-focus-ref step="${(0,e.ifDefined)(this.nativeInputAttributes.step)}" min="${(0,e.ifDefined)(this.nativeInputAttributes.min)}" max="${(0,e.ifDefined)(this.nativeInputAttributes.max)}" />${this.effectiveShowClearIcon?o.call(this,i,t,a):undefined}${this.icon.length?u.call(this,i,t,a):undefined}<div class="ui5-input-value-state-icon">${(0,e.unsafeHTML)(this._valueStateInputIcon)}</div>${this.showValueHelpIcon?d.call(this,i,t,a):undefined}${this.showSuggestions?l.call(this,i,t,a):undefined}${this.accInfo.input.ariaDescription?c.call(this,i,t,a):undefined}${this.hasValueState?h.call(this,i,t,a):undefined}</div><slot name="formSupport"></slot></div> `}function n(i,t,n){return(0,e.html)`${(0,e.ifDefined)(this.valueStateText)}`}function s(i,t,n){return(0,e.html)`${(0,e.repeat)(this.valueStateMessageText,(i,e)=>i._id||e,(e,s)=>a.call(this,i,t,n,e,s))}`}function a(i,t,n,s,a){return(0,e.html)`${(0,e.ifDefined)(s)}`}function o(i,t,n){return n?(0,e.html)`<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><${(0,e.scopeTag)("ui5-icon",t,n)} tabindex="-1" class="ui5-input-clear-icon" name="decline"></${(0,e.scopeTag)("ui5-icon",t,n)}></div>`:(0,e.html)`<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><ui5-icon tabindex="-1" class="ui5-input-clear-icon" name="decline"></ui5-icon></div>`}function u(i,t,n){return(0,e.html)`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`}function d(i,t,n){return n?(0,e.html)`<${(0,e.scopeTag)("ui5-icon",t,n)} @click=${this.valueHelpPress} @mousedown=${this.valueHelpMouseDown} @mouseup=${this.valueHelpMouseUp} input-icon name="value-help"></${(0,e.scopeTag)("ui5-icon",t,n)}>`:(0,e.html)`<ui5-icon @click=${this.valueHelpPress} @mousedown=${this.valueHelpMouseDown} @mouseup=${this.valueHelpMouseUp} input-icon name="value-help"></ui5-icon>`}function l(i,t,n){return(0,e.html)`<span id="${(0,e.ifDefined)(this._id)}-suggestionsText" class="ui5-hidden-text">${(0,e.ifDefined)(this.suggestionsText)}</span><span id="${(0,e.ifDefined)(this._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${(0,e.ifDefined)(this._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${(0,e.ifDefined)(this.availableSuggestionsCount)}</span>`}function c(i,t,n){return(0,e.html)`<span id="${(0,e.ifDefined)(this._id)}-descr" class="ui5-hidden-text">${(0,e.ifDefined)(this.accInfo.input.ariaDescription)}</span>`}function h(i,t,n){return(0,e.html)`<span id="${(0,e.ifDefined)(this._id)}-valueStateDesc" class="ui5-hidden-text">${(0,e.ifDefined)(this.ariaValueStateHiddenText)}</span>`}var f=t;i.default=f});
//# sourceMappingURL=MultiInputTemplate.lit.js.map