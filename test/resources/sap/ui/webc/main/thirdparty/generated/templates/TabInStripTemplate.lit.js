sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i,e){"use strict";Object.defineProperty(i,"__esModule",{value:true});i.default=void 0;function t(i,t,o){return(0,e.html)`<div id="${(0,e.ifDefined)(this._id)}" class="${(0,e.ifDefined)(this.stripClasses.itemClasses)}" tabindex="-1" role="tab" aria-roledescription="${(0,e.ifDefined)(this._roleDescription)}" aria-haspopup="${(0,e.ifDefined)(this._ariaHasPopup)}" aria-posinset="${(0,e.ifDefined)(this._posinset)}" aria-setsize="${(0,e.ifDefined)(this._setsize)}" aria-controls="ui5-tc-content" aria-selected="${(0,e.ifDefined)(this.effectiveSelected)}" aria-disabled="${(0,e.ifDefined)(this.effectiveDisabled)}" ?disabled="${this.effectiveDisabled}" aria-labelledby="${(0,e.ifDefined)(this.ariaLabelledBy)}" ._realTab="${(0,e.ifDefined)(this)}">${this.icon?n.call(this,i,t,o):undefined}${this._designDescription?s.call(this,i,t,o):undefined}<div class="ui5-tab-strip-itemContent">${!this._isInline?a.call(this,i,t,o):undefined}${this.text?d.call(this,i,t,o):undefined}</div>${this.requiresExpandButton?l.call(this,i,t,o):undefined} `}function n(i,t,n){return n?(0,e.html)`<div class="ui5-tab-strip-item-icon-outer"><${(0,e.scopeTag)("ui5-icon",t,n)} id="${(0,e.ifDefined)(this._id)}-icon" name="${(0,e.ifDefined)(this.icon)}" class="ui5-tab-strip-item-icon"></${(0,e.scopeTag)("ui5-icon",t,n)}></div>`:(0,e.html)`<div class="ui5-tab-strip-item-icon-outer"><ui5-icon id="${(0,e.ifDefined)(this._id)}-icon" name="${(0,e.ifDefined)(this.icon)}" class="ui5-tab-strip-item-icon"></ui5-icon></div>`}function s(i,t,n){return(0,e.html)`<div id="${(0,e.ifDefined)(this._id)}-designDescription" class="ui5-tab-strip-design-description">${(0,e.ifDefined)(this._designDescription)}</div>`}function a(i,t,n){return(0,e.html)`<span class="${(0,e.ifDefined)(this.stripClasses.additionalTextClasses)}" id="${(0,e.ifDefined)(this._id)}-additionalText">${(0,e.ifDefined)(this.additionalText)}</span>`}function d(i,t,n){return(0,e.html)`<span class="ui5-tab-strip-itemText" id="${(0,e.ifDefined)(this._id)}-text">${this.semanticIconName?o.call(this,i,t,n):undefined}${(0,e.ifDefined)(this.displayText)}${this.isSingleClickArea?c.call(this,i,t,n):undefined}</span>`}function o(i,t,n){return n?(0,e.html)`<${(0,e.scopeTag)("ui5-icon",t,n)} class="${(0,e.ifDefined)(this.semanticIconClasses)}" name="${(0,e.ifDefined)(this.semanticIconName)}"></${(0,e.scopeTag)("ui5-icon",t,n)}>`:(0,e.html)`<ui5-icon class="${(0,e.ifDefined)(this.semanticIconClasses)}" name="${(0,e.ifDefined)(this.semanticIconName)}"></ui5-icon>`}function c(i,t,n){return n?(0,e.html)`<span class="ui5-tab-single-click-icon"><${(0,e.scopeTag)("ui5-icon",t,n)} name="slim-arrow-down"></${(0,e.scopeTag)("ui5-icon",t,n)}></span>`:(0,e.html)`<span class="ui5-tab-single-click-icon"><ui5-icon name="slim-arrow-down"></ui5-icon></span>`}function l(i,t,n){return n?(0,e.html)`<div class="ui5-tab-expand-button-separator"></div><div class="ui5-tab-expand-button" @click="${this._onTabExpandButtonClick}"><${(0,e.scopeTag)("ui5-button",t,n)} .tab=${(0,e.ifDefined)(this)} icon="slim-arrow-down" design="Transparent" tabindex="-1" ?disabled="${this.disabled}" tooltip="${(0,e.ifDefined)(this.expandButtonTitle)}" aria-haspopup="Menu"></${(0,e.scopeTag)("ui5-button",t,n)}></div>`:(0,e.html)`<div class="ui5-tab-expand-button-separator"></div><div class="ui5-tab-expand-button" @click="${this._onTabExpandButtonClick}"><ui5-button .tab=${(0,e.ifDefined)(this)} icon="slim-arrow-down" design="Transparent" tabindex="-1" ?disabled="${this.disabled}" tooltip="${(0,e.ifDefined)(this.expandButtonTitle)}" aria-haspopup="Menu"></ui5-button></div>`}var f=t;i.default=f});
//# sourceMappingURL=TabInStripTemplate.lit.js.map