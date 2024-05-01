/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/SelectionController","sap/base/util/merge"],(e,t)=>{"use strict";const n=e.extend("sap.ui.mdc.p13n.subcontroller.SelectionController");n.prototype._createAddRemoveChange=function(e,t,n){delete n.key;const a={selectorElement:e,changeSpecificData:{changeType:t,content:n}};return a};n.prototype.getCurrentState=function(e){let t=this.getAdaptationControl().getCurrentState()[this.getStateKey()];if(t instanceof Array&&!e){t=t.map(e=>{e.key=e.name;return e})}return t};n.prototype.getDelta=function(n){if(n.changedState instanceof Array){const e=t([],n.changedState);e.map(e=>{e.key=e.name;return e});n.changedState=e}if(n.existingState instanceof Array){const e=t([],n.existingState);e.map(e=>{e.key=e.name;return e});n.existingState=e}n.deltaAttributes.push("name");return e.prototype.getDelta.apply(this,arguments)};n.prototype._createMoveChange=function(e,t,n,a){const r={selectorElement:a,changeSpecificData:{changeType:n,content:{name:e,index:t}}};return r};return n});
//# sourceMappingURL=SelectionController.js.map