/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/mdc/Control","./ChartRenderer","sap/base/Log","./chart/ChartToolbar","./chart/PropertyHelper","sap/ui/mdc/mixin/FilterIntegrationMixin","sap/ui/model/base/ManagedObjectModel","sap/ui/mdc/p13n/subcontroller/ChartItemController","sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/mdc/p13n/subcontroller/SortController","sap/ui/mdc/p13n/subcontroller/ChartTypeController","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/chart/DrillBreadcrumbs","sap/ui/mdc/actiontoolbar/ActionToolbarAction","sap/ui/core/library","sap/ui/events/KeyCodes","sap/ui/mdc/util/InfoBar","sap/ui/core/format/ListFormat","sap/ui/mdc/enums/ProcessingStrategy","sap/ui/mdc/enums/ChartP13nMode"],(t,e,i,o,r,n,s,a,l,h,p,g,u,c,d,f,y,b,C,m,_)=>{"use strict";let I;const{TitleLevel:D}=f;const T=e.extend("sap.ui.mdc.Chart",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/chart/Chart.designtime",interfaces:["sap.ui.mdc.IFilterSource","sap.ui.mdc.IxState"],defaultAggregation:"items",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/ChartDelegate",payload:{}}},header:{type:"string",group:"Misc",defaultValue:null},noDataText:{type:"string",defaultValue:"No data"},p13nMode:{type:"sap.ui.mdc.enums.ChartP13nMode[]",defaultValue:[]},legendVisible:{type:"boolean",group:"Misc",defaultValue:true},ignoreToolbarActions:{type:"sap.ui.mdc.enums.ChartToolbarActionType[]",defaultValue:[]},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"240px",invalidate:true},minHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"400px",invalidate:true},sortConditions:{type:"object"},filterConditions:{type:"object",defaultValue:{}},showChartTooltip:{type:"boolean",group:"Misc",defaultValue:true},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true},chartType:{type:"string",group:"Misc",defaultValue:"column"},showSelectionDetails:{type:"boolean",group:"Misc",defaultValue:true},propertyInfo:{type:"object",defaultValue:[]},headerLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:D.Auto},headerStyle:{type:"sap.ui.core.TitleLevel",group:"Appearance"},headerVisible:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{items:{type:"sap.ui.mdc.chart.Item",multiple:true},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getToolbar",aggregation:"actions"}},selectionDetailsActions:{type:"sap.ui.mdc.chart.SelectionDetailsActions",multiple:false},_toolbar:{type:"sap.ui.mdc.chart.ChartToolbar",multiple:false,visibility:"hidden"},_breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false,visibility:"hidden"},_innerChart:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_infoToolbar:{type:"sap.ui.mdc.util.InfoBar",multiple:false,visibility:"hidden"},variant:{type:"sap.ui.fl.variants.VariantManagement",multiple:false},noData:{type:"sap.ui.core.Control",multiple:false}},associations:{filter:{type:"sap.ui.mdc.IFilter",multiple:false}},events:{selectionDetailsActionPressed:{parameters:{action:{type:"sap.ui.core.Item"},itemContexts:{type:"sap.ui.model.Context"},level:{type:"sap.m.SelectionDetailsActionLevel"}}}}},renderer:i});const v=t.getResourceBundleFor("sap.ui.mdc");s.call(T.prototype);T.prototype.init=function(){this._oManagedObjectModel=new a(this);this.setModel(this._oManagedObjectModel,"$mdcChart");e.prototype.init.apply(this,arguments);this._setPropertyHelperClass(n);this._setupPropertyInfoStore("propertyInfo")};T.prototype.setP13nMode=function(t){let e=null;if(t&&t.length>=1){e=[];const i=t.reduce((t,e,i)=>{t[e]=true;return t},{});if(i.Item){e.push(_.Item)}if(i.Sort){e.push(_.Sort)}if(i.Filter){e.push(_.Filter)}if(i.Type){this._typeBtnActive=true;e.push(_.Type)}else{this._typeBtnActive=false}}else{e=t}this.setProperty("p13nMode",e,true);this._updateAdaptation(this.getP13nMode());return this};T.prototype._updateAdaptation=function(t){const e={controller:{}};const i={Item:new l({control:this}),Sort:new p({control:this}),Filter:new h({control:this}),Type:new g({control:this})};if(t&&t.length>0){t.forEach(t=>{const o=t;const r=i[t];if(r){e.controller[o]=r}});this.getEngine().register(this,e)}};T.prototype.setFilterConditions=function(t){this.setProperty("filterConditions",t,true);const e=this.getInbuiltFilter();if(e){e.setFilterConditions(t)}this._updateInfoToolbar();return this};T.prototype.getConditions=function(){return this.getInbuiltFilter()?this.getInbuiltFilter().getConditions():[]};T.prototype._registerInnerFilter=function(t){t.attachSearch(function(){this._rebind()},this)};T.prototype.applySettings=function(t,i){e.prototype.applySettings.apply(this,arguments);this.initializedPromise=new Promise((t,e)=>{this._fnResolveInitialized=t;this._fnRejectInitialized=e});this.innerChartBoundPromise=new Promise((t,e)=>{this._fnResolveInnerChartBound=t;this._fnRejectInnerChartBound=e});const o=this.initControlDelegate();const r=[o];if(this.isFilteringEnabled()){r.push(this.retrieveInbuiltFilter())}Promise.all(r).then(()=>{if(!this.isDestroyed()){this._initInnerControls()}})};T.prototype._initInnerControls=function(){this.getControlDelegate().initializeInnerChart(this).then(t=>{this.setBusyIndicatorDelay(0);this.getControlDelegate().createInitialChartContent(this);this._renderOverlay(true);if(this.getAutoBindOnInit()){this.setBusy(true);this._createContentfromPropertyInfos(t)}this.setAggregation("_innerChart",t);if(this.getP13nMode().includes("Filter")){this._initInfoToolbar()}this._bInnerChartReady=true;this._fnResolveInitialized();this.invalidate()}).catch(t=>{this._fnRejectInitialized(t)});this._getToolbar().createToolbarContent(this)};T.prototype._initInfoToolbar=function(){this.setAggregation("_infoToolbar",new b(this.getId()+"--infoToolbar",{infoText:this._getFilterInfoText(),press:function(){this.finalizePropertyHelper().then(()=>this.getEngine().show(this,"Filter")).then(t=>{t.attachEventOnce("afterClose",()=>{const t=this.getFilterConditions();const e=!Object.keys(t).find(e=>t[e]&&t[e].length>0);if(e&&this.getAggregation("_toolbar")){this.getAggregation("_toolbar").getSettingsButton().focus()}})})}.bind(this),removeAllFilters:function(t){this.getEngine().createChanges({control:this,key:"Filter",state:{},applyAbsolute:m.FullReplace});this._getToolbar().getSettingsButton().focus()}.bind(this)}));if(this.getDomRef()){this.getDomRef().setAttribute("aria-labelledby",this.getAggregation("_infoToolbar").getACCTextId())}};T.prototype._updateInfoToolbar=function(){if(this.getP13nMode().includes("Filter")&&this.getAggregation("_infoToolbar")){this.getAggregation("_infoToolbar").setInfoText(this._getFilterInfoText())}};T.prototype._getFilterInfoText=function(){if(this.getInbuiltFilter()){let t;const e=this._getLabelsFromFilterConditions();const i=C.getInstance();if(e.length>0){if(e.length>1){t=v.getText("chart.MULTIPLE_FILTERS_ACTIVE",[e.length,i.format(e)])}else{t=v.getText("chart.ONE_FILTER_ACTIVE",e[0])}}return t}return undefined};T.prototype._createContentfromPropertyInfos=function(t){this.getControlDelegate().checkAndUpdateMDCItems(this).then(()=>{this.getControlDelegate().createInnerChartContent(this,this._innerChartDataLoadComplete.bind(this)).then(()=>{this._createBreadcrumbs();this._oObserver?.disconnect();this._oObserver?.destroy();this._oObserver=new u(this._propagateItemChangeToInnerChart.bind(this));this._oObserver.observe(this,{aggregations:["items"]});this._propagatePropertiesToInnerChart();this._fnResolveInnerChartBound()})})};T.prototype._createBreadcrumbs=function(){let t=this.getAggregation("_breadcrumbs");if(!t&&!this._bIsDestroyed){t=new c(this.getId()+"--breadcrumbs");t.updateDrillBreadcrumbs(this,this.getControlDelegate().getDrillableItems(this));this.setAggregation("_breadcrumbs",t)}};T.prototype._loadDelegate=function(){return new Promise(t=>{const e=[this.getDelegate().name];function i(e){t(e)}sap.ui.require(e,i)})};T.prototype.isFilteringEnabled=function(){return this.getP13nMode().indexOf("Filter")>-1};T.prototype.getAdaptationUI=function(){return this.getControlDelegate().getAdaptionUI(this)};T.prototype._propagateItemChangeToInnerChart=function(t){if(this._bIsDestroyed){return}this.setBusy(true);let e;switch(t.mutation){case"insert":if(t.child&&t.child.getType()){e=this.getItems().filter(e=>e.getType()===t.child.getType()).indexOf(t.child)}else{e=this.getItems().indexOf(t.child)}this.getControlDelegate().insertItemToInnerChart(this,t.child,e);break;case"remove":this.getControlDelegate().removeItemFromInnerChart(this,t.child);break;default:o.error("Unknown mutation on MDC Chart Item Aggregation. This will not sync to inner chart!");break}this._rebind();this.getAggregation("_breadcrumbs").updateDrillBreadcrumbs(this,this.getControlDelegate().getDrillableItems(this))};T.prototype._rebind=function(t){if(!this._bInnerChartReady){this.initialized().then(()=>{this._rebind(t)});return}this.setBusy(true);if(!this.getControlDelegate().getInnerChartBound(this)){this._createContentfromPropertyInfos();return}const e=this.getControlDelegate();let i;if(e._getBindingInfo){i=e._getBindingInfo(this);o.warning("mdc Chart","calling the private delegate._getBindingInfo. Please make the function public!")}else{i=e.getBindingInfo(this)}e.updateBindingInfo(this,i);e.rebind(this,i)};T.prototype._getToolbar=function(){if(this.getAggregation("_toolbar")){return this.getAggregation("_toolbar")}else if(!this._bIsDestroyed){const t=new r(this.getId()+"--toolbar",{design:"Transparent"});this.setAggregation("_toolbar",t);return t}};T.prototype._updateToolbar=function(){if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar").updateToolbar(this)}else{o.warning("Trying to uipdate Chart Toolbar, but toolbar is not yet initialized. This will not work!")}};T.prototype._getInnerChart=function(){if(this._bInnerChartReady){return this.getControlDelegate().getInnerChart(this)}else{o.error("Trying to acces inner chart while inner chart is not yet initialized!")}};T.prototype.initialized=function(){return this.initializedPromise};T.prototype.innerChartBound=function(){return this.innerChartBoundPromise};T.prototype.zoomIn=function(){this.getControlDelegate().zoomIn(this)};T.prototype.zoomOut=function(){this.getControlDelegate().zoomOut(this)};T.prototype.getZoomState=function(){return this.getControlDelegate().getZoomState(this)};T.prototype.getSelectionHandler=function(){return this.getControlDelegate().getInnerChartSelectionHandler(this)};T.prototype.getChartTypeLayoutConfig=function(){return this.getControlDelegate().getChartTypeLayoutConfig()};T.prototype.getAllowedRolesForKinds=function(){return this.getControlDelegate().getAllowedRolesForKinds()};T.prototype.setLegendVisible=function(t){this.setProperty("legendVisible",t);try{this.getControlDelegate().setLegendVisible(this,t)}catch(t){o.info("Trying to set legend visiblity for Chart before delegate was initialized")}return this};T.prototype.setShowChartTooltip=function(t){this.setProperty("showChartTooltip",t);try{this.getControlDelegate().setChartTooltipVisibility(this,t)}catch(t){o.info("Trying to set tooltip visibility before delegate was initialized")}return this};T.prototype.destroy=function(){this._bIsDestroyed=true;e.prototype.destroy.apply(this,arguments)};T.prototype._showDrillDown=function(t){if(!this.oDrillPopover){if(I){this.oDrillPopover=I.createDrillDownPopover(this);this.oDrillPopover.attachAfterClose(()=>{delete this.oDrillPopover});return I.showDrillDownPopover(this,t)}return new Promise((e,i)=>{sap.ui.require(["sap/ui/mdc/chart/DrillStackHandler"],i=>{I=i;this.oDrillPopover=I.createDrillDownPopover(this);this.oDrillPopover.attachAfterClose(()=>{delete this.oDrillPopover});I.showDrillDownPopover(this,t).then(t=>{e(t)})})})}else if(this.oDrillPopover){this.oDrillPopover.close()}};T.prototype._propagatePropertiesToInnerChart=function(){this.setLegendVisible(this.getLegendVisible());this.setShowChartTooltip(this.getShowChartTooltip());this.setChartType(this.getChartType())};T.prototype.getChartTypeInfo=function(){return this.getControlDelegate().getChartTypeInfo(this)};T.prototype.getAvailableChartTypes=function(){return this.getControlDelegate().getAvailableChartTypes(this)};T.prototype.setChartType=function(t){this.setProperty("chartType",t);try{this.getControlDelegate().setChartType(this,t)}catch(t){o.info("Trying to set chart type for Chart before delegate was initialized")}return this};T.prototype.setNoData=function(t){this.setAggregation("noData",t);try{this.getControlDelegate().changedNoDataStruct(this)}catch(t){}return this};T.prototype.getManagedObjectModel=function(){return this._oManagedObjectModel};T.prototype._innerChartDataLoadComplete=function(t){this._checkStyleClassesForDimensions();this.setBusy(false);this._renderOverlay(false);this.getControlDelegate().requestToolbarUpdate(this)};T.prototype._checkStyleClassesForDimensions=function(){const t=this.getAggregation("_breadcrumbs");const e=t?.getVisible()&&this.getItems().some(t=>t.getType()==="groupable");if(!e&&this.hasStyleClass("sapUiMDCChartGrid")){this.removeStyleClass("sapUiMDCChartGrid");this.addStyleClass("sapUiMDCChartGridNoBreadcrumbs")}else if(e&&this.hasStyleClass("sapUiMDCChartGridNoBreadcrumbs")){this.removeStyleClass("sapUiMDCChartGridNoBreadcrumbs");this.addStyleClass("sapUiMDCChartGrid")}};T.prototype.getCurrentState=function(){const t={};const e=this.getP13nMode();if(e){if(e.indexOf("Item")>-1){t.items=this._getVisibleProperties()}if(e.indexOf("Sort")>-1){t.sorters=this._getSortedProperties()}if(e.indexOf("Filter")>-1){t.filter=this.getFilterConditions()}if(e.indexOf("Type")>-1){t.chartType=this.getChartType()}}return t};T.prototype._getVisibleProperties=function(){const t=[];this.getItems().forEach(e=>{t.push({name:e.getPropertyKey(),role:e.getRole()})});return t};T.prototype._getSortedProperties=function(){return this.getSortConditions()?this.getSortConditions().sorters:[]};T.prototype._getTypeBtnActive=function(){return!!this._typeBtnActive};T.prototype.setNoDataText=function(t){this.setProperty("noDataText",t);try{this.getControlDelegate().setNoDataText(this,t)}catch(t){}return this};T.prototype._onFiltersChanged=function(t){if(this._bInnerChartReady&&this.getControlDelegate()&&this.getControlDelegate().getInnerChartBound(this)&&t.getParameter("conditionsBased")){this._renderOverlay(true)}};const A=function(t){let e=false;if(t&&(t.indexOf("Sort")>-1||t.indexOf("Item")>-1||t.indexOf("Filter")>-1)){e=true}return e};T.prototype._onModifications=function(t){if(A(t)){this.rebind()}};T.prototype.setVariant=function(t){this.setAggregation("variant",t);if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar").addVariantManagement(t)}return this};T.prototype._renderOverlay=function(t){try{this.getControlDelegate().showOverlay(this,t)}catch(t){o.error("sap.ui.mdc.Chart: Tried to render overlay on not initiailized chart. This will not work!")}};T.prototype.addAction=function(t){if(t.getMetadata().getName()!=="sap.ui.mdc.actiontoolbar.ActionToolbarAction"){t=new d(t.getId()+"-action",{action:t})}return e.prototype.addAggregation.apply(this,["actions",t])};T.prototype.setHeader=function(t){this.setProperty("header",t);if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar")._setHeader(t)}return this};T.prototype.setHeaderLevel=function(t){this.setProperty("headerLevel",t);if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar")._setHeaderLevel(t)}return this};T.prototype.setHeaderStyle=function(t){this.setProperty("headerStyle",t);if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar")._setHeaderStyle(t)}return this};T.prototype.setHeaderVisible=function(t){this.setProperty("headerVisible",t,true);if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar")._setHeaderVisible(t)}return this};T.prototype.getVariant=function(){const t=this.getAggregation("_toolbar");return t?t._getVariantReference():this.getAggregation("variant")};T.prototype.onkeydown=function(t){if(t.isMarked()){return}if((t.metaKey||t.ctrlKey)&&t.which===y.COMMA){const e=this._getToolbar()._oSettingsBtn;if(e&&e.getVisible()&&e.getEnabled()){e.firePress();t.setMarked();t.preventDefault()}}};T.prototype.exit=function(){e.prototype.exit.apply(this,arguments);this._oObserver?.destroy()};return T});
//# sourceMappingURL=Chart.js.map