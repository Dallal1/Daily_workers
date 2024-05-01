/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListBase","./library","sap/ui/core/Lib","sap/ui/model/ClientTreeBindingAdapter","sap/ui/model/TreeBindingCompatibilityAdapter","./TreeRenderer","sap/base/Log","sap/base/assert","sap/ui/model/controlhelper/TreeBindingProxy"],function(e,t,i,o,r,n,s,p,a){"use strict";var d=e.extend("sap.m.Tree",{metadata:{library:"sap.m",events:{toggleOpenState:{parameters:{itemIndex:{type:"int"},itemContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:n});d.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oProxy=new a(this,"items")};d.prototype.isTreeBinding=function(e){return e=="items"};d.prototype.getBinding=function(t){t=t||"items";var i=e.prototype.getBinding.call(this,t);if(i&&t==="items"&&!i.getLength){if(i.isA("sap.ui.model.odata.v2.ODataTreeBinding")){i.applyAdapterInterface()}else if(i.isA("sap.ui.model.ClientTreeBinding")){o.apply(i)}else if(i.isA("sap.ui.model.odata.ODataTreeBinding")){r(i,this)}else{s.error("TreeBinding is not supported for the "+this)}}return i};d.prototype.updateAggregation=function(t){if(t!="items"){return e.prototype.updateAggregation.apply(this,arguments)}var i=this.getBindingInfo("items"),o=i.factory,r;function n(e,t){var r=e.getItems()||[],n,s;if(r.length>t.length){for(var p=t.length;p<r.length;p++){e.removeItem(r[p]);r[p].destroy("KeepDom")}}for(var p=0;p<t.length;p++){n=t[p];s=r[p];if(s){s.setBindingContext(n,i.model)}else{s=o(e.getId()+"-"+p,n);s.setBindingContext(n,i.model);e.addItem(s)}}}r=this._oProxy.getContexts(0);if(!i.template){this.destroyItems()}n(this,r)};d.prototype.validateAggregation=function(t,i,o){var r=e.prototype.validateAggregation.apply(this,arguments);if(t==="items"&&!i.isA("sap.m.TreeItemBase")){throw new Error(i+" is not a valid items aggregation of "+this+". Items aggregation in Tree control only supports TreeItemBase-based objects, e.g. StandardTreeItem.")}return r};d.prototype.invalidate=function(){e.prototype.invalidate.apply(this,arguments);this._bInvalidated=true};d.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);this._bInvalidated=false};d.prototype.exit=function(){e.prototype.exit.apply(this,arguments);this._oProxy=null};d.prototype._updateDeepestLevel=function(e){if(e.getLevel()+1>this.getDeepestLevel()){this._iDeepestLevel=e.getLevel()+1}};d.prototype.onItemExpanderPressed=function(e,t){var i=this.indexOfItem(e);var o=this.getBindingInfo("items");var r=e&&e.getBindingContext(o.model);if(o&&r){var n=e.getExpanded();var s;this._updateDeepestLevel(e);if(t==undefined){this._oProxy.toggleExpandedState(i)}else if(t){this._oProxy.expand(i)}else{this._oProxy.collapse(i)}s=this._oProxy.isExpanded(i);if(n!==s&&!e.isLeaf()){this.fireToggleOpenState({itemIndex:i,itemContext:r,expanded:s})}}};d.prototype.setGrowing=function(e){s.error("Growing feature of "+this+" is not supported!");return this};d.prototype.setGrowingThreshold=function(e){s.error("GrowingThreshold of "+this+" is not supported!");return this};d.prototype.setGrowingTriggerText=function(e){s.error("GrowingTriggerText of "+this+" is not supported!");return this};d.prototype.setGrowingScrollToLoad=function(e){s.error("GrowingScrollToLoad of "+this+" is not supported!");return this};d.prototype.setGrowingDirection=function(e){s.error("GrowingDirection of "+this+" is not supported!");return this};d.prototype.expandToLevel=function(e){this._oProxy.expandToLevel(e);return this};d.prototype.getNumberOfExpandedLevel=function(){return this.getBinding("items").getNumberOfExpandedLevels()};d.prototype.getDeepestLevel=function(){if(this._iDeepestLevel===undefined){this._iDeepestLevel=this.getNumberOfExpandedLevel()}return this._iDeepestLevel};d.prototype.collapseAll=function(){this._oProxy.collapseAll();return this};d.prototype._sortHelper=function(e){var t=[];if(typeof e==="number"){t.push(e)}else if(Array.isArray(e)){t=e.sort().reverse()}return t};d.prototype._removeLeaf=function(e){var t=null,i,o=[];for(var r=0;r<e.length;r++){i=e[r];t=this.getItems()[i];if(t&&!t.isLeaf()){o.push(i)}}return o};d.prototype._preExpand=function(e){var t=this._sortHelper(e);t=this._removeLeaf(t);return t};d.prototype._getDeepestLevelFromIndexArray=function(e){var t;e.forEach(e=>{if(t==undefined||this.getItems()[e].getLevel()>t.getLevel()){t=this.getItems()[e]}});return t};d.prototype.expand=function(e){var t=e.constructor==Array?this._getDeepestLevelFromIndexArray(e):this.getItems()[e];this._updateDeepestLevel(t);this._oProxy.expand(e);return this};d.prototype.collapse=function(e){this._oProxy.collapse(e);return this};d.prototype.getAccessibilityType=function(){return i.getResourceBundleFor("sap.m").getText("ACC_CTR_TYPE_TREE")};d.prototype.getAccessbilityPosition=function(e){var t=this.indexOfItem(e);return{setSize:this._oProxy.getSiblingCount(t),posInset:this._oProxy.getPositionInParent(t)+1}};d.prototype.onItemLongDragOver=function(e){var t=this.indexOfItem(e),i=this.getBindingInfo("items"),o=e&&e.getBindingContext(i.model);if(e){this._updateDeepestLevel(e);if(!e.isLeaf()){this._oProxy.expand(t);this.fireToggleOpenState({itemIndex:t,itemContext:o,expanded:this._oProxy.isExpanded(t)})}}};d.prototype.isGrouped=function(){return false};d.prototype.getAriaRole=function(){return"tree"};d.prototype.setLastGroupHeader=function(){};return d});
//# sourceMappingURL=Tree.js.map