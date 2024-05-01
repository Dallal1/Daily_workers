/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/mdc/p13n/subcontroller/AdaptFiltersController","sap/ui/mdc/filterbar/aligned/FilterContainer","sap/ui/mdc/filterbar/aligned/FilterItemLayout","sap/ui/mdc/filterbar/FilterBarBase","sap/ui/mdc/filterbar/FilterBarBaseRenderer","sap/m/library","sap/m/Button","sap/base/util/merge","sap/base/Log","sap/ui/core/library","sap/ui/mdc/enums/FilterBarP13nMode"],(t,e,r,i,o,n,s,a,l,p,d,h)=>{"use strict";const{HasPopup:u}=d.aria;const _=o.extend("sap.ui.mdc.FilterBar",{metadata:{designtime:"sap/ui/mdc/designtime/filterbar/FilterBar.designtime",properties:{showAdaptFiltersButton:{type:"boolean",defaultValue:true},showClearButton:{type:"boolean",defaultValue:false},p13nMode:{type:"sap.ui.mdc.enums.FilterBarP13nMode[]"},_p13nModeItem:{type:"boolean",visibility:"hidden",defaultValue:false}}},renderer:n});const{ButtonType:c}=s;_.prototype._createInnerLayout=function(){this._cLayoutItem=i;this._oFilterBarLayout=new r;this._oFilterBarLayout.getInner().setParent(this);this._oFilterBarLayout.getInner().addStyleClass("sapUiMdcFilterBarBaseAFLayout");this.setAggregation("layout",this._oFilterBarLayout,true);this._addButtons()};_.prototype.setP13nMode=function(r){this.setProperty("p13nMode",r||[],false);const i={helper:this.getPropertyHelper(),controller:{}};let o=false;r&&r.forEach(t=>{if(t=="Item"){o=true;i.controller["Item"]=new e({control:this})}});this._setP13nModeItem(o);i.controller["Filter"]=new t({control:this});this.getEngine().register(this,i);return this};_.prototype.setFilterConditions=function(e,r){t.checkConditionOperatorSanity(e);if(this._oP13nFB){this._oP13nFB.setFilterConditions(l({},e))}this.setProperty("filterConditions",e,r);return this};_.prototype._getP13nModeItem=function(){return this._oModel.getProperty("/_p13nModeItem")};_.prototype._setP13nModeItem=function(t){this._oModel.setProperty("/_p13nModeItem",t,true)};_.prototype._addButtons=function(){if(this._oFilterBarLayout){this.setProperty("_filterCount",this._oRb.getText("filterbar.ADAPT"),false);this._btnAdapt=new a(this.getId()+"-btnAdapt",{type:c.Transparent,text:"{"+o.INNER_MODEL_NAME+">/_filterCount}",press:this.onAdaptFilters.bind(this)});this._btnAdapt.setAriaHasPopup(u.ListBox);this._btnAdapt.setModel(this._oModel,o.INNER_MODEL_NAME);this._btnAdapt.bindProperty("visible",{parts:[{path:"/showAdaptFiltersButton",model:o.INNER_MODEL_NAME},{path:"/_p13nModeItem",model:o.INNER_MODEL_NAME}],formatter:function(t,e){return t&&e}});this._btnSearch=this._getSearchButton();this._btnSearch.setModel(this._oModel,o.INNER_MODEL_NAME);this._btnSearch.bindProperty("visible",{parts:[{path:"/showGoButton",model:o.INNER_MODEL_NAME},{path:"/liveMode",model:o.INNER_MODEL_NAME}],formatter:function(t,e){return t&&(this._isPhone()?true:!e)}.bind(this)});this._btnSearch.addStyleClass("sapUiMdcFilterBarBaseButtonPaddingRight");this._btnClear=new a(this.getId()+"-btnClear",{type:c.Transparent,visible:"{"+o.INNER_MODEL_NAME+">/showClearButton}",text:this._oRb.getText("filterbar.CLEAR"),press:function(t){this.onClear()}.bind(this)});this._btnClear.setModel(this._oModel,o.INNER_MODEL_NAME);this._oFilterBarLayout.addButton(this._btnSearch);this._oFilterBarLayout.addButton(this._btnClear);this._oFilterBarLayout.addButton(this._btnAdapt)}};_.prototype.onClear=function(){this._btnClear.setEnabled(false);this.awaitControlDelegate().then(t=>{t.clearFilters(this).catch(t=>{p.error(t)}).finally(()=>{this._btnClear.setEnabled(true)})})};_.prototype.retrieveInbuiltFilter=function(){const t=o.prototype.retrieveInbuiltFilter.apply(this,arguments);return t.then(t=>t)};_.prototype.onAdaptFilters=function(t){return this._retrieveMetadata().then(()=>this.getEngine().show(this,"Item",{reset:function(){this.getEngine().reset(this);this._getConditionModel().checkUpdate(true)}.bind(this)}).then(t=>t))};_.prototype.getCurrentState=function(){const t=o.prototype.getCurrentState.apply(this,arguments);if(!this.getProperty("_p13nModeItem")){delete t.items}return t};_.prototype.setFocusOnFirstErroneousField=function(){return this._setFocusOnFirstErroneousField()};_.prototype.exit=function(){o.prototype.exit.apply(this,arguments);this._btnClear=undefined};return _});
//# sourceMappingURL=FilterBar.js.map