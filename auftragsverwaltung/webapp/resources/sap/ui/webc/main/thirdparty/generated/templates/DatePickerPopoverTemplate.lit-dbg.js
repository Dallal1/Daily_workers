sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint no-unused-vars: 0 */

  function block0(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<${(0, _LitRenderer.scopeTag)("ui5-responsive-popover", tags, suffix)} id="${(0, _LitRenderer.ifDefined)(this._id)}-responsive-popover" allow-target-overlap placement-type="Bottom" horizontal-align="Left" hide-arrow ?_hide-header=${(0, _LitRenderer.ifDefined)(this._shouldHideHeader)} @keydown="${this._onkeydown}" @ui5-after-close="${(0, _LitRenderer.ifDefined)(this.onResponsivePopoverAfterClose)}">${this.showHeader ? block1.call(this, context, tags, suffix) : undefined}<${(0, _LitRenderer.scopeTag)("ui5-calendar", tags, suffix)} id="${(0, _LitRenderer.ifDefined)(this._id)}-calendar" primary-calendar-type="${(0, _LitRenderer.ifDefined)(this._primaryCalendarType)}" secondary-calendar-type="${(0, _LitRenderer.ifDefined)(this.secondaryCalendarType)}" format-pattern="${(0, _LitRenderer.ifDefined)(this._formatPattern)}" timestamp="${(0, _LitRenderer.ifDefined)(this._calendarTimestamp)}" .selectionMode="${(0, _LitRenderer.ifDefined)(this._calendarSelectionMode)}" .minDate="${(0, _LitRenderer.ifDefined)(this.minDate)}" .maxDate="${(0, _LitRenderer.ifDefined)(this.maxDate)}" @ui5-selected-dates-change="${(0, _LitRenderer.ifDefined)(this.onSelectedDatesChange)}" @ui5-show-month-press="${(0, _LitRenderer.ifDefined)(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${(0, _LitRenderer.ifDefined)(this.onHeaderShowYearPress)}" ?hide-week-numbers="${this.hideWeekNumbers}" ._currentPicker="${(0, _LitRenderer.ifDefined)(this._calendarCurrentPicker)}" ._pickersMode="${(0, _LitRenderer.ifDefined)(this._calendarPickersMode)}">${(0, _LitRenderer.repeat)(this._calendarSelectedDates, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</${(0, _LitRenderer.scopeTag)("ui5-calendar", tags, suffix)}>${this.showFooter ? block3.call(this, context, tags, suffix) : undefined}</${(0, _LitRenderer.scopeTag)("ui5-responsive-popover", tags, suffix)}> ` : (0, _LitRenderer.html)`<ui5-responsive-popover id="${(0, _LitRenderer.ifDefined)(this._id)}-responsive-popover" allow-target-overlap placement-type="Bottom" horizontal-align="Left" hide-arrow ?_hide-header=${(0, _LitRenderer.ifDefined)(this._shouldHideHeader)} @keydown="${this._onkeydown}" @ui5-after-close="${(0, _LitRenderer.ifDefined)(this.onResponsivePopoverAfterClose)}">${this.showHeader ? block1.call(this, context, tags, suffix) : undefined}<ui5-calendar id="${(0, _LitRenderer.ifDefined)(this._id)}-calendar" primary-calendar-type="${(0, _LitRenderer.ifDefined)(this._primaryCalendarType)}" secondary-calendar-type="${(0, _LitRenderer.ifDefined)(this.secondaryCalendarType)}" format-pattern="${(0, _LitRenderer.ifDefined)(this._formatPattern)}" timestamp="${(0, _LitRenderer.ifDefined)(this._calendarTimestamp)}" .selectionMode="${(0, _LitRenderer.ifDefined)(this._calendarSelectionMode)}" .minDate="${(0, _LitRenderer.ifDefined)(this.minDate)}" .maxDate="${(0, _LitRenderer.ifDefined)(this.maxDate)}" @ui5-selected-dates-change="${(0, _LitRenderer.ifDefined)(this.onSelectedDatesChange)}" @ui5-show-month-press="${(0, _LitRenderer.ifDefined)(this.onHeaderShowMonthPress)}" @ui5-show-year-press="${(0, _LitRenderer.ifDefined)(this.onHeaderShowYearPress)}" ?hide-week-numbers="${this.hideWeekNumbers}" ._currentPicker="${(0, _LitRenderer.ifDefined)(this._calendarCurrentPicker)}" ._pickersMode="${(0, _LitRenderer.ifDefined)(this._calendarPickersMode)}">${(0, _LitRenderer.repeat)(this._calendarSelectedDates, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</ui5-calendar>${this.showFooter ? block3.call(this, context, tags, suffix) : undefined}</ui5-responsive-popover> `;
  }
  function block1(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${(0, _LitRenderer.ifDefined)(this._headerTitleText)}</span><${(0, _LitRenderer.scopeTag)("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closePicker}"></${(0, _LitRenderer.scopeTag)("ui5-button", tags, suffix)}></div></div>` : (0, _LitRenderer.html)`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${(0, _LitRenderer.ifDefined)(this._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this.closePicker}"></ui5-button></div></div>`;
  }
  function block2(context, tags, suffix, item, index) {
    return suffix ? (0, _LitRenderer.html)`<${(0, _LitRenderer.scopeTag)("ui5-date", tags, suffix)} value="${(0, _LitRenderer.ifDefined)(item)}"></${(0, _LitRenderer.scopeTag)("ui5-date", tags, suffix)}>` : (0, _LitRenderer.html)`<ui5-date value="${(0, _LitRenderer.ifDefined)(item)}"></ui5-date>`;
  }
  function block3(context, tags, suffix) {
    return (0, _LitRenderer.html)``;
  }
  var _default = block0;
  _exports.default = _default;
});