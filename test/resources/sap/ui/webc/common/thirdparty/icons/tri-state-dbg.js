sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v4/tri-state", "./v5/tri-state"], function (_exports, _Theme, _triState, _triState2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _triState.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _triState.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isLegacyThemeFamily)() ? _triState.pathData : _triState2.pathData;
  _exports.pathData = pathData;
  var _default = "tri-state";
  _exports.default = _default;
});