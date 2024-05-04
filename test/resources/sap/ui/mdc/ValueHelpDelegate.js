/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate","sap/ui/model/FilterType","sap/ui/mdc/enums/ConditionValidated","sap/ui/mdc/enums/OperatorName","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/FilterConverter","sap/ui/Device"],(e,t,n,i,o,s,r)=>{"use strict";const u=Object.assign({},e);u.retrieveContent=function(e,t,n){return Promise.resolve()};u.isSearchSupported=function(e,t,n){return false};u.showTypeahead=function(e,t){if(r.system.phone){return true}if(!t||t.isA("sap.ui.mdc.valuehelp.base.FilterableListContent")&&!t.getFilterValue()){return false}else if(t.isA("sap.ui.mdc.valuehelp.base.ListContent")){const e=t.getListBinding();const n=e&&e.getCurrentContexts().length;return n>0}return true};u.updateBindingInfo=function(e,t,n){n.parameters={};n.filters=this.getFilters(e,t)};u.getFilters=function(e,t){const r=t.getActiveFilterBar();const u=r?r.getConditions():t._oInitialFilterConditions||{};if(!t.isPropertyInitial("filterFields")){const e=t.getFilterFields();const s=t.getSearch();if(!r&&s&&e&&e!=="$search"){const t=o.createCondition(i.Contains,[s],undefined,undefined,n.NotValidated);u[e]=[t]}}const l=u&&this.getTypesForConditions(e,t,u);const a=u&&s.createFilters(u,l,undefined,t.getCaseSensitive());return a?[a]:[]};u.updateBinding=function(e,n,i,o){n.filter(i.filters,t.Application);if(n.isSuspended()){n.resume()}};u.adjustSearch=function(e,t,n){return n};u.executeFilter=function(e,t,n){return Promise.resolve(t)};u.checkListBindingPending=function(e,t,n){if(!t||t.isSuspended()){return false}return Promise.resolve(t.getContexts(0,n)).then(e=>e.length===0)};u.onConditionPropagation=function(e,t,n){};u.getInitialFilterConditions=function(e,t,n){const i={};return i};u.findConditionsForContext=function(e,t,i,o){const s=i.getObject(t.getKeyPath());return o.filter(e=>e.validated===n.Validated&&s===e.values[0])};u.modifySelectionBehaviour=function(e,t,n){return n};u.createConditionPayload=function(e,t,n,i){return undefined};u.getTypesForConditions=function(e,t,n){const i={};const o=t&&t.getListBindingInfo();if(o&&o.template){o.template.mAggregations.cells.forEach(e=>{Object.values(e.mBindingInfos).forEach(e=>{e.parts.forEach(e=>{i[e.path]={type:e.type||null}})})},{})}return i};u.getFilterConditions=function(e,t,n){if(this.getInitialFilterConditions){return this.getInitialFilterConditions(e,t,n&&n.control||t&&t.getControl())}return{}};u.getFirstMatch=function(e,t,n){return t.getRelevantContexts(n)[0]};u.isFilteringCaseSensitive=function(e,t){return t.getCaseSensitive()};u.shouldOpenOnFocus=function(e,t){let n=false;if(t.isA("sap.ui.mdc.valuehelp.Popover")){n=t.getOpensOnFocus()}return Promise.resolve(n)};u.shouldOpenOnClick=function(e,t){let n=false;if(t.isA("sap.ui.mdc.valuehelp.Popover")){if(r.system.phone&&(!t.isSingleSelect()||!t.isDialog())){n=true}else{let e=true;if(!t.isPropertyInitial("opensOnClick")){e=false;n=t.getOpensOnClick()}if(e){const e=t._getContent();n=!!e&&e.shouldOpenOnClick()}}}return Promise.resolve(n)};return u});
//# sourceMappingURL=ValueHelpDelegate.js.map