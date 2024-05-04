/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/upload/p13n/mediator/BaseMediator","sap/m/upload/FilterPanel","sap/m/upload/p13n/modules/CustomDataConfig","sap/base/util/deepEqual","sap/ui/model/Filter","sap/ui/model/FilterType"],function(t,e,a,r,o,n){"use strict";const p=t.extend("sap.m.upload.p13n.mediator.FilterMediator",{constructor:function(e){t.call(this,e)}});p.prototype.createPanel=function(){return Promise.resolve(this.createUi(this.getPanelData()))};p.prototype.createUi=function(t){const a=this.getControl()._getP13nMetadata();this._oPanel=new e({fields:a[this.getP13nMetadataTarget()]});this._oPanel.setP13nData(t);return this._oPanel};p.prototype.getPanelData=function(){const t=this.getCurrentState(),e=[],a=this.getControl()._getP13nMetadata()[this.getP13nMetadataTarget()].reduce((t,e)=>{t[e.path]=e;return t},{});t.forEach(t=>{if(!a[t.path]){return}e.push({name:t.key,path:t.path,operator:t.operator,value:t.value})});return e};p.prototype.getCurrentState=function(){const t=a.read(this.getControl())||{};const e=t.hasOwnProperty("properties")&&t.properties[this.getTargetAggregation()]?t.properties[this.getTargetAggregation()]:{};const r=Object.values(e).sort((t,e)=>t.index-e.index);return r.map(t=>({key:t.key,path:t.path,operator:t.operator,value:t.value}))};p.prototype.getChanges=function(){const t=[],e=this.getCurrentState(),a=this._getP13nData(),o=a.map(t=>({key:t.name,path:t.path,operator:t.operator,value:t.value}));if(r(e,o)){return t}const n=this._getDeletes(e,o),p=this._getInserts(e,o),i=this._getMove(e,o,n,p);t.push(this.createChange("uploadSetTableFilterStateChange",{deleted:n,moved:i,inserted:p}));return t};p.prototype._getP13nData=function(){return this._oPanel?this._oPanel.getP13nData():{}};p.prototype._getDeletes=function(t,e){const a=[],r=this.arrayToMap(e);t.forEach((t,e)=>{if(!r[t.key]){a.push({key:t.key,prevIndex:e,prevPath:t.path,prevOperator:t.operator,prevValue:t.value})}});return a};p.prototype._getInserts=function(t,e){const a=[],r=this.arrayToMap(t);e.forEach((t,e)=>{if(!r[t.key]){a.push({key:t.key,index:e,path:t.path,operator:t.operator,value:t.value})}});return a};p.prototype._getMove=function(t,e){const a=[],r=this.arrayToMap(e,true),o=["path","operator","value"];t.forEach((t,e)=>{if(r[t.key]&&(r[t.key].index!==e||!o.every(e=>r[t.key][e]===t[e]))){a.push({key:t.key,index:r[t.key].index,prevIndex:e,path:r[t.key].path,prevPath:t.path,operator:r[t.key].operator,prevOperator:t.operator,value:r[t.key].value,prevValue:t.value})}});return a};p.prototype.applyStateToTable=function(t={}){const e=this.getCurrentState(),a=e.map(t=>new o(t.path,t.operator,t.value));if(this.getControl().getBinding("items")){this.getControl().getBinding("items").filter(a.length?new o(a,true):null,n.Control)}};return p});
//# sourceMappingURL=FilterMediator.js.map