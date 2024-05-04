/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Element","sap/ui/core/Fragment","sap/ui/core/Lib","sap/base/util/isEmptyObject","sap/base/util/restricted/_difference","sap/base/util/deepEqual","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Control","sap/ui/dt/OverlayRegistry","sap/ui/dt/ElementUtil","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/rta/util/changeVisualization/ChangeIndicator","sap/ui/rta/util/changeVisualization/ChangeIndicatorRegistry","sap/ui/rta/util/changeVisualization/ChangeCategories","sap/ui/rta/util/changeVisualization/ChangeStates"],function(e,t,n,o,i,a,s,r,g,l,h,c,d,u,C,p,y,f,_,I){"use strict";function v(){const e=this.getPopover();if(e&&e.isOpen()){e.close()}}function m(e){return!e||!e.getDomRef()||!e.isVisible()}function V(e,t){let n=l.getOverlay(e);if(!n){const e=l.getOverlay(t);const o=e&&e.getRelevantContainer();if(o){n=l.getOverlay(o)}}return n}const R=g.extend("sap.ui.rta.util.changeVisualization.ChangeVisualization",{metadata:{library:"sap.ui.rta",properties:{rootControlId:{type:"string"},isActive:{type:"boolean",defaultValue:false}},aggregations:{popover:{type:"sap.m.Popover",multiple:false}}},constructor:function(...e){this._oChangeIndicatorRegistry=new f({changeCategories:_.getCategories()});g.prototype.constructor.apply(this,e);this._oTextBundle=o.getResourceBundleFor("sap.ui.rta");this.setModel(new C({bundle:this._oTextBundle}),"i18n");this._oChangeVisualizationModel=new p({active:this.getIsActive(),changeState:I.ALL});this._oChangeVisualizationModel.setDefaultBindingMode("TwoWay");this._sSelectedChangeCategory=_.ALL;this._bSetModeChanged=false;this._fnOnClickHandler=v.bind(this)}});R.prototype.setVersionsModel=function(e){this.oVersionsModel=e.getModel("versions")};R.prototype.setRootControlId=function(e){if(this.getRootControlId()&&this.getRootControlId()!==e){this._reset()}this.setProperty("rootControlId",e);this._oChangeIndicatorRegistry.setRootControlId(e)};R.prototype._getComponent=function(){return u.getAppComponentForControl(h.getElementInstance(this.getRootControlId()))};R.prototype.setIsActive=function(e){if(e===this.getIsActive()){return}this.setProperty("isActive",e);if(this._oChangeVisualizationModel){this._updateVisualizationModel({active:e})}};R.prototype.exit=function(){this._oChangeIndicatorRegistry.destroy();this._toggleRootOverlayClickHandler(false)};R.prototype.updateAfterSave=function(e){if(this.getProperty("rootControlId")){this._oChangeIndicatorRegistry.reset();this._updateChangeRegistry().then(function(){this._selectChangeCategory(this._sSelectedChangeCategory);this._selectChangeState(I.ALL);this._updateVisualizationModelMenuData();e.setModel(this._oChangeVisualizationModel,"visualizationModel")}.bind(this))}};R.prototype._reset=function(){this._oChangeIndicatorRegistry.reset()};R.prototype._determineChangeVisibility=function(e,t,n){function o(e){return e.filter(function(e){if(!n||n===I.ALL||e.changeStates.includes(n)){return true}return false})}const i=[];const a=[];let s=false;let r=false;const g=t.map(function(e){return e.id});e.forEach(function(e){if(e.changeStates.includes(I.DIRTY)){s=true;r=true}else if(e.changeStates.includes(I.DRAFT)){s=true}const t=V(e.visualizationInfo.displayElementIds[0],e.visualizationInfo.affectedElementIds[0]);if(!g.includes(e.change.getId())){i.push(e)}else if(m(t)){i.push(e)}else{a.push(e)}});const l=o(i);const h=o(a);return{relevantHiddenChanges:l,relevantVisualizedChanges:h,hasDirtyChanges:r,hasDraftChanges:s}};R.prototype._updateVisualizationModelMenuData=function(){const e=this._oChangeVisualizationModel.getData().changeState;const t=this._oChangeIndicatorRegistry.getAllRegisteredChanges();const n=this._oChangeIndicatorRegistry.getRelevantChangesWithSelector();const o=t.filter(function(e){if(!e.dependent){return true}return false});const i=this._determineChangeVisibility(o,n,e);const a=Object.keys(_.getCategories()).map(function(e){const t=this._getChangeCategoryLabel(e,this._getChangesForChangeCategory(e,i.relevantVisualizedChanges).length);return{key:e,count:this._getChangesForChangeCategory(e,i.relevantVisualizedChanges).length,title:t,icon:_.getIconForCategory(e)}}.bind(this));a.unshift({key:_.ALL,count:this._getChangesForChangeCategory(_.ALL,i.relevantVisualizedChanges).length,title:this._getChangeCategoryLabel(_.ALL,this._getChangesForChangeCategory(_.ALL,i.relevantVisualizedChanges).length),icon:_.getIconForCategory(_.ALL)});this._updateVisualizationModel({changeCategories:a,hasDraftChanges:i.hasDraftChanges,hasDirtyChanges:i.hasDirtyChanges,popupInfoMessage:this._oTextBundle.getText("MSG_CHANGEVISUALIZATION_HIDDEN_CHANGES_INFO",[i.relevantHiddenChanges.length]),sortedChanges:i})};R.prototype._getChangesForChangeCategory=function(e,t){return t.filter(function(t){return e===_.ALL?t.changeCategory!==undefined:e===t.changeCategory})};R.prototype._getChangeCategoryLabel=function(e,t){const n=`TXT_CHANGEVISUALIZATION_OVERVIEW_${e.toUpperCase()}`;return this._oTextBundle.getText(n,[t])};R.prototype._getChangeCategoryButton=function(e){const t=`BTN_CHANGEVISUALIZATION_OVERVIEW_${e.toUpperCase()}`;return this._oTextBundle.getText(t)};R.prototype.openChangeCategorySelectionPopover=function(e){this._oToolbarButton||=t.getElementById(e.getParameter("id"));const o=this.getPopover();if(!o){n.load({name:"sap.ui.rta.util.changeVisualization.ChangeIndicatorCategorySelection",id:this._getComponent().createId("changeVisualization_changesList"),controller:this}).then(function(e){this._oToolbarButton.addDependent(e);e.setModel(this._oChangeVisualizationModel,"visualizationModel");e.openBy(this._oToolbarButton);this.setPopover(e);e.close();e.openBy(this._oToolbarButton)}.bind(this));return}if(o.isOpen()){o.close()}else{o.openBy(this._oToolbarButton)}};R.prototype.onChangeCategorySelection=function(e){const t=e.getSource().getBindingContext("visualizationModel").getObject().key;this._selectChangeCategory(t)};R.prototype.onVersioningCategoryChange=function(e){const t=e.getSource().getSelectedKey();this._selectChangeState(t)};R.prototype._selectChangeCategory=function(e){this._sSelectedChangeCategory=e;const t=this._getChangeCategoryButton(e);this._updateVisualizationModel({changeCategory:e,changeCategoryText:t});this._updateChangeIndicators();this._setFocusedIndicator()};R.prototype._selectChangeState=function(e){this._sSelectedChangeState=e;this._updateVisualizationModel({changeState:e});this._updateChangeIndicators();this._updateVisualizationModelMenuData()};R.prototype._getCommandForChange=function(e){const t=e.getSupportInformation().command;if(t){return t}if(!e.getSelector||!e.getSelector()||i(e.getSelector())){return false}const n=this._getComponent();const o=r.bySelector(e.getSelector(),n);const a=e.getDependentSelectorList().slice(-1)[0];const s=r.bySelector(a,n);function g(t,n){const i=t.getElement();const a=t.getDesignTimeMetadata().getCommandName(e.getChangeType(),i,n);if(a){return a}const s=t.getParentElementOverlay();const r=t.getParentAggregationOverlay();if(t.getElement().getId()===o.getId()||!s){return undefined}return g(s,r&&r.getAggregationName())}return o&&s&&g(l.getOverlay(s))};R.prototype._collectChanges=function(){const e=this._getComponent();const t={selector:e,invalidateCache:false,includeCtrlVariants:true,currentLayer:d.CUSTOMER,includeDirtyChanges:true,onlyCurrentVariants:true};return c._getUIChanges(t)};R.prototype._updateChangeRegistry=function(){return this._collectChanges().then(function(e){this._oChangeIndicatorRegistry.removeOutdatedRegisteredChanges();this._oChangeIndicatorRegistry.removeRegisteredChangesWithoutVizInfo();if(this._oChangeVisualizationModel.getData().displayedVersion!=="0"){this._oChangeIndicatorRegistry.reset()}const t=this._oChangeIndicatorRegistry.getRegisteredChangeIds();const n=e.reduce(function(e,t){e[t.getId()]=t;return e},{});const o=Object.keys(n);a(t,o).forEach(function(e){this._oChangeIndicatorRegistry.removeRegisteredChange(e)}.bind(this));const i=[];a(o,t).forEach(function(e){const t=n[e];const o=this._getCommandForChange(t);i.push(this._oChangeIndicatorRegistry.registerChange(t,o,this.oVersionsModel))}.bind(this));return Promise.all(i)}.bind(this))};R.prototype.selectChange=function(e){const t=e.getParameter("changeId");this._selectChange(t)};R.prototype._selectChange=function(e){const t=this._oChangeIndicatorRegistry.getRegisteredChange(e).visualizationInfo.dependentElementIds;t.forEach(function(e){const t=l.getOverlay(e).getDomRef();t.scrollIntoView({block:"nearest"});t.classList.add("sapUiRtaChangeIndicatorDependent");t.addEventListener("animationend",function(){t.classList.remove("sapUiRtaChangeIndicatorDependent")},{once:true})})};R.prototype._updateVisualizationModel=function(e){this._oChangeVisualizationModel.setData(Object.assign({},this._oChangeVisualizationModel.getData(),e))};R.prototype._updateChangeIndicators=function(){const e=this._oChangeIndicatorRegistry.getSelectorsWithRegisteredChanges();const t={};this._mDisplayElementsKeyMap={};const n=this._oDesignTime?.getSelectionManager?.().getConnectedElements();Object.keys(e).forEach(function(o){const i=e[o];const a=this._filterRelevantChanges(e[o]);const s=V(o,i[0].affectedElementId);if(m(s)){return undefined}const r=s.getDomRef().getClientRects()[0]||{left:0,top:0};t[o]={posX:parseInt(r.left),posY:parseInt(r.top),changes:a};const g=this._oChangeIndicatorRegistry.getChangeIndicator(o);const l=s.getId();const h=n?.[s.getAssociation("element")];if(!g){this._createChangeIndicator(s,o,h);const e=i[0].displayElementsKey;if(!this._mDisplayElementsKeyMap[e]){this._mDisplayElementsKeyMap[e]=[o]}else{this._mDisplayElementsKeyMap[e].push(o)}}else if(g.getOverlayId()!==l){g.setOverlayId(l)}return undefined}.bind(this));if(!s(t,this._oChangeVisualizationModel.getData().content)){this._updateVisualizationModel({content:t})}};R.prototype._filterRelevantChanges=function(e){if(!Array.isArray(e)){return e}const t=this._oChangeVisualizationModel.getData();return e.filter(function(e){return!e.dependent&&e.changeCategory&&(t.changeCategory===_.ALL||t.changeCategory===e.changeCategory)&&(!t.changeState||t.changeState===I.ALL||e.changeStates.includes(t.changeState))})};R.prototype._createChangeIndicator=function(e,t,n){const o=new y({changes:"{changes}",posX:"{posX}",posY:"{posY}",visible:"{= ${/active} && (${changes} || []).length > 0}",overlayId:e.getId(),selectorId:t,selectChange:this.selectChange.bind(this),connectedElementId:n});o.setModel(this._oChangeVisualizationModel);o.bindElement(`/content/${t}`);o.setModel(this.getModel("i18n"),"i18n");this._oChangeIndicatorRegistry.registerChangeIndicator(t,o)};R.prototype._setFocusedIndicator=function(){this._oChangeIndicatorRegistry.waitForIndicatorRendering().then(()=>{const e=this._oChangeIndicatorRegistry.getChangeIndicators().filter(e=>e.getVisible()&&l.getOverlay(e.getOverlayId())).sort(function(e,t){const n=e.getPosY()-t.getPosY();const o=e.getPosX()-t.getPosX();return n||o});if(e.length===0){return}const t=[];e.forEach(function(e,n){e.getDomRef().tabIndex=n+2;if(e.getPosY()>0){t.push(e)}});if(t.length>0){t[0].focus()}else{e[0].focus()}})};R.prototype._toggleRootOverlayClickHandler=function(e){const t=this.oRootOverlay&&this.oRootOverlay.getDomRef();if(t){if(e){t.addEventListener("click",this._fnOnClickHandler,{capture:true})}else{t.removeEventListener("click",this._fnOnClickHandler,{capture:true})}}};R.prototype.triggerModeChange=function(e,t){this.oMenuButton=t.getControl("toggleChangeVisualizationMenuButton");this.oRootOverlay=l.getOverlay(e);this.setVersionsModel(t);if(this.oVersionsModel&&this.oVersionsModel.getData().versioningEnabled){this._updateVisualizationModel({versioningAvailable:this.oVersionsModel.getData().versioningEnabled,displayedVersion:this.oVersionsModel.getData().displayedVersion})}else{this._updateVisualizationModel({versioningAvailable:false,displayedVersion:"0"})}if(this.getIsActive()){this.setIsActive(false);this._toggleRootOverlayClickHandler(false);return}this._toggleRootOverlayClickHandler(true);if(!this.getRootControlId()){this.setRootControlId(e)}this.setIsActive(true);this._updateChangeRegistry().then(function(){this._selectChangeCategory(this._sSelectedChangeCategory);t.adjustToolbarSectionWidths();this._updateVisualizationModelMenuData();return this._oChangeIndicatorRegistry.waitForIndicatorRendering()}.bind(this)).then(function(){t.setModel(this._oChangeVisualizationModel,"visualizationModel")}.bind(this))};return R});
//# sourceMappingURL=ChangeVisualization.js.map