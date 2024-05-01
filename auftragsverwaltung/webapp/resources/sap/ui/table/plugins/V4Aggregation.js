/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","../utils/TableUtils","sap/base/util/deepClone"],function(t,e,o){"use strict";function i(t,o){var i="TBL_ROW_GROUP_TITLE";var r=[o.property.label,t.getProperty(o.property.path,true)];if(o.textProperty){i="TBL_ROW_GROUP_TITLE_FULL";r.push(t.getProperty(o.textProperty.path,true))}return e.getResourceText(i,r)}var r=t.extend("sap.ui.table.plugins.V4Aggregation",{metadata:{library:"sap.ui.table",properties:{totalSummaryOnTop:{type:"string",defaultValue:"Off"},totalSummaryOnBottom:{type:"string",defaultValue:"Fixed"},groupSummary:{type:"string",defaultValue:"Bottom"},groupHeaderFormatter:{type:"function"}}}});r.findOn=t.findOn;r.prototype.isApplicable=function(e){return t.prototype.isApplicable.apply(this,arguments)&&e.getMetadata().getName()==="sap.ui.table.Table"};r.prototype.activate=function(){var e=this.getTableBinding();if(e&&!e.isA("sap.ui.model.odata.v4.ODataListBinding")){return}t.prototype.activate.apply(this,arguments)};r.prototype.onActivate=function(t){this.setRowCountConstraints({fixedTop:false,fixedBottom:false});e.Grouping.setToDefaultGroupMode(t);e.Hook.register(t,e.Hook.Keys.Row.UpdateState,this.updateRowState,this);e.Hook.register(t,e.Hook.Keys.Row.Expand,g,this);e.Hook.register(t,e.Hook.Keys.Row.Collapse,u,this)};r.prototype.onDeactivate=function(t){this._mGroup=undefined;this._mAggregate=undefined;this._aGroupLevels=undefined;this._mColumnState=undefined;this.setRowCountConstraints();a(this);e.Grouping.setToDefaultFlatMode(t);e.Hook.deregister(t,e.Hook.Keys.Row.UpdateState,this.updateRowState,this);e.Hook.deregister(this,e.Hook.Keys.Row.Expand,g,this);e.Hook.deregister(this,e.Hook.Keys.Row.Collapse,u,this);var o=t.getBinding();if(o){o.setAggregation()}};function a(t){var e=t.getTable();if(e){e.getColumns().forEach(function(t){t._setCellContentVisibilitySettings()})}}function n(t){var e=t.getTable();var o=t.getGroupSummary();if(!e||!t._mColumnState){return}e.getColumns().forEach(function(e){var i=t._mColumnState[e.getId()];if(i){e._setCellContentVisibilitySettings({groupHeader:{expanded:!!i.subtotals&&(o==="Top"||o==="TopAndBottom"),collapsed:!!i.subtotals&&(o==="Bottom"||o==="TopAndBottom")},summary:{group:!!i.subtotals,total:!!i.grandTotal}})}else{e._setCellContentVisibilitySettings()}})}r.prototype.onTableRowsBound=function(t){if(!t.getModel().isA("sap.ui.model.odata.v4.ODataModel")){this.deactivate()}};r.prototype.onTableBindRows=function(t){t.parameters=t.parameters||{};t.parameters.$$aggregation=this.getAggregationInfo()};r.prototype.updateRowState=function(t){var e=t.context.getProperty("@$ui5.node.level");var o=t.context.getProperty("@$ui5.node.isTotal");var r=t.context.getProperty("@$ui5.node.isExpanded")===undefined;var a=e===0&&o;var n=e>0&&!r;var s=!n&&o;t.level=e;t.expandable=n;t.expanded=t.context.getProperty("@$ui5.node.isExpanded")===true;if(a||s){t.type=t.Type.Summary;t.level++}else if(n){t.type=t.Type.GroupHeader}if(n){var g=this._aGroupLevels[e-1];var u=this.getGroupHeaderFormatter();var p=u?u(t.context,g.property.key):undefined;if(p===undefined){t.title=i(t.context,g)}else if(typeof p!=="string"){throw new Error("The group header title must be a string or undefined")}else{t.title=p}}};r.prototype.setPropertyInfos=function(t){this._aPropertyInfos=t};r.prototype.getPropertyInfos=function(){return this._aPropertyInfos||[]};r.prototype.findPropertyInfo=function(t){return this.getPropertyInfos().find(function(e){return e.key===t})};r.prototype.setAggregationInfo=function(t){t=Object.assign({columnState:{}},t);if(!Array.isArray(t.visible)){this._mGroup=undefined;this._mAggregate=undefined;this._aGroupLevels=undefined;this._sSearch=undefined}else{var e=[];var o=[];var i;this._mGroup=this.getPropertyInfos().reduce(function(t,e){if(e.isKey){t[e.path]={};i=s(this,e);if(i){t[e.path].additionally=i;o.concat(i)}}return t}.bind(this),{});this._mAggregate={};var r=t.visible.concat();if(t.groupLevels){t.groupLevels.forEach(function(t){if(r.indexOf(t)<0){r.push(t)}})}r.forEach(function(r){var a=this.findPropertyInfo(r);if(!a){return}if(a.groupable){this._mGroup[a.path]={};i=s(this,a);if(i){this._mGroup[a.path].additionally=i;o=o.concat(i)}}if(a.aggregatable){this._mAggregate[a.path]={};if(t.grandTotal&&t.grandTotal.indexOf(r)>=0){this._mAggregate[a.path].grandTotal=true}if(t.subtotals&&t.subtotals.indexOf(r)>=0){this._mAggregate[a.path].subtotals=true}if(a.unit){var n=this.findPropertyInfo(a.unit);if(n){this._mAggregate[a.path].unit=n.path;e.push(n.path)}}if(a.aggregationDetails&&a.aggregationDetails.customAggregate&&a.aggregationDetails.customAggregate.contextDefiningProperties){a.aggregationDetails.customAggregate.contextDefiningProperties.forEach(function(t){var e=this.findPropertyInfo(t);if(e){this._mGroup[e.path]={};i=s(this,a);if(i){this._mGroup[e.path].additionally=i;o=o.concat(i)}}}.bind(this))}}}.bind(this));this._aGroupLevels=[];if(t.groupLevels){t.groupLevels.forEach(function(t){var e=this.findPropertyInfo(t);if(e){this._aGroupLevels.push({property:e,textProperty:this.findPropertyInfo(e.text)})}}.bind(this))}Object.keys(this._mGroup).forEach(function(t){if(this._mAggregate.hasOwnProperty(t)){if(this._mAggregate[t].grandTotal||this._mAggregate[t].subtotals){delete this._mGroup[t];return}else{delete this._mAggregate[t]}}if(this._mGroup[t].additionally){this._mGroup[t].additionally=this._mGroup[t].additionally.filter(function(t){return e.indexOf(t)===-1})}if(o.indexOf(t)>-1){delete this._mGroup[t]}}.bind(this));this._sSearch=t.search}this._mColumnState=t.columnState;n(this);this.updateAggregation()};r.prototype.getAggregationInfo=function(){if(!Object.keys(this._mGroup||{}).length&&!Object.keys(this._mAggregate||{}).length){return}var t={aggregate:o(this._mAggregate),group:o(this._mGroup),groupLevels:this._aGroupLevels?this._aGroupLevels.map(function(t){return t.property.path}):undefined,search:this._sSearch};if(t.aggregate){p(this,t);l(this,t)}return t};function s(t,e){if(e.text){var o=t.findPropertyInfo(e.text);if(o){return[o.path]}}return null}function g(t){var e=t.getRowBindingContext();if(e){e.expand()}}function u(t){var e=t.getRowBindingContext();if(e){e.collapse()}}r.prototype.setTotalSummaryOnTop=function(t){this.setProperty("totalSummaryOnTop",t,true);this.updateAggregation()};r.prototype.setTotalSummaryOnBottom=function(t){this.setProperty("totalSummaryOnBottom",t,true);this.updateAggregation()};r.prototype.setGroupSummary=function(t){this.setProperty("groupSummary",t,true);n(this);this.updateAggregation()};r.prototype.updateAggregation=function(){var t=this.getTableBinding();if(t){t.setAggregation(this.getAggregationInfo())}};function p(t,e){var o=t.getTotalSummaryOnTop();var i=t.getTotalSummaryOnBottom();var r=o==="On"||o==="Fixed";var a=i==="On"||i==="Fixed";var n=Object.keys(e.aggregate).some(function(t){return e.aggregate[t].grandTotal});if(r&&a){e.grandTotalAtBottomOnly=false}else if(a){e.grandTotalAtBottomOnly=true}else if(r){e.grandTotalAtBottomOnly=undefined}else{Object.keys(e.aggregate).forEach(function(t){delete e.aggregate[t].grandTotal})}t.setRowCountConstraints({fixedTop:o==="Fixed"&&n,fixedBottom:i==="Fixed"&&n})}function l(t,e){var o=t.getGroupSummary();if(o==="Top"){e.subtotalsAtBottomOnly=undefined}else if(o==="Bottom"){e.subtotalsAtBottomOnly=true}else if(o==="TopAndBottom"){e.subtotalsAtBottomOnly=false}else{Object.keys(e.aggregate).forEach(function(t){delete e.aggregate[t].subtotals})}}return r});
//# sourceMappingURL=V4Aggregation.js.map