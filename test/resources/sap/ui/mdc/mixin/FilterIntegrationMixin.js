/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Element","sap/ui/mdc/enums/ReasonMode"],(t,e,i)=>{"use strict";const n={};const r="sap.ui.mdc.IFilter";n.setFilter=function(t){const i=typeof t==="object"?t.getId():t;const n=this.getFilter();if(n!==i){this._validateFilter(t);const i=e.getElementById(this.getFilter());if(i){l(this,i)}this.setAssociation("filter",t,true);const n=e.getElementById(this.getFilter());if(n){a(this,n)}}return this};function o(t){const e=t.getParameter("reason");const n=t.getSource();const r=n.getLiveMode&&(n.getLiveMode()?e===i.Enter:e===i.Go);this._rebind(r);if(this._onFilterSearch){this._onFilterSearch(t)}}function s(t){if(this._onFiltersChanged){this._onFiltersChanged(t)}}function a(t,e){e.attachSearch(o,t);if(e.attachFiltersChanged instanceof Function){e.attachFiltersChanged(s,t)}if(t._onFilterProvided instanceof Function){t._onFilterProvided(e)}}function l(t,e){e.detachSearch(o,t);if(e.detachFiltersChanged instanceof Function){e.detachFiltersChanged(s,t)}if(t._onFilterRemoved instanceof Function){t._onFilterRemoved(e)}}function c(t){if(!(t&&t.getMetadata()&&t.getMetadata().hasAssociation("filter"))){throw new Error("Please add the 'filter' association to your control metadata"+t)}if(!(t.rebind instanceof Function)){throw new Error("Please implement the method 'rebind' for the control "+t)}if(!(t.isFilteringEnabled instanceof Function)){throw new Error("Please implement the method isFilteringEnabled for the control "+t)}}n._validateFilter=function(t){c(this);const i=typeof t==="object"?t:e.getElementById(t);if(i&&!i.isA(r)){throw new Error('"'+t+'" is not valid for association "filter".'+' Please use an object that implements the "'+r+'" interface')}};n.rebind=function(){if(this.bIsDestroyed){return}let t;let i;const n=e.getElementById(this.getFilter()),r=this.isFilteringEnabled();if(r||n){if(n){t=n.validate(true)}if(r){i=this.retrieveInbuiltFilter().then(t=>t.validate(true))}Promise.all([t,i]).then(()=>{this._rebind()},()=>{})}else{this._rebind()}};n._getLabelsFromFilterConditions=function(){const e=[];if(this.getFilterConditions){const i=this.getFilterConditions();Object.keys(i).forEach(n=>{if(!i[n]||i[n].length<1){return}const r=this.getPropertyHelper().getProperty(n)?this.getPropertyHelper().getProperty(n).label:n;if(r){e.push(r)}if(!r||r===n){t.error("No valid property found for filter with key "+n+". Check your metadata.")}})}return e};return function(){this.setFilter=n.setFilter;this._validateFilter=n._validateFilter;this.rebind=n.rebind;this._getLabelsFromFilterConditions=n._getLabelsFromFilterConditions}});
//# sourceMappingURL=FilterIntegrationMixin.js.map