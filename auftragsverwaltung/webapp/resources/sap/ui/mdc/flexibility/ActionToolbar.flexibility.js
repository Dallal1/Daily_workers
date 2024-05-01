/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ItemBaseFlex","./Util","sap/ui/fl/changeHandler/common/ChangeCategories"],(e,t,n)=>{"use strict";const i=Object.assign({},e);i.findItem=function(e,t,n){return t.find(t=>e.getId(t)===n)};i.determineAggregation=function(e,t){return e.getAggregation(t,"actions").then(e=>({name:"actions",items:e}))};i._applyMove=function(e,n,i,a){const r=a===t.REVERT?true:false;const o=i.modifier;if(o.getParent(n)){const e=o.getParent(n);if(o.getControlType(e)==="sap.ui.mdc.Chart"){n=e}else if(o.getParent(e)&&o.getControlType(o.getParent(e))==="sap.ui.mdc.Table"){n=o.getParent(e)}}this.beforeApply(e.getChangeType(),n,r);if(this._bSupressFlickering){this._delayInvalidate(n)}const g=r?e.getRevertData():e.getContent();let s;let c;let d;let l;const h=this.determineAggregation(o,n).then(e=>{c=e;return this._getExistingAggregationItem(g,i,n)}).then(e=>{s=e}).then(()=>{if(!s){throw new Error("No corresponding item in "+c.name+" found. Change to move item cannot be "+this._getOperationText(r)+"at this moment")}l=o.getId(s);return o.findIndexInParentAggregation(s)}).then(e=>{d=e;return o.removeAggregation(n,c.name,s).then(()=>o.insertAggregation(n,c.name,s,g.index))}).then(()=>{if(r){e.resetRevertData()}else{e.setRevertData({name:g.name,index:d,item:l})}this.afterApply(e.getChangeType(),n,r)});return h};i.getChangeVisualizationInfo=function(e,i){const a=e.getContent();const r=i.byId(e.getSelector().id);let o;const g=[a.name];const s={descriptionPayload:{}};if(e.getChangeType()==="moveAction"){s.descriptionPayload.category=n.MOVE;o="actiontoolbar.ITEM_MOVE_CHANGE";g.push(e.getRevertData().index);g.push(a.index)}if(r){const e=i.byId(a.name);if(e){g.splice(0,1,e.getLabel())}}return t.getMdcResourceText(o,g).then(e=>{s.descriptionPayload.description=e;s.updateRequired=true;return s})};return{moveAction:i.createMoveChangeHandler()}});
//# sourceMappingURL=ActionToolbar.flexibility.js.map