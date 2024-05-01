/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/common/revertAddedControls","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame","sap/ui/fl/changeHandler/condenser/Classification"],function(e,t,n,r){"use strict";var a={};a.applyChange=function(e,r,a){var o=a.modifier;var i=e.getContent();var g=a.view;var c=i.targetAggregation;var s;var f;return Promise.resolve().then(o.findAggregation.bind(o,r,c)).then(function(n){if(!n){throw new Error(`The given Aggregation is not available in the given control: ${o.getId(r)}`)}return t(e,r,a)}).then(function(t){s=t;return n(e,a,i.selector)}).then(function(e){f=e;return o.insertAggregation(r,c,f,s,g)}).then(function(){e.setRevertData([o.getId(f)])})};a.revertChange=e;a.completeChangeContent=function(e,t,n){var r=n.modifier;var a=n.appComponent;["targetAggregation","baseId","url"].forEach(function(e){if(!Object.hasOwn(t.content,e)){throw new Error(`Attribute missing from the change specific content '${e}'`)}});var o=Object.assign({},t.content);o.selector=r.getSelector(o.baseId,a);e.setContent(o)};a.getChangeVisualizationInfo=function(e){return{affectedControls:[e.getContent().selector]}};a.getCondenserInfo=function(e){var t=e.getContent();return{classification:r.Create,uniqueKey:"iFrame",affectedControl:t.selector,targetContainer:e.getSelector(),targetAggregation:t.targetAggregation,setTargetIndex(e,t){e.getContent().index=t},getTargetIndex(e){return e.getContent().index},update(e,t){Object.assign(e.getContent(),t)}}};return a},true);
//# sourceMappingURL=AddIFrame.js.map