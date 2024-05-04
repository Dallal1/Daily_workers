sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v4/sys-help-2", "./v5/sys-help-2"], function (_exports, _Theme, _sysHelp, _sysHelp2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _sysHelp.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _sysHelp.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isLegacyThemeFamily)() ? _sysHelp.pathData : _sysHelp2.pathData;
  _exports.pathData = pathData;
  var _default = "sys-help-2";
  _exports.default = _default;
});