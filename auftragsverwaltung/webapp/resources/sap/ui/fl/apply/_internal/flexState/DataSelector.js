/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/base/util/ObjectPath","sap/ui/base/ManagedObject"],function(e,t,i){"use strict";var a=i.extend("sap.ui.fl.apply._internal.flexState.DataSelector",{metadata:{properties:{parentDataSelector:{type:"object"},cachedResult:{type:"any"},parameterKey:{type:"string"},initFunction:{type:"function"},executeFunction:{type:"function"},updateListeners:{type:"function[]",defaultValue:[]},checkInvalidation:{type:"function",defaultValue(){return true}}}},constructor:function(...e){i.apply(this,e);this._mInitialized={};if(this.getParameterKey()){this.setCachedResult({})}var t=this.getParentDataSelector();if(t){this.onParentSelectorUpdate=this.checkUpdate.bind(this);t.addUpdateListener(this.onParentSelectorUpdate)}}});const n="DataSelector_no_parameter";function r(e,t){const i=[];function a(e){const i=e.getParameterKey();if(!i){return n}return t?.[i]}let r=e;do{const t=a(r);if(t||r!==e){if(t===undefined){throw new Error(`Parameter '${r.getParameterKey()}' is missing`)}i.unshift(t)}r=r.getParentDataSelector()}while(r);return i}a.prototype.addUpdateListener=function(e){var t=this.getUpdateListeners();if(!t.includes(e)){this.setUpdateListeners([].concat(t,e))}};a.prototype.removeUpdateListener=function(e){var t=this.getUpdateListeners();this.setUpdateListeners(t.filter(function(t){return t!==e}))};a.prototype.exit=function(){var e=this.getParentDataSelector();if(e){e.removeUpdateListener(this.onParentSelectorUpdate)}};a.prototype._getParameterizedCachedResult=function(e){const i=r(this,e);if(i.length===0){return this.getCachedResult()}return t.get(i,this.getCachedResult())};a.prototype._setParameterizedCachedResult=function(i,a){const n=r(this,i);const s={};if(n.length===0){Object.assign(s,a)}else{t.set(n,a,s)}return this.setCachedResult(e({},this.getCachedResult(),s))};a.prototype._clearCache=function(e,t){const i=[];const a=this.getParameterKey();if(!a){this.setCachedResult(null);i.push(e)}else if(Object.keys(e||{}).includes(a)){if(this._getParameterizedCachedResult(e)!==undefined){this._setParameterizedCachedResult(e,null);i.push(e)}}else{const t=this._getParameterizedCachedResult(e);Object.keys(t||{}).forEach(t=>{i.push({...e,[a]:t})});this.setCachedResult({})}this.getUpdateListeners().forEach(function(e){i.forEach(i=>{e(i,t)})})};a.prototype.clearCachedResult=function(e){this._clearCache(e)};a.prototype.get=function(e){var t=this.getParameterKey();if(t&&!(e||{})[t]){throw new Error(`Parameter '${t}' is missing`)}var i=this._getParameterizedCachedResult(e);if(i!==null&&i!==undefined){return i}var a=this.getParentDataSelector();var n=a&&a.get(e);var r=(e||{})[t];if(!this._mInitialized[r]&&this.getInitFunction()){this.getInitFunction()(n,r);this._mInitialized[r]=true}var s=this.getExecuteFunction()(n,e);this._setParameterizedCachedResult(e,s);return s};function s(e,t,i){if(i){return i.some(i=>e(t,i))}return true}a.prototype.checkUpdate=function(e,t){const i=this.getParameterKey();if(i!==undefined&&!Object.keys(e||{}).includes(i)){const a=this._getParameterizedCachedResult(e);const n=Object.keys(a&&typeof a==="object"?a:{});n.forEach(a=>{const n={...e,[i]:a};const r=s(this.getCheckInvalidation(),n,t);if(r){this._clearCache(n,t)}return!r})}else{const i=s(this.getCheckInvalidation(),e,t);if(i){this._clearCache(e,t)}}};return a});
//# sourceMappingURL=DataSelector.js.map