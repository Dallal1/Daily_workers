/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PropertyHelper"],e=>{"use strict";const t=e.extend("sap.ui.mdc.table.V4AnalyticsPropertyHelper",{constructor:function(t,r){this._bEnableAggregatableAttribute=true;e.call(this,t,r,{technicallyGroupable:{type:"boolean",default:{value:"attribute:groupable"},inComplexProperty:{valueIfNotAllowed:false}},technicallyAggregatable:{type:"boolean",default:{value:"attribute:aggregatable"},inComplexProperty:{valueIfNotAllowed:false}},customAggregate:{type:{contextDefiningProperties:{type:"PropertyReference[]"}}}})}});t.prototype.validateProperty=function(t,r,a){e.prototype.validateProperty.apply(this,arguments);if(t.groupable&&t.extension&&t.extension.technicallyGroupable===false){throw new Error("Invalid property definition: A property cannot be groupable when not technically groupable.\n"+t)}if(t.aggregatable&&t.extension&&t.extension.technicallyAggregatable===false){throw new Error("Invalid property definition: A property cannot be aggregatable when not technically aggregatable.\n"+t)}};t.prototype.prepareProperty=function(t){e.prototype.prepareProperty.apply(this,arguments);Object.defineProperty(t,"getAggregatableProperties",{value:function(){return t.getSimpleProperties().filter(e=>e.aggregatable)}})};t.prototype.getAggregatableProperties=function(){return this.getProperties().filter(e=>e.aggregatable)};t.prototype.getPropertiesForPlugin=function(){return this.getProperties().reduce((e,t)=>{if(t.isComplex()){return e}const r={key:t.key,path:t.path,isKey:t.isKey,text:t.text,unit:t.unit,groupable:t.extension.technicallyGroupable,aggregatable:t.extension.technicallyAggregatable};if(t.extension.customAggregate){r.aggregationDetails={customAggregate:{contextDefiningProperties:t.extension.customAggregate.contextDefiningProperties}}}e.push(r);return e},[])};return t});
//# sourceMappingURL=V4AnalyticsPropertyHelper.js.map