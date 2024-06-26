/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_CancelablePromise"],function(e){"use strict";var t={};var i={};var r={};t.registerValidators=function(t){Object.keys(t).forEach(function(n){if(!this.hasValidator(n)){r[n]=new e(function(e,i,a){a(function(){delete r[n]});a.shouldReject=false;sap.ui.require([t[n]],e,i)});r[n].then(function(e){i[n]=e;delete r[n]})}}.bind(this))};t.ready=function(){return Promise.all(Object.values(r))};t.deregisterValidator=function(e){if(i[e]){delete i[e]}if(r[e]){r[e].cancel()}};t.deregisterAllValidators=function(){Object.keys(r).forEach(function(e){this.deregisterValidator(e)}.bind(this));i={}};t.getValidator=function(e){var t=i[e];if(!t){throw new Error("Validator "+e+" was not registered.")}return t};t.hasValidator=function(e){return Object.keys(i).includes(e)};t.isRegistered=function(e){return Object.keys(r).includes(e)};return t});
//# sourceMappingURL=ValidatorRegistry.js.map