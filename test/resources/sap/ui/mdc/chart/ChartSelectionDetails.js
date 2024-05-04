/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/SelectionDetails","sap/m/SelectionDetailsItem","sap/m/SelectionDetailsItemLine","sap/m/SelectionDetailsRenderer"],(t,e,i,a)=>{"use strict";const n=t.extend("sap.ui.mdc.chart.ChartSelectionDetails",{metadata:{library:"sap.ui.mdc",interfaces:[],defaultAggregation:"",properties:{},aggregations:{},associations:{},events:{}},renderer:a});n.prototype.init=function(){t.prototype.init.apply(this,arguments);this._registerTemplate();this._attachEvents()};n.prototype._registerTemplate=function(){this.registerSelectionDetailsItemFactory([],(t,a,n,r)=>{const s=[];for(let e=0;e<t.length;e++){s.push(new i({label:t[e].label,value:this._formatValue(t[e].value),unit:t[e].unit}))}return new e({enableNav:this._hasNavigationTargets(a),lines:s}).setBindingContext(n)})};n.prototype._formatValue=function(t){if(t){return t instanceof Object?t:t.toString()}else{return t}};n.prototype._hasNavigationTargets=function(t){return false};n.prototype._attachEvents=function(){this.attachActionPress(function(t){const e=this.getParent().getParent();const i=[];t.getParameter("items").forEach(t=>{i.push(t.getBindingContext())});e.fireSelectionDetailsActionPressed({id:t.getParameter("id"),action:t.getParameter("action"),itemContexts:i,level:t.getParameter("level")})})};return n});
//# sourceMappingURL=ChartSelectionDetails.js.map