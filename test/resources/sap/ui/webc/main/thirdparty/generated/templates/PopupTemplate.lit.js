sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(s,e){"use strict";Object.defineProperty(s,"__esModule",{value:true});s.default=void 0;function t(s,t,a){return(0,e.html)`<section style="${(0,e.styleMap)(this.styles.root)}" class="${(0,e.classMap)(this.classes.root)}" role="${(0,e.ifDefined)(this._role)}" aria-modal="${(0,e.ifDefined)(this._ariaModal)}" aria-label="${(0,e.ifDefined)(this._ariaLabel)}" aria-labelledby="${(0,e.ifDefined)(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><div style="${(0,e.styleMap)(this.styles.content)}" class="${(0,e.classMap)(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `}var a=t;s.default=a});
//# sourceMappingURL=PopupTemplate.lit.js.map