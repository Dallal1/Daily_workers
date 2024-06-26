/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/testrecorder/Dialects"
], function (BaseObject, Dialects) {
	"use strict";

	var DEFAULT_DIALECT = Dialects.OPA5;

	var oDialectRegistry = null;

	var DialectRegistry = BaseObject.extend("sap.ui.testrecorder.DialectRegistry", {
		constructor: function () {
			if (!oDialectRegistry) {
				BaseObject.apply(this, arguments);
				this.setActiveDialect(DEFAULT_DIALECT);
			} else {
				return oDialectRegistry;
			}
		}
	});

	DialectRegistry.prototype.getActiveDialect = function () {
		return this._sDialect;
	};

	DialectRegistry.prototype.setActiveDialect = function (sDialect) {
		for (var sKey in Dialects) {
			if (sDialect === Dialects[sKey]) {
				this._sDialect = sDialect;
			}
		}
	};

	oDialectRegistry = new DialectRegistry();

	return oDialectRegistry;
});
