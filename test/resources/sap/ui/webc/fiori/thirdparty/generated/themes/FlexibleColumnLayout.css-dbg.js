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
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-fiori", "sap_fiori_3", async () => _parametersBundle2.default);
  const styleData = {
    packageName: "@ui5/webcomponents-fiori",
    fileName: "themes/FlexibleColumnLayout.css",
    content: ".ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}:host(:not([hidden])){background:var(--_ui5-v1-18-0_fcl_solid_bg);display:block}.ui5-fcl-root{display:flex;flex-direction:row;height:100%}.ui5-fcl-column{background:inherit;box-sizing:border-box;overflow-y:auto;will-change:width}.ui5-fcl-column-animation{transition:width .56s cubic-bezier(.1,0,.05,1),visibility .56s ease-in}:host([_visible-columns=\"2\"]) .ui5-fcl-column--start{border-inline-end:var(--_ui5-v1-18-0_fcl_column_border)}:host([_visible-columns=\"3\"]) .ui5-fcl-column--start{border-inline-end:var(--_ui5-v1-18-0_fcl_column_border)}:host([_visible-columns=\"2\"]) .ui5-fcl-column--middle{border-inline-start:var(--_ui5-v1-18-0_fcl_column_border)}:host([_visible-columns=\"3\"]) .ui5-fcl-column--middle{border-inline-start:var(--_ui5-v1-18-0_fcl_column_border)}:host([_visible-columns=\"3\"]) .ui5-fcl-column--middle{border-inline-end:var(--_ui5-v1-18-0_fcl_column_border)}:host([_visible-columns=\"3\"]) .ui5-fcl-column--end{border-inline-start:var(--_ui5-v1-18-0_fcl_column_border)}.ui5-fcl-column--hidden{display:none}.ui5-fcl-arrow-container{align-items:center;background-color:var(--sapShell_Background);display:flex;justify-content:center;width:1rem}.ui5-fcl-arrow{height:1.5rem;min-width:1.5rem;overflow:visible;position:relative;width:1.5rem;will-change:transform;z-index:1}.ui5-fcl-arrow:before{background-image:var(--_ui5-v1-18-0_fcl_decoration_top);background-position-y:-.3125rem;bottom:100%}.ui5-fcl-arrow:after{background-image:var(--_ui5-v1-18-0_fcl_decoration_bottom);background-position-y:.3125rem;top:100%}.ui5-fcl-arrow:after,.ui5-fcl-arrow:before{background-position-x:calc(50% - .03125rem);background-repeat:no-repeat;background-size:.0625rem 100%;content:\"\";height:4rem;left:0;position:absolute;transition:all .1s ease-in;width:100%}.ui5-fcl-arrow:hover:after,.ui5-fcl-arrow:hover:before{height:7rem}"
  };
  var _default = styleData;
  _exports.default = _default;
});