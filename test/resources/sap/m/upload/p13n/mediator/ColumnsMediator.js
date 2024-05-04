/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/m/upload/p13n/mediator/BaseMediator","sap/m/p13n/SelectionPanel","sap/m/upload/p13n/modules/CustomDataConfig","sap/ui/core/Locale","sap/base/util/deepEqual"],function(e,t,n,o,i,r){"use strict";const a=t.extend("sap.m.upload.p13n.mediator.ColumnsMediator",{constructor:function(e){t.call(this,e)}});a.prototype.createPanel=function(){return Promise.resolve(this.createUi(this.getPanelData()))};a.prototype.createUi=function(e){this._oPanel=new n({enableCount:true,showHeader:true});this._oPanel.setP13nData(e);return this._oPanel};a.prototype.getPanelData=function(){const t=this.arrayToMap(this.getCurrentState(),true);const n=[],o=this.getControl()._getP13nMetadata();o[this.getP13nMetadataTarget()].forEach(e=>{n.push({key:e.key,label:e.label||e.key,tooltip:e.tooltip,index:t[e.key]?t[e.key].index:undefined,visible:!!t[e.key]})});const r=new i(e.getLanguageTag()).toString(),a=window.Intl.Collator(r,{});n.sort((e,t)=>{if(e.visible&&t.visible){return(e.index||0)-(t.index||0)}if(e.visible){return-1}if(t.visible){return 1}return a.compare(e.label,t.label)});n.forEach(e=>delete e.index);return n};a.prototype.getCurrentState=function(){const e=[],t=this.getControl().getAggregation(this.getTargetAggregation())||[],n=this.getView();t.forEach((t,o)=>{const i=n?n.getLocalId(t.getId()):t.getId();e[i]={key:i,index:o,visible:t.getVisible()}});const i=o.read(this.getControl())||{};const r=i.hasOwnProperty("aggregations")?i.aggregations[this.getTargetAggregation()]:{};for(const t in r){const{index:n,visible:o=true}=r[t];if(!e[t]){continue}if(n!==undefined){e[t].index=n}e[t].visible=o}const a=Object.values(e).filter(e=>e.visible).sort((e,t)=>e.index-t.index);return a.map(e=>({key:e.key}))};a.prototype._getP13nData=function(){return this._oPanel?this._oPanel.getP13nData():{}};a.prototype.getChanges=function(){const e=[],t=this.getCurrentState(),n=this._getP13nData(),o=n.filter(e=>!!e.visible).map(e=>({key:e.key}));if(r(t,o)){return e}const i=this._getDeletes(t,o),a=this._getInserts(t,o),s=this._getMove(t,o,i,a);e.push(this.createChange("uploadSetTableColumnsStateChange",{deleted:i,moved:s,inserted:a}));return e};a.prototype._getDeletes=function(e,t){const n=[],o=this.arrayToMap(t);e.forEach((e,t)=>{if(!o[e.key]){n.push({key:e.key,prevIndex:t})}});return n};a.prototype._getInserts=function(e,t){const n=[],o=this.arrayToMap(e);t.forEach((e,t)=>{if(!o[e.key]){n.push({key:e.key,index:t})}});return n};a.prototype._getMove=function(e,t){const n=[],o=this.arrayToMap(t,true);e.forEach((e,t)=>{if(o[e.key]&&o[e.key].index!==t){n.push({key:e.key,index:o[e.key].index,prevIndex:t})}});return n};a.prototype.applyStateToTable=function(){const e=this.getCurrentState(),t=this.getView();this.getControl().getColumns().forEach(e=>{e.setVisible(false)});const n=this.getControl().getColumns().reduce((e,n)=>{const o=t?t.getLocalId(n.getId()):n.getId();e[o]=n;return e},{});e.forEach((e,t)=>{if(n[e.key]){n[e.key].setVisible(true);n[e.key].setOrder(t)}})};return a});
//# sourceMappingURL=ColumnsMediator.js.map