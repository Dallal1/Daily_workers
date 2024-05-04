sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/asset-registries/Icons", "../generated/i18n/i18n-defaults"], function (_exports, _Icons, _i18nDefaults) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.pathData = _exports.ltr = _exports.default = _exports.accData = void 0;
  const name = "overflow";
  const pathData = "M64 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19z";
  _exports.pathData = pathData;
  const ltr = false;
  _exports.ltr = ltr;
  const accData = _i18nDefaults.ICON_OVERFLOW;
  _exports.accData = accData;
  const collection = "SAP-icons-v5";
  const packageName = "@ui5/webcomponents-icons";
  (0, _Icons.registerIcon)(name, {
    pathData,
    ltr,
    accData,
    collection,
    packageName
  });
  var _default = "SAP-icons-v5/overflow";
  _exports.default = _default;
});