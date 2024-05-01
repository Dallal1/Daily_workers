sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v1/top", "./v2/top"], function (_exports, _Theme, _top, _top2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _top.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _top.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isLegacyThemeFamily)() ? _top.pathData : _top2.pathData;
  _exports.pathData = pathData;
  var _default = "business-suite/top";
  _exports.default = _default;
});