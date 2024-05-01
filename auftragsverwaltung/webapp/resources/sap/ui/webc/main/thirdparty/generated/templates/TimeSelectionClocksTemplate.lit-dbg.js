sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint no-unused-vars: 0 */

  function block0(context, tags, suffix) {
    return (0, _LitRenderer.html)`<div id="${(0, _LitRenderer.ifDefined)(this._id)}" class="ui5-time-picker-tsc-container" tabindex="-1" @keydown=${this._onkeydown} @keyup=${this._onkeyup} @focusin=${this._clocksFocusIn} format-pattern="${(0, _LitRenderer.ifDefined)(this.formatPattern)}"><div class="ui5-time-picker-tsc-buttons">${(0, _LitRenderer.repeat)(this._entities, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${this._periods.length ? block3.call(this, context, tags, suffix) : undefined}</div><div class="ui5-time-picker-tsc-clocks" role="img" aria-label="${(0, _LitRenderer.ifDefined)(this.clockDialAriaLabel)}">${(0, _LitRenderer.repeat)(this._entities, (item, index) => item._id || index, (item, index) => block5.call(this, context, tags, suffix, item, index))}</div></div>`;
  }
  function block1(context, tags, suffix, item, index) {
    return suffix ? (0, _LitRenderer.html)`${item.hasSeparator ? block2.call(this, context, tags, suffix, item, index) : undefined}<${(0, _LitRenderer.scopeTag)("ui5-toggle-spin-button", tags, suffix)} id="${(0, _LitRenderer.ifDefined)(this._id)}_button_${(0, _LitRenderer.ifDefined)(item.entity)}" .valueMin="${(0, _LitRenderer.ifDefined)(item.attributes.min)}" .valueMax="${(0, _LitRenderer.ifDefined)(item.attributes.max)}" .valueNow="${(0, _LitRenderer.ifDefined)(item.value)}" .valueText="${(0, _LitRenderer.ifDefined)(item.textValue)}" .accessibleName="${(0, _LitRenderer.ifDefined)(item.label)}" .pressed="${(0, _LitRenderer.ifDefined)(item.active)}" ?focused="${item.active}" @focusin="${this._buttonFocusIn}">${(0, _LitRenderer.ifDefined)(item.stringValue)}</${(0, _LitRenderer.scopeTag)("ui5-toggle-spin-button", tags, suffix)}>` : (0, _LitRenderer.html)`${item.hasSeparator ? block2.call(this, context, tags, suffix, item, index) : undefined}<ui5-toggle-spin-button id="${(0, _LitRenderer.ifDefined)(this._id)}_button_${(0, _LitRenderer.ifDefined)(item.entity)}" .valueMin="${(0, _LitRenderer.ifDefined)(item.attributes.min)}" .valueMax="${(0, _LitRenderer.ifDefined)(item.attributes.max)}" .valueNow="${(0, _LitRenderer.ifDefined)(item.value)}" .valueText="${(0, _LitRenderer.ifDefined)(item.textValue)}" .accessibleName="${(0, _LitRenderer.ifDefined)(item.label)}" .pressed="${(0, _LitRenderer.ifDefined)(item.active)}" ?focused="${item.active}" @focusin="${this._buttonFocusIn}">${(0, _LitRenderer.ifDefined)(item.stringValue)}</ui5-toggle-spin-button>`;
  }
  function block2(context, tags, suffix, item, index) {
    return (0, _LitRenderer.html)`<span separator>:</span>`;
  }
  function block3(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<span separator></span><${(0, _LitRenderer.scopeTag)("ui5-segmented-button", tags, suffix)} id="${(0, _LitRenderer.ifDefined)(this._id)}_AmPm" @click=${this._periodChange}>${(0, _LitRenderer.repeat)(this._periods, (item, index) => item._id || index, (item, index) => block4.call(this, context, tags, suffix, item, index))}</${(0, _LitRenderer.scopeTag)("ui5-segmented-button", tags, suffix)}>` : (0, _LitRenderer.html)`<span separator></span><ui5-segmented-button id="${(0, _LitRenderer.ifDefined)(this._id)}_AmPm" @click=${this._periodChange}>${(0, _LitRenderer.repeat)(this._periods, (item, index) => item._id || index, (item, index) => block4.call(this, context, tags, suffix, item, index))}</ui5-segmented-button>`;
  }
  function block4(context, tags, suffix, item, index) {
    return suffix ? (0, _LitRenderer.html)`<${(0, _LitRenderer.scopeTag)("ui5-segmented-button-item", tags, suffix)} ?pressed=${item.pressed}>${(0, _LitRenderer.ifDefined)(item.label)}</${(0, _LitRenderer.scopeTag)("ui5-segmented-button-item", tags, suffix)}>` : (0, _LitRenderer.html)`<ui5-segmented-button-item ?pressed=${item.pressed}>${(0, _LitRenderer.ifDefined)(item.label)}</ui5-segmented-button-item>`;
  }
  function block5(context, tags, suffix, item, index) {
    return suffix ? (0, _LitRenderer.html)`<${(0, _LitRenderer.scopeTag)("ui5-time-picker-clock", tags, suffix)} id="${(0, _LitRenderer.ifDefined)(this._id)}_clock_${(0, _LitRenderer.ifDefined)(item.entity)}" data-sap-clock="${(0, _LitRenderer.ifDefined)(item.entity)}" .active="${(0, _LitRenderer.ifDefined)(item.active)}" .label="${(0, _LitRenderer.ifDefined)(item.label)}" .itemMin="${(0, _LitRenderer.ifDefined)(item.itemMin)}" .itemMax="${(0, _LitRenderer.ifDefined)(item.itemMax)}" .selectedValue="${(0, _LitRenderer.ifDefined)(item.value)}" .displayStep="${(0, _LitRenderer.ifDefined)(item.displayStep)}" .valueStep="${(0, _LitRenderer.ifDefined)(item.attributes.step)}" .lastItemReplacement="${(0, _LitRenderer.ifDefined)(item.lastItemReplacement)}" .showInnerCircle="${(0, _LitRenderer.ifDefined)(item.showInnerCircle)}" .prependZero="${(0, _LitRenderer.ifDefined)(item.prependZero)}" @ui5-change=${(0, _LitRenderer.ifDefined)(this._clockChange)}></${(0, _LitRenderer.scopeTag)("ui5-time-picker-clock", tags, suffix)}>` : (0, _LitRenderer.html)`<ui5-time-picker-clock id="${(0, _LitRenderer.ifDefined)(this._id)}_clock_${(0, _LitRenderer.ifDefined)(item.entity)}" data-sap-clock="${(0, _LitRenderer.ifDefined)(item.entity)}" .active="${(0, _LitRenderer.ifDefined)(item.active)}" .label="${(0, _LitRenderer.ifDefined)(item.label)}" .itemMin="${(0, _LitRenderer.ifDefined)(item.itemMin)}" .itemMax="${(0, _LitRenderer.ifDefined)(item.itemMax)}" .selectedValue="${(0, _LitRenderer.ifDefined)(item.value)}" .displayStep="${(0, _LitRenderer.ifDefined)(item.displayStep)}" .valueStep="${(0, _LitRenderer.ifDefined)(item.attributes.step)}" .lastItemReplacement="${(0, _LitRenderer.ifDefined)(item.lastItemReplacement)}" .showInnerCircle="${(0, _LitRenderer.ifDefined)(item.showInnerCircle)}" .prependZero="${(0, _LitRenderer.ifDefined)(item.prependZero)}" @ui5-change=${(0, _LitRenderer.ifDefined)(this._clockChange)}></ui5-time-picker-clock>`;
  }
  var _default = block0;
  _exports.default = _default;
});