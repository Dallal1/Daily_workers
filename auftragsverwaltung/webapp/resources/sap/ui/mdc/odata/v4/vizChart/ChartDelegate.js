/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Lib","sap/ui/mdc/odata/v4/ChartDelegate","sap/m/Text","sap/base/Log","sap/ui/mdc/util/FilterUtil","sap/ui/mdc/odata/v4/util/DelegateUtil","sap/ui/mdc/chart/ChartTypeButton","sap/ui/mdc/chart/Item","sap/ui/model/Sorter","sap/ui/mdc/chart/ChartImplementationContainer","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/p13n/panels/ChartItemPanel","sap/m/MessageStrip","sap/ui/mdc/FilterBarDelegate","sap/ui/model/Filter","sap/ui/mdc/chart/PropertyHelper","sap/ui/thirdparty/jquery","sap/ui/mdc/enums/ChartItemRoleType"],(e,t,r,a,n,i,o,s,l,g,u,h,c,d,p,m,y,jQuery,f)=>{"use strict";const _=Object.assign({},r);const C=new window.WeakMap;let I;let b;let S;let P;_._getState=function(e){if(C.has(e)){return C.get(e)}if(e){n.info("Couldn't get state for "+e.getId())}};_._setState=function(e,t){C.set(e,t)};_.getFilterDelegate=function(){return p};_.addCondition=function(e,t,r){return Promise.resolve()};_.removeCondition=function(e,t,r){return Promise.resolve()};_._deleteState=function(e){if(this._getState(e)){if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}if(this._getState(e).observer){this._getState(e).observer.disconnect();this._getState(e).observer=null}}return C.delete(e)};_._getChart=function(e){if(C.has(e)){return C.get(e).innerChart}if(e){n.info("Couldn't get state for "+e.getId())}return undefined};_._setChart=function(e,t){if(C.has(e)){C.get(e).innerChart=t}else{C.set(e,{innerChart:t})}};_._getInnerStructure=function(e){if(C.has(e)){return C.get(e).innerStructure}if(e){n.info("Couldn't get state for "+e.getId())}return undefined};_._setInnerStructure=function(e,t){if(C.has(e)){C.get(e).innerStructure=t}else{C.set(e,{innerStructure:t})}};_._getBindingInfoFromState=function(e){if(C.has(e)){return C.get(e).bindingInfo}if(e){n.info("Couldn't get state for "+e.getId())}return undefined};_._setBindingInfoForState=function(e,t){if(C.has(e)){C.get(e).bindingInfo=t}else{C.set(e,{bindingInfo:t})}};_._setUpChartObserver=function(e){const t=this._getState(e);if(!t.observer){t.observer=new h(e=>{if(e.type==="destroy"){this.exit(e.object)}})}t.observer.observe(e,{destroy:true})};_.exit=function(e){if(this._getInnerStructure(e)){this._getInnerStructure(e).destroy()}this._deleteState(e)};_.zoomIn=function(e){const t=this._getChart(e);if(t){t.zoom({direction:"in"})}};_.zoomOut=function(e){const t=this._getChart(e);if(t){t.zoom({direction:"out"})}};_.getZoomState=function(e){if(this._getChart(e)){return this._getChart(e).getZoomInfo(this)}};_.getInnerChartSelectionHandler=function(e){return{eventId:"_selectionDetails",listener:this._getChart(e)}};_.getChartTypeLayoutConfig=function(){if(this._aChartTypeLayout){return this._aChartTypeLayout}const e=[f.axis1,f.category,f.series];const t=[f.axis1,f.axis2,f.category,f.series];const r=[f.axis1,f.category,f.category2];const a=[f.axis1,f.axis2,f.axis3,f.category,f.series];this._aChartTypeLayout=[{key:"column",allowedLayoutOptions:e},{key:"bar",allowedLayoutOptions:e},{key:"line",allowedLayoutOptions:e},{key:"combination",allowedLayoutOptions:e},{key:"pie",allowedLayoutOptions:e},{key:"donut",allowedLayoutOptions:e},{key:"dual_column",allowedLayoutOptions:t},{key:"dual_bar",allowedLayoutOptions:t},{key:"dual_line",allowedLayoutOptions:t},{key:"stacked_bar",allowedLayoutOptions:e},{key:"scatter",allowedLayoutOptions:t},{key:"bubble",allowedLayoutOptions:a},{key:"heatmap",allowedLayoutOptions:r},{key:"bullet",allowedLayoutOptions:e},{key:"vertical_bullet",allowedLayoutOptions:e},{key:"dual_stacked_bar",allowedLayoutOptions:t},{key:"100_stacked_bar",allowedLayoutOptions:e},{key:"stacked_column",allowedLayoutOptions:e},{key:"dual_stacked_column",allowedLayoutOptions:t},{key:"100_stacked_column",allowedLayoutOptions:e},{key:"dual_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_stacked_combination",allowedLayoutOptions:t},{key:"dual_horizontal_stacked_combination",allowedLayoutOptions:t},{key:"stacked_combination",allowedLayoutOptions:e},{key:"100_dual_stacked_bar",allowedLayoutOptions:e},{key:"100_dual_stacked_column",allowedLayoutOptions:e},{key:"horizontal_stacked_combination",allowedLayoutOptions:e},{key:"waterfall",allowedLayoutOptions:r},{key:"horizontal_waterfall",allowedLayoutOptions:r}];return this._aChartTypeLayout};_.getAdaptionUI=function(e){return Promise.resolve(this._setupAdaptionUI(e))};_._setupAdaptionUI=function(e){let r=this.getChartTypeLayoutConfig().find(t=>t.key===e.getChartType());if(!r){const t=[f.axis1,f.axis2,f.axis3,f.category,f.category2,f.series];r={key:e.getChartType(),allowedLayoutOptions:t}}const a=[{kind:"Groupable"},{kind:"Aggregatable"}];r.templateConfig=a;const n={panelConfig:r};const i=new c(n);if(e.getChartType()==="heatmap"){const e=t.getResourceBundleFor("sap.ui.mdc");i.setMessageStrip(new d({text:e.getText("chart.PERSONALIZATION_DIALOG_MEASURE_WARNING"),type:"Warning"}))}return i};_.setLegendVisible=function(e,t){if(this._getChart(e)){this._getChart(e).setVizProperties({legend:{visible:t},sizeLegend:{visible:t}})}else{n.error("Could not set legend visibility since inner chart is not yet initialized!")}};_._getSorterForItem=function(e,t){if(e.getType()==="aggregatable"){return new g(this._getAggregatedMeasureNameForMDCItem(e),t.descending)}else if(e.getType()==="groupable"){return new g(this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e.getParent()),t.descending)}};_.insertItemToInnerChart=function(e,t,r){if(t.getType()==="groupable"){const a=this.getInternalChartNameFromPropertyNameAndKind(t.getPropertyKey(),"groupable",e);const n=this._getChart(e).getDimensionByName(a);if(!n){this.createInnerDimension(e,t)}else{n.setLabel(t.getLabel());n.setRole(t.getRole()?t.getRole():"category")}const i=this._getChart(e).getVisibleDimensions();i.splice(r,0,a);this._getChart(e).setVisibleDimensions(i)}else if(t.getType()==="aggregatable"){this.createInnerMeasure(e,t);const a=this._getChart(e).getVisibleMeasures();a.splice(r,0,this._getAggregatedMeasureNameForMDCItem(t));this._getChart(e).setVisibleMeasures(a)}this._prepareColoringForItem(t).then(()=>{this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures())});this._updateSemanticalPattern(e)};_.removeItemFromInnerChart=function(e,t){if(t.getType()==="groupable"&&this._getChart(e).getVisibleDimensions().includes(this.getInternalChartNameFromPropertyNameAndKind(t.getPropertyKey(),"groupable",e))){const r=this.getInternalChartNameFromPropertyNameAndKind(t.getPropertyKey(),"groupable",e);const a=this._getChart(e).getVisibleDimensions().filter(e=>e!==r);if(this._getState(e).inResultDimensions.length>0){this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)}this._getChart(e).setVisibleDimensions(a)}else if(t.getType()==="aggregatable"&&this._getChart(e).getVisibleMeasures().includes(this._getAggregatedMeasureNameForMDCItem(t))){const r=[];e.getItems().filter(e=>e.getType()==="aggregatable").filter(e=>e!==t).forEach(e=>{r.push(this._getAggregatedMeasureNameForMDCItem(e))});this._getChart(e).setVisibleMeasures(r);this._getChart(e).removeMeasure(this._getChart(e).getMeasureByName(this._getAggregatedMeasureNameForMDCItem(t)))}this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures());this._updateSemanticalPattern(e)};_.addItem=function(e,t,r,a){if(e.getModel){return Promise.resolve(this._createMDCChartItem(t,e,a))}};_.removeItem=function(e,t){return Promise.resolve(true)};_.checkAndUpdateMDCItems=function(e){return new Promise((t,r)=>{const a=[];e.getItems().forEach(t=>{const r=t.getPropertyKey()&&t.getLabel()&&t.getType()&&t.getRole();if(!r){a.push(this._getPropertyInfosByName(t.getPropertyKey(),e).then(e=>{t.setLabel(e.label);if(e.groupable){t.setType("groupable");t.setRole(t.getRole()?t.getRole():"category")}else if(e.aggregatable){t.setType("aggregatable");t.setRole(t.getRole()?t.getRole():"axis1")}}))}});Promise.all(a).then(()=>{t()})})};_._createMDCChartItem=function(e,t,r){return this._getPropertyInfosByName(e,t).then(e=>{if(!e){return null}return this._createMDCItemFromProperty(e,t.getId(),r)})};_._createMDCItemFromProperty=function(e,t,r){if(e.groupable){return new l(t+"--GroupableItem--"+e.name,{propertyKey:e.name,label:e.label,type:"groupable",role:r?r:"category"})}if(e.aggregatable){return new l(t+"--AggregatableItem--"+e.name,{propertyKey:e.name,label:e.label,type:"aggregatable",role:r?r:"axis1"})}return null};_.initializeInnerChart=function(e){return new Promise((t,r)=>{this._loadChart().then(r=>{let n;this._setInnerStructure(e,new u(e.getId()+"--implementationContainer",{}));e.addStyleClass("sapUiMDCChartTempTextOuter");if(e.getNoData()){this._getInnerStructure(e).setChartNoDataContent(e.getNoData())}else{n=new a({text:e.getNoDataText()});this._getInnerStructure(e).addStyleClass("sapUiMDCChartTempText");this._getInnerStructure(e).setNoDataContent(n)}this._setUpChartObserver(e);t(this._getInnerStructure(e))})})};_.changedNoDataStruct=function(e){if(this._getInnerStructure(e)){this._getInnerStructure(e).setChartNoDataContent(e.getNoData());this._getInnerStructure(e).invalidate()}};_._createContentFromItems=function(e){return new Promise((t,r)=>{const a=[];const i=[];const o=[];const s=[];e.getItems().forEach((t,r)=>{i.push(this._getPropertyInfosByName(t.getPropertyKey(),e).then(r=>{if(!r){n.error("sap.ui.mdc.Chart: Item "+t.getPropertyKey()+" has no property info representing it in the metadata. Make sure the name is correct and the metadata is defined correctly. Skipping the item!");return}switch(t.getType()){case"groupable":o.push(this.getInternalChartNameFromPropertyNameAndKind(t.getPropertyKey(),"groupable",e));this._addInnerDimension(e,t,r);break;case"aggregatable":s.push(this._getAggregatedMeasureNameForMDCItem(t));this._addInnerMeasure(e,t,r);break;default:n.error("MDC Chart Item "+t.getId()+" with label "+t.getLabel()+' has no known type. Supported typed are: "groupable" & "aggregatable"')}a.push(this._prepareColoringForItem(t))}))});Promise.all(i).then(()=>{this._getState(e).aColMeasures.forEach(t=>{if(this._getState(e).aInSettings.indexOf(t)==-1){a.push(new Promise((r,a)=>{e._getPropertyByNameAsync(t).then(function(a){const{aggregationMethod:n}=a;const i=a.path;const o=this.getInternalChartNameFromPropertyNameAndKind(t,"aggregatable",e);const l={name:o,label:a.label,role:"axis1"};if(n&&i){l.analyticalInfo={propertyPath:i,with:n}}if(a.unitPath){l.unitBinding=a.unitPath}const g=new S(l);s.push(g);this._getChart(e).addMeasure(g);r()})}))}});Promise.all(a).then(()=>{this._getChart(e).setVisibleDimensions(o);this._getChart(e).setVisibleMeasures(s);const r=e.getDelegate().inResultDimensions;if(r&&r instanceof Array&&r.length!=0){const t=[];r.forEach(r=>{t.push(this._getPropertyInfosByName(r,e).then(t=>{const r=this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e);const a=new b({name:r,label:t.label,textFormatter:this.formatText.bind(t)});if(t.textProperty){a.setTextProperty(t.textProperty);a.setDisplayText(true)}this._getChart(e).addDimension(a);this._getState(e).inResultDimensions.push(r)}))});Promise.all(t).then(()=>{this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)})}this._updateColoring(e,o,s);this._updateSemanticalPattern(e);t()})})})};_.getInnerChart=function(e){return this._getChart(e)};_._prepareColoringForItem=function(e){return this._addCriticality(e).then(()=>{this._getState(e.getParent()).aInSettings.push(e.getPropertyKey());if(e.getType()==="aggregatable"){this._getPropertyInfosByName(e.getPropertyKey(),e.getParent()).then(t=>{this._getAdditionalColoringMeasuresForItem(t).forEach(t=>{const r=this._getState(e.getParent());if(r.aColMeasures?.indexOf(t)==-1){r.aColMeasures.push(t)}})})}})};_._getAdditionalColoringMeasuresForItem=function(e){let t=[];const r=e.datapoint?e.datapoint.criticality:null;if(r?.DynamicThresholds){t=r.DynamicThresholds.usedMeasures}return t};_._addCriticality=function(e){return this._getPropertyInfosByName(e.getPropertyKey(),e.getParent()).then(t=>{if(t.criticality||t.datapoint?.criticality){const r=this._getState(e.getParent()).oColorings||{Criticality:{DimensionValues:{},MeasureValues:{}}};const a={};if(e.getType()=="groupable"){const n=t.criticality||[];for(const e in n){a[e]={Values:n[e]}}const i=this.getInternalChartNameFromPropertyNameAndKind(e.getPropertyKey(),"groupable",e.getParent());r.Criticality.DimensionValues[i]=a}else{const n=t.datapoint&&t.datapoint.criticality?t.datapoint.criticality:[];for(const e in n){a[e]=n[e]}const i=this.getInternalChartNameFromPropertyNameAndKind(e.getPropertyKey(),"aggregatable",e.getParent());r.Criticality.MeasureValues[i]=a}const n=this._getState(e.getParent());n.oColorings=r;this._setState(e.getParent(),n)}})};_._updateColoring=function(e,t,r){const a=this._getChart(e);const n=this._getState(e);const i=jQuery.extend(true,{},n.oColorings);if(i&&i.Criticality){let e;for(let r=0;r<t.length;r++){const a=t[r];if(n.oColorings.Criticality.DimensionValues[a]){e={coloring:"Criticality",parameters:{dimension:a}};delete i.Criticality.MeasureValues;break}}if(!e){delete i.Criticality.DimensionValues;for(const e in i.Criticality.MeasureValues){if(r.indexOf(e)==-1){delete i.Criticality.MeasureValues[e]}}e={coloring:"Criticality",parameters:{measure:r}}}if(e){a.setColorings(i);a.setActiveColoring(e)}}};_._updateSemanticalPattern=function(e){const t=this._getChart(e).getVisibleMeasures();t.forEach(t=>{const r=this.getPropertyFromNameAndKind(t,"aggregatable",e);if(!r){return}const a=r.datapoint;if(a){if(a.targetValue||a.foreCastValue){const r=this._getChart(e).getMeasureByName(t);r.setSemantics("actual");if(a.targetValue!=null){const t=this._getChart(e).getMeasureByName(a.targetValue);if(t){t.setSemantics("reference")}else{n.error("sap.ui.mdc.Chart: "+a.targetValue+" is not a valid measure")}}if(a.foreCastValue){const t=this._getChart(e).getMeasureByName(a.foreCastValue);if(t){t.setSemantics("projected")}else{n.error("sap.ui.comp.SmartChart: "+a.ForecastValue.Path+" is not a valid measure")}}r.setSemanticallyRelatedMeasures({referenceValueMeasure:a.targetValue,projectedValueMeasure:a.foreCastValue})}}})};_.getChartTypeInfo=function(e){const r=e.getChartType(),a=t.getResourceBundleFor("sap.ui.mdc"),n=t.getResourceBundleFor("sap.chart.messages");const i={icon:s.mMatchingIcon[r],text:a.getText("chart.CHART_TYPE_TOOLTIP",[n.getText("info/"+r)])};return i};_.getAvailableChartTypes=function(e){const r=[];if(this._getChart(e)){const a=this._getChart(e).getAvailableChartTypes().available;const n=t.getResourceBundleFor("sap.chart.messages");for(let e=0;e<a.length;e++){const t=a[e].chart;r.push({key:t,icon:s.mMatchingIcon[t],text:n.getText("info/"+t)})}}return r};_.getDrillStack=function(e){const t=Object.assign([],this._getChart(e).getDrillStack());t.forEach(t=>{t.dimension=t.dimension.map(t=>{const r=this.getPropertyFromNameAndKind(t,"groupable",e);if(r){return r.name}else{n.error("MDC Chart Delegate: Couldn't map chart dimension to groupable property: "+t);return t}})});return t};_.getSortedDimensions=function(e){return new Promise((t,r)=>{if(e.isPropertyHelperFinal()){t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))}else{e.finalizePropertyHelper().then(()=>{t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))})}})};_._sortPropertyDimensions=function(e){const t=e.filter(e=>e.groupable);if(t){t.sort((e,t)=>{if(e.label&&t.label){return e.label.localeCompare(t.label)}})}return t};_.getDrillableItems=function(e){const t=e.getItems().filter(e=>e.getType()==="groupable");return t};_.setChartType=function(e,t){this._getChart(e).setChartType(t)};_.createInnerChartContent=function(e,t){return new Promise((r,a)=>{this._setChart(e,new I({id:e.getId()+"--innerChart",chartType:"column",height:"100%",width:"100%",isAnalytical:true}));this._getChart(e).setCustomMessages({NO_DATA:e.getNoDataText()});this._getState(e).inResultDimensions=[];this._getInnerStructure(e).removeStyleClass("sapUiMDCChartTempText");e.removeStyleClass("sapUiMDCChartTempTextOuter");e.addStyleClass("sapUiMDCChartGrid");const i=this._getState(e);i.aColMeasures=[];i.aInSettings=[];this._setState(e,i);this._createContentFromItems(e).then(()=>{this._getChart(e).attachRenderComplete(()=>{if(this._getState(e).toolbarUpdateRequested){e._updateToolbar();this._getState(e).toolbarUpdateRequested=false}});this._getInnerStructure(e).setContent(this._getChart(e));this._getInnerStructure(e).setShowNoDataStruct(false);i.dataLoadedCallback=t;this._setState(e,i);let a;if(this._getBindingInfo){a=this._getBindingInfo(e);n.warning("mdc ChartDelegate","calling the private delegate._getBindingInfo. Please make the function public!")}else{a=this.getBindingInfo(e)}this.updateBindingInfo(e,a);this._performInitialBind(e,a);r()})})};_._performInitialBind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._onDataLoadComplete.bind(e));this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);const r=this._getState(e);r.innerChartBound=true;this._checkForMeasureWarning(e)}};_.requestToolbarUpdate=function(e){if(e.getItems().length===0){e._updateToolbar();return}this._getState(e).toolbarUpdateRequested=true};_.createInnerDimension=function(e,t){this._getPropertyInfosByName(t.getPropertyKey(),e).then(r=>{this._addInnerDimension(e,t,r)})};_.createInnerMeasure=function(e,t){this._getPropertyInfosByName(t.getPropertyKey(),e).then(r=>{this._addInnerMeasure(e,t,r)})};_._addInnerDimension=function(e,t,r){const a=this.innerDimensionFactory(e,t,r);this._getChart(e).addDimension(a)};_.innerDimensionFactory=function(e,t,r){const a=new b({name:this.getInternalChartNameFromPropertyNameAndKind(t.getPropertyKey(),"groupable",e),role:t.getRole()||"category",label:t.getLabel(),textFormatter:this.formatText.bind(r)});if(r.textProperty){a.setTextProperty(r.textProperty);a.setDisplayText(true)}return a};_._addInnerMeasure=function(e,t,r){const a=this.innerMeasureFactory(e,t,r);this._getChart(e).addMeasure(a)};_.innerMeasureFactory=function(e,t,r){const{aggregationMethod:a}=r;const n=r.path;const i={name:this._getAggregatedMeasureNameForMDCItem(t),label:t.getLabel(),role:t.getRole()?t.getRole():"axis1"};if(a&&n){i.analyticalInfo={propertyPath:n,with:a}}if(r.unitPath){i.unitBinding=r.unitPath}return new S(i)};_._getAggregatedMeasureNameForProperty=function(e){return e.aggregationMethod+e.name};_.rebind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._onDataLoadComplete.bind(e));this._getInnerStructure(e).setShowNoDataStruct(false);if(t.binding){t.binding.bHasAnalyticalInfo=true}this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);const r=this._getState(e);r.innerChartBound=true}};_._checkForMeasureWarning=function(e){if(!e.getNoData()){return}const t=e.getItems().filter(e=>e.getType()==="aggregatable");if(t.length===0){this._getInnerStructure(e).setShowNoDataStruct(true);e.setBusy(false)}else{this._getInnerStructure(e).setShowNoDataStruct(false)}};_.getBindingInfo=function(e){if(this._getBindingInfoFromState(e)){return this._getBindingInfoFromState(e)}const t=e.getDelegate().payload;const r="/"+t.collectionName;const a={path:r};return a};_.getInnerChartBound=function(e){const t=this._getState(e);if(!t){return false}return t.innerChartBound?true:false};_.updateBindingInfo=function(e,t){D(e,t);t.filters=this.getFilters(e);t.sorter=this.getSorters(e)};function D(t,r){const a=e.getElementById(t.getFilter());if(!a){return}const n=a.getConditions();const i=a.getSearch instanceof Function?a.getSearch():"";if(n){const e=o.getParametersInfo(a,n);if(e){r.path=e}}if(!r.parameters){r.parameters={}}r.parameters["$search"]=i||undefined}_.getSorters=function(e){let t;const r=e.getSortConditions()?e.getSortConditions().sorters:[];r.forEach(r=>{const a=e.getItems().find(e=>e.getPropertyKey()===r.name);if(!a){return}const n=this._getSorterForItem(a,r);if(t){t.push(n)}else{t=[n]}});return t};_._getAggregatedMeasureNameForMDCItem=function(e){return this.getInternalChartNameFromPropertyNameAndKind(e.getPropertyKey(),"aggregatable",e.getParent())};_.getInternalChartNameFromPropertyNameAndKind=function(e,t,r){return e};_.getPropertyFromNameAndKind=function(e,t,r){return r.getPropertyHelper().getProperty(e)};_.setChartTooltipVisibility=function(e,t){if(this._getChart(e)){if(t){if(!this._getState(e).vizTooltip){const t=this._getState(e);t.vizTooltip=new P;this._setState(e,t)}this._getState(e).vizTooltip.connect(this._getChart(e).getVizUid())}else if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}}else{n.error("Trying to set chart tooltip while inner chart was not yet initialized")}};_._loadChart=function(){return new Promise(e=>{const r=["sap/chart/Chart","sap/chart/data/Dimension","sap/chart/data/Measure","sap/viz/ui5/controls/VizTooltip"];function a(t,r,a,n){I=t;b=r;S=a;P=n;e()}t.load({name:"sap.viz"}).then(()=>{sap.ui.require(r,a)})})};_.getPropertyHelperClass=function(){return y};_.formatText=function(e,t){return e};_.setNoDataText=function(e,t){this._getChart(e).setCustomMessages({NO_DATA:t})};_.showOverlay=function(e,t){if(this._getInnerStructure(e)){this._getInnerStructure(e).showOverlay(t)}};_._getPropertyInfosByName=function(e,t){return t._getPropertyByNameAsync(e)};_._getModel=function(e){const t=e.getDelegate().payload;return e.getModel(t.model)};_._addBindingListener=function(e,t,r){if(!e.events){e.events={}}if(!e.events[t]){e.events[t]=r}else{const a=e.events[t];e.events[t]=function(){r.apply(this,arguments);a.apply(this,arguments)}}};_._onDataLoadComplete=function(e){const t=this.getControlDelegate()._getInnerStructure(this);if(this.getNoData()){if(e.getSource()&&e.getSource().getCurrentContexts().length===0){t.setShowNoDataStruct(true)}else{t.setShowNoDataStruct(false)}}this._innerChartDataLoadComplete(e)};return _});
//# sourceMappingURL=ChartDelegate.js.map