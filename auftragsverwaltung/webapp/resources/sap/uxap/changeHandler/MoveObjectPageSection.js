/*!
	* OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	*/
sap.ui.define(["sap/base/util/merge","sap/ui/core/Element","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/changeHandler/MoveControls"],function(e,t,n,r){"use strict";var o=Object.assign({},r);o.applyChange=function(e,t,n){var o=n.modifier.targets==="jsControlTree";if(o){t._suppressScroll()}var a=r.applyChange.call(this,e,t,n);if(o){t.attachEventOnce("onAfterRenderingDOMReady",function(){t._resumeScroll(false)})}return a};o.revertChange=function(e,t,n){var o=n.modifier.targets==="jsControlTree";if(o){t._suppressScroll()}var a=r.revertChange.call(this,e,t,n);if(o){t.attachEventOnce("onAfterRenderingDOMReady",function(){t._resumeScroll(false)})}return a};o.completeChangeContent=function(e,n,o){var a=t.getElementById(n.source.id),i=t.getElementById(n.target.id);var s=Promise.resolve();if(a.isA("sap.uxap.AnchorBar")&&i.isA("sap.uxap.AnchorBar")){s=s.then(this._mapAnchorsToSections.bind(this,n,o))}return s.then(function(){return r.completeChangeContent.apply(this,arguments[0])}.bind(this,arguments))};o._mapAnchorsToSections=function(n,r){return Promise.resolve().then(function(){var o,a;var i=r.modifier;var s=i.bySelector(n.selector,r.appComponent,r.view);var c=s._getVisibleSections();function g(e){var n=t.getElementById(e),r=n.data("sectionId");return t.getElementById(r)}var l=[];n.movedElements.forEach(function(e){var t=c[e.targetIndex];var n=Promise.resolve().then(function(){return i.findIndexInParentAggregation(t)}).then(function(t){e.targetIndex=t;o=g(e.id);if(!o||!o.getParent()){throw new Error("Cannot map anchor to section")}a={id:o.getParent().getId(),aggregation:o.sParentAggregationName};e.id=o.getId()});l.push(n)});return Promise.all(l).then(function(){e(n.source,a);e(n.target,a)})})};o.getChangeVisualizationInfo=function(e,t){var r=e.getContent();var o=e.getRevertData()[0];var a=r.movedElements[0].selector;var i=n.bySelector(a,t);var s=i.getParent().getAggregation("_anchorBar");var c=[a];var g=[a];s.getAggregation("content").forEach(function(e){e.getAggregation("customData").some(function(t){if(t.getKey()==="sectionId"&&i.getId()===t.getProperty("value")){g.push(e.getId())}})});return{affectedControls:c,displayControls:g,dependentControls:[r.source.selector],descriptionPayload:{sourceContainer:o.sourceParent,targetContainer:r.target.selector}}};return o},true);
//# sourceMappingURL=MoveObjectPageSection.js.map