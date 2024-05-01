sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint no-unused-vars: 0 */

  function block0(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<div class="ui5-calheader-root"><div data-ui5-cal-header-btn-prev class="${(0, _LitRenderer.classMap)(this.classes.prevButton)}" role="button" @mousedown=${this.onPrevButtonClick} title="${(0, _LitRenderer.ifDefined)(this._prevButtonText)}"><${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)} class="ui5-calheader-arrowicon" name="slim-arrow-left"></${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)}></div><div class="ui5-calheader-midcontainer"><div data-ui5-cal-header-btn-month class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isMonthButtonHidden}" tabindex="0" role="button" aria-label="${(0, _LitRenderer.ifDefined)(this.accInfo.ariaLabelMonthButton)}" @click=${this.onMonthButtonClick} @keydown=${this.onMonthButtonKeyDown} @keyup=${this.onMonthButtonKeyUp}><span>${(0, _LitRenderer.ifDefined)(this._monthButtonText)}</span>${this.hasSecondaryCalendarType ? block1.call(this, context, tags, suffix) : undefined}</div><div data-ui5-cal-header-btn-year class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isYearButtonHidden}" tabindex="0" role="button" @click=${this.onYearButtonClick} @keydown=${this.onYearButtonKeyDown} @keyup=${this.onYearButtonKeyUp}><span>${(0, _LitRenderer.ifDefined)(this._yearButtonText)}</span>${this.hasSecondaryCalendarType ? block2.call(this, context, tags, suffix) : undefined}</div></div><div data-ui5-cal-header-btn-next class="${(0, _LitRenderer.classMap)(this.classes.nextButton)}" role="button" @mousedown=${this.onNextButtonClick} title=${(0, _LitRenderer.ifDefined)(this._nextButtonText)}><${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)} class="ui5-calheader-arrowicon" name="slim-arrow-right"></${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)}></div></div>` : (0, _LitRenderer.html)`<div class="ui5-calheader-root"><div data-ui5-cal-header-btn-prev class="${(0, _LitRenderer.classMap)(this.classes.prevButton)}" role="button" @mousedown=${this.onPrevButtonClick} title="${(0, _LitRenderer.ifDefined)(this._prevButtonText)}"><ui5-icon class="ui5-calheader-arrowicon" name="slim-arrow-left"></ui5-icon></div><div class="ui5-calheader-midcontainer"><div data-ui5-cal-header-btn-month class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isMonthButtonHidden}" tabindex="0" role="button" aria-label="${(0, _LitRenderer.ifDefined)(this.accInfo.ariaLabelMonthButton)}" @click=${this.onMonthButtonClick} @keydown=${this.onMonthButtonKeyDown} @keyup=${this.onMonthButtonKeyUp}><span>${(0, _LitRenderer.ifDefined)(this._monthButtonText)}</span>${this.hasSecondaryCalendarType ? block1.call(this, context, tags, suffix) : undefined}</div><div data-ui5-cal-header-btn-year class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" ?hidden="${this.isYearButtonHidden}" tabindex="0" role="button" @click=${this.onYearButtonClick} @keydown=${this.onYearButtonKeyDown} @keyup=${this.onYearButtonKeyUp}><span>${(0, _LitRenderer.ifDefined)(this._yearButtonText)}</span>${this.hasSecondaryCalendarType ? block2.call(this, context, tags, suffix) : undefined}</div></div><div data-ui5-cal-header-btn-next class="${(0, _LitRenderer.classMap)(this.classes.nextButton)}" role="button" @mousedown=${this.onNextButtonClick} title=${(0, _LitRenderer.ifDefined)(this._nextButtonText)}><ui5-icon class="ui5-calheader-arrowicon" name="slim-arrow-right"></ui5-icon></div></div>`;
  }
  function block1(context, tags, suffix) {
    return (0, _LitRenderer.html)`<span class="ui5-calheader-btn-sectext">${(0, _LitRenderer.ifDefined)(this._secondMonthButtonText)}</span>`;
  }
  function block2(context, tags, suffix) {
    return (0, _LitRenderer.html)`<span class="ui5-calheader-btn-sectext">${(0, _LitRenderer.ifDefined)(this._yearButtonTextSecType)}</span>`;
  }
  var _default = block0;
  _exports.default = _default;
});