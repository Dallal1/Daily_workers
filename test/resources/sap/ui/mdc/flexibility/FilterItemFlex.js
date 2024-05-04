/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ItemBaseFlex","./Util","sap/ui/fl/changeHandler/common/ChangeCategories"],(e,t,r)=>{"use strict";const n=Object.assign({},e);n.findItem=function(e,t,r){return t.reduce((t,n)=>t.then(t=>{if(!t){return e.getProperty(n,"propertyKey").then(e=>{if(e===r){return n}})}return t}),Promise.resolve())};n.beforeApply=function(e){if(e.applyConditionsAfterChangesApplied){e.applyConditionsAfterChangesApplied()}};n.getChangeVisualizationInfo=function(e,n){const i=e.getContent();const a=n.byId(e.getSelector().id);let o;const d=[i.name];const l={descriptionPayload:{}};if(e.getChangeType()==="addFilter"){l.descriptionPayload.category=r.ADD;o="filterbar.ITEM_ADD_CHANGE";d.push(i.index)}else if(e.getChangeType()==="removeFilter"){l.descriptionPayload.category=r.REMOVE;o="filterbar.ITEM_DEL_CHANGE"}else if(e.getChangeType()==="moveFilter"){l.descriptionPayload.category=r.MOVE;o="filterbar.ITEM_MOVE_CHANGE";d.push(e.getRevertData().index);d.push(i.index)}const s=a?.getPropertyHelper()?.getProperty(i.name);if(s){d.splice(0,1,s.label)}return t.getMdcResourceText(o,d).then(e=>{l.descriptionPayload.description=e;l.updateRequired=true;return l})};n.addFilter=n.createAddChangeHandler();n.removeFilter=n.createRemoveChangeHandler();n.moveFilter=n.createMoveChangeHandler();return n},true);
//# sourceMappingURL=FilterItemFlex.js.map