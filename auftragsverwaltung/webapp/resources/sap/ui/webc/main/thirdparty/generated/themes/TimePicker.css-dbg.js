sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/asset-registries/Themes", "sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css", "./sap_fiori_3/parameters-bundle.css"], function (_exports, _Themes, _parametersBundle, _parametersBundle2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _parametersBundle = _interopRequireDefault(_parametersBundle);
  _parametersBundle2 = _interopRequireDefault(_parametersBundle2);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", async () => _parametersBundle.default);
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", async () => _parametersBundle2.default);
  const styleData = {
    packageName: "@ui5/webcomponents",
    fileName: "themes/TimePicker.css",
    content: ":host{vertical-align:middle}.ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}[input-icon]{border-inline-start:var(--_ui5-v1-18-0_input_icon_border);border-radius:var(--_ui5-v1-18-0_input_icon_border_radius);color:var(--_ui5-v1-18-0_input_icon_color);cursor:pointer;min-height:1rem;min-width:1rem;outline:none;padding:var(--_ui5-v1-18-0_input_icon_padding)}[input-icon][pressed]{background:var(--_ui5-v1-18-0_input_icon_pressed_bg);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow);color:var(--_ui5-v1-18-0_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5-v1-18-0_input_icon_hover_bg);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}[input-icon]:hover{border-inline-start:var(--_ui5-v1-18-0_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-18-0_input_icon_box_shadow)}:host(:not([hidden])){display:inline-block;letter-spacing:normal;line-height:normal;word-spacing:normal}:host{background-color:var(--sapField_Background);border-radius:var(--_ui5-v1-18-0-time_picker_border_radius);color:var(--sapField_TextColor);margin:var(--_ui5-v1-18-0_input_margin_top_bottom) 0;min-width:calc(var(--_ui5-v1-18-0_input_min_width) + var(--_ui5-v1-18-0_input_icon_width))}:host([value-state=Error]){background-color:var(--sapField_InvalidBackground)}:host(:not([disabled]):hover){background:var(--sapField_Hover_Background)}.ui5-time-picker-root{letter-spacing:inherit;line-height:inherit;word-spacing:inherit}:host .ui5-time-picker-input{background-color:inherit;color:inherit;letter-spacing:inherit;line-height:inherit;margin:inherit;width:100%;word-spacing:inherit}.ui5-time-picker-input-icon-button{border-left:.0625rem solid transparent}.ui5-time-picker-input-icon-button:hover{background:var(--sapButton_Hover_Background);border-left:var(--_ui5-v1-18-0_time_picker_border);cursor:pointer}.ui5-time-picker-input-icon-button:active{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}.ui5-time-picker-input-icon-button[pressed]{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}"
  };
  var _default = styleData;
  _exports.default = _default;
});