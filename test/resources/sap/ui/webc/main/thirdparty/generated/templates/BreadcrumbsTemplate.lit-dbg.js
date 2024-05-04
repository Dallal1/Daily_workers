sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint no-unused-vars: 0 */

  function block0(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<nav class="ui5-breadcrumbs-root" aria-label="${(0, _LitRenderer.ifDefined)(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><${(0, _LitRenderer.scopeTag)("ui5-link", tags, suffix)} @ui5-click="${(0, _LitRenderer.ifDefined)(this._openRespPopover)}" accessible-role="button" aria-label="${(0, _LitRenderer.ifDefined)(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${(0, _LitRenderer.ifDefined)(this._ariaHasPopup)}"><${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)} name="slim-arrow-down" title="${(0, _LitRenderer.ifDefined)(this._dropdownArrowAccessibleNameText)}"></${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)}></${(0, _LitRenderer.scopeTag)("ui5-link", tags, suffix)}></li>${(0, _LitRenderer.repeat)(this._linksData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : undefined}</ol></nav>` : (0, _LitRenderer.html)`<nav class="ui5-breadcrumbs-root" aria-label="${(0, _LitRenderer.ifDefined)(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><ui5-link @ui5-click="${(0, _LitRenderer.ifDefined)(this._openRespPopover)}" accessible-role="button" aria-label="${(0, _LitRenderer.ifDefined)(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${(0, _LitRenderer.ifDefined)(this._ariaHasPopup)}"><ui5-icon name="slim-arrow-down" title="${(0, _LitRenderer.ifDefined)(this._dropdownArrowAccessibleNameText)}"></ui5-icon></ui5-link></li>${(0, _LitRenderer.repeat)(this._linksData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : undefined}</ol></nav>`;
  }
  function block1(context, tags, suffix, item, index) {
    return suffix ? (0, _LitRenderer.html)`<li class="ui5-breadcrumbs-link-wrapper" id="${(0, _LitRenderer.ifDefined)(item._id)}-link-wrapper"><${(0, _LitRenderer.scopeTag)("ui5-link", tags, suffix)} @ui5-click="${(0, _LitRenderer.ifDefined)(this._onLinkPress)}" href="${(0, _LitRenderer.ifDefined)(item.href)}" target="${(0, _LitRenderer.ifDefined)(item.target)}" id="${(0, _LitRenderer.ifDefined)(item._id)}-link" accessible-name="${(0, _LitRenderer.ifDefined)(item._accessibleNameText)}" data-ui5-stable="${(0, _LitRenderer.ifDefined)(item.stableDomRef)}">${(0, _LitRenderer.ifDefined)(item.innerText)}</${(0, _LitRenderer.scopeTag)("ui5-link", tags, suffix)}></li>` : (0, _LitRenderer.html)`<li class="ui5-breadcrumbs-link-wrapper" id="${(0, _LitRenderer.ifDefined)(item._id)}-link-wrapper"><ui5-link @ui5-click="${(0, _LitRenderer.ifDefined)(this._onLinkPress)}" href="${(0, _LitRenderer.ifDefined)(item.href)}" target="${(0, _LitRenderer.ifDefined)(item.target)}" id="${(0, _LitRenderer.ifDefined)(item._id)}-link" accessible-name="${(0, _LitRenderer.ifDefined)(item._accessibleNameText)}" data-ui5-stable="${(0, _LitRenderer.ifDefined)(item.stableDomRef)}">${(0, _LitRenderer.ifDefined)(item.innerText)}</ui5-link></li>`;
  }
  function block2(context, tags, suffix) {
    return suffix ? (0, _LitRenderer.html)`<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${(0, _LitRenderer.ifDefined)(this._currentLocationAccName)}" role="link" id="${(0, _LitRenderer.ifDefined)(this._id)}-labelWrapper"><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>${(0, _LitRenderer.ifDefined)(this._currentLocationText)}</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></span></li>` : (0, _LitRenderer.html)`<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${(0, _LitRenderer.ifDefined)(this._currentLocationAccName)}" role="link" id="${(0, _LitRenderer.ifDefined)(this._id)}-labelWrapper"><ui5-label>${(0, _LitRenderer.ifDefined)(this._currentLocationText)}</ui5-label></span></li>`;
  }
  var _default = block0;
  _exports.default = _default;
});