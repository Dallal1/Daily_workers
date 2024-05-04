/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/mdc/actiontoolbar/ActionToolbarActionRenderer","sap/ui/mdc/enums/ActionToolbarActionAlignment","sap/ui/base/ManagedObjectObserver"],(t,e,o,n)=>{"use strict";const i=t.extend("sap.ui.mdc.actiontoolbar.ActionToolbarAction",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/actiontoolbar/ActionToolbarAction.designtime",interfaces:["sap.m.IOverflowToolbarContent"],properties:{layoutInformation:{type:"object",defaultValue:{aggregationName:"end",alignment:o.Begin}}},defaultAggregation:"action",aggregations:{action:{type:"sap.ui.core.Control",multiple:false}}},renderer:e});i.prototype.init=function(){this._oObserver=new n(this.observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["action"]})};i.prototype.exit=function(){this._oObserver.disconnect();this._oObserver=undefined};i.prototype.observeChanges=function(t){if(t.name==="action"){const e=t.child;if(t.mutation==="insert"){this._oObserver.observe(e,{properties:["visible"]});r(this.getParent())}if(t.mutation==="remove"){this._oObserver.unobserve(e);r(this.getParent())}}if(t.name==="visible"){r(this.getParent())}};i.prototype.getDomRef=function(){return this.getAction()&&this.getAction().getDomRef()};i.prototype.getLayoutData=function(){const e=t.prototype.getLayoutData.apply(this);return e?e:this.getAction()&&this.getAction().getLayoutData()};i.prototype.getOverflowToolbarConfig=function(){const t=this.getAction()&&this.getAction().getOverflowToolbarConfig?this.getAction().getOverflowToolbarConfig():{canOverflow:true};t.onBeforeEnterOverflow=this._getOnBeforeEnterOverflow(t);t.onAfterExitOverflow=this._getOnAfterExitOverflow(t);return t};i.prototype._getOnBeforeEnterOverflow=function(t){const e=t.onBeforeEnterOverflow;return function(t){if(e){e(t.getAction())}r(t.getParent())}};i.prototype._getOnAfterExitOverflow=function(t){const e=t.onAfterExitOverflow;return function(t){if(e){e(t.getAction())}r(t.getParent())}};i.prototype.getLabel=function(){const t=this.getAction();return t&&t.getText?t.getText():this.getId()};function r(t){if(t?._updateSeparators){t._updateSeparators()}}return i});
//# sourceMappingURL=ActionToolbarAction.js.map