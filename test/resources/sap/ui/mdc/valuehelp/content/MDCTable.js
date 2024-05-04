/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/base/FilterableListContent","sap/ui/mdc/util/loadModules","sap/ui/mdc/util/Common","sap/base/Log","sap/ui/core/Element","sap/ui/mdc/enums/TableSelectionMode","sap/ui/mdc/enums/TableType","sap/ui/mdc/enums/ValueHelpSelectionType","sap/ui/mdc/enums/TableRowCountMode","sap/base/util/restricted/_throttle"],(e,t,o,i,n,s,l,a,r,h)=>{"use strict";const p=e.extend("sap.ui.mdc.valuehelp.content.MDCTable",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.IDialogContent"],properties:{forceBind:{type:"boolean",defaultValue:false}},aggregations:{table:{type:"sap.ui.mdc.Table",multiple:false}},events:{},defaultAggregation:"table"}});p.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver.observe(this,{aggregations:["table"]});this._bRebindTable=false};p.prototype._setTableSelectionState=function(){this._bSelectionIsUpdating=true;const e=this._getAllCurrentContexts();if(e){this._oTable._setSelectedContexts(e.filter(e=>this._isContextSelected(e,this.getConditions())))}this._bSelectionIsUpdating=false};p.prototype.handleConditionsUpdate=function(){if(!this._bIgnoreNextConditionChange){this._setTableSelectionState()}else{this._bIgnoreNextConditionChange=false}};p.prototype._handleUpdateFinished=function(e){if(this._oTable){this.resolveListBinding();if(!this._bQueryingContexts){this._setTableSelectionState()}}};p.prototype._handleUpdateFinishedThrottled=h(p.prototype._handleUpdateFinished,100,{leading:false});p.prototype.observeChanges=function(t){if(t.name==="table"){const e=t.child;if(t.mutation==="remove"){this._oTable.detachEvent("_bindingChange",this._handleUpdateFinishedThrottled,this);this._oTable.detachEvent("selectionChange",this._handleSelectionChange,this);this._oTable=null;this.resetListBinding()}else{this._oTable=e;this.resolveListBinding();if(this._oTable.getAutoBindOnInit()){i.warning("Usage of autobound tables may lead to unnecessary requests.")}else if(this.getForceBind()){this._bRebindTable=true}e.addDelegate({onmouseover:function(e){const t=n.closestTo(e.target);if(t&&t.isA("sap.m.ColumnListItem")){t.setType("Active")}}});this._oTable.initialized().then(()=>{this._oTable.attachEvent("_bindingChange",this._handleUpdateFinishedThrottled,this);this._oTable.attachEvent("selectionChange",this._handleSelectionChange,this)})}return}e.prototype.observeChanges.apply(this,arguments)};p.prototype._getAllCurrentContexts=function(){const e=this._oTable&&this._oTable.getRowBinding();if(e){return e.getAllCurrentContexts?e.getAllCurrentContexts():e.getContexts()}return undefined};p.prototype._handleSelectionChange=function(e){if(!this._bSelectionIsUpdating){this._bQueryingContexts=true;const e=this._getAllCurrentContexts();const t=e&&this._oTable.getSelectedContexts();this._bQueryingContexts=false;if(e){const o=this.getConditions();let i=o;let n=false;e.forEach(e=>{const s=this._findConditionsForContext(e,o);const l=!!s.length;const a=t.indexOf(e)>=0;if(!l&&a){const t=this.getItemFromContext(e);const o=t&&this.createCondition(t.key,t.description,t.payload);i=this.isSingleSelect()?[o]:i.concat(o);n=true}else if(l&&!a){i=i.filter(e=>s.indexOf(e)===-1);n=true}});if(n){this._prepareSelect(i,a.Set)}}}};p.prototype._prepareSelect=function(e,t){let o=typeof t==="string"&&t;o=o||(t?a.Add:a.Remove);this._bIgnoreNextConditionChange=true;this._fireSelect({type:o,conditions:e})};p.prototype._getTable=function(){return this._oTable};p.prototype.getContent=function(){return this._retrievePromise("wrappedContent",()=>t(["sap/ui/layout/FixFlex","sap/m/VBox","sap/m/ScrollContainer"]).then(e=>{const t=e[0];const o=e[1];const i=e[2];if(!this._oContentLayout){this._oFilterBarVBox=new o(this.getId()+"-FilterBarBox",{visible:"{$this>/_filterBarVisible}"});this._oFilterBarVBox.addStyleClass("sapMdcValueHelpPanelFilterbar");this._oFilterBarVBox._oWrapper=this;this._oFilterBarVBox.getItems=function(){const e=this._oWrapper.getActiveFilterBar.call(this._oWrapper);const t=e?[e]:[];return t};this._oTableBox=new o(this.getId()+"-TB",{height:"100%"});this._oTableBox.addStyleClass("sapMdcValueHelpPanelTableBox");this._oTableBox._oWrapper=this;this._oTableBox.getItems=function(){const e=this._oWrapper._oTable._isOfType(l.ResponsiveTable)?this._oWrapper._oScrollContainer:this._oWrapper._oTable;const t=e?[e]:[];return t};this._oContentLayout=new t(this.getId()+"-FF",{minFlexSize:200,fixContent:this._oFilterBarVBox,flexContent:this._oTableBox});this._oScrollContainer=new i(this.getId()+"-SC",{height:"calc(100% - 0.5rem)",width:"100%",vertical:true});this._oScrollContainer._oWrapper=this;this._oScrollContainer.getContent=function(){const e=[];const t=this._oWrapper&&this._oWrapper._oTable;if(t){e.push(t)}return e}}this.setAggregation("displayContent",this._oContentLayout);if(!this.getActiveFilterBar()){return this._createDefaultFilterBar().then(()=>{this._oFilterBarVBox.invalidate();return this._oContentLayout})}return this._oContentLayout}))};p.prototype.getListBinding=function(){const e=this.getTable();return e&&e.getRowBinding()};p.prototype._configureTable=function(){if(this._oTable){const t=e.prototype.isSingleSelect.apply(this);const o=this._oTable._getType();const i=this.getActiveFilterBar();if(i&&this._oTable.getFilter()!==i.getId()){this._oTable.setFilter(i)}if(!this._oTable.getHeader()){this._oTable.setHeader(this._oResourceBundle.getText("valuehelp.TABLETITLENONUMBER"))}const n=t?s.SingleMaster:s.Multi;if(this._oTable.getSelectionMode()===s.None){this._oTable.setSelectionMode(n)}if(this._oTable.getSelectionMode()!==n){throw new Error("Table selectionMode needs to be "+n)}const a=this._oTable._isOfType(l.Table);if(a){const e=o.getRowCountMode();if(e===r.Auto){o.setRowCount(3)}}}};p.prototype.onShow=function(){e.prototype.onShow.apply(this,arguments)};p.prototype.onBeforeShow=function(t){this._configureTable();return Promise.resolve(e.prototype.onBeforeShow.apply(this,arguments)).then(()=>{const e=this.getTable();if(e){const o=e.isTableBound();const i=o&&e._oTable.getShowOverlay();if(this._bRebindTable||i){e.rebind();this._bRebindTable=false}else if(t){if(e._isOfType(l.ResponsiveTable)){this._oScrollContainer.scrollTo(0,0)}else if(o){return e.scrollToIndex(0)}}}})};p.prototype.getScrollDelegate=function(){if(!this.isTypeahead()&&this._oScrollContainer){return this._oScrollContainer.getScrollDelegate()}return e.prototype.getScrollDelegate.apply(this,arguments)};p.prototype.isQuickSelectSupported=function(){return true};p.prototype.setParent=function(t){e.prototype.setParent.apply(this,arguments)};p.prototype.isSingleSelect=function(){if(this._oTable){if(this._oTable.getSelectionMode()===s.Multi){return false}else{return true}}else{return e.prototype.isSingleSelect.apply(this,arguments)}};p.prototype.exit=function t(i){o.cleanup(this,["_oContentLayout","_oFilterBarVBox","_oTableBox","_oResourceBundle","_oScrollContainer","_oTableHelper","_bSelectionIsUpdating","_sTableType","_oUITableSelectionPlugin","_oTable","_bRebindTable","_mKnownContexts","_bIgnoreNextConditionChange","_bQueryingContexts"]);e.prototype.exit.apply(this,arguments)};return p});
//# sourceMappingURL=MDCTable.js.map