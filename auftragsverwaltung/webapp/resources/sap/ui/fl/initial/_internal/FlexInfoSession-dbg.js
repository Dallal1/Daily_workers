/*
 * ! OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([], () => {
	"use strict";

	var FlexInfoSession = {};

	var PARAMETER_PREFIX = "sap.ui.fl.info.";

	function getSessionStorageKey(sReference) {
		return PARAMETER_PREFIX + (sReference || "true");
	}

	FlexInfoSession.getByReference = function(sReference) {
		return JSON.parse(window.sessionStorage.getItem(getSessionStorageKey(sReference))) || {};
	};

	FlexInfoSession.setByReference = function(oInfo, sReference) {
		if (oInfo) {
			window.sessionStorage.setItem(getSessionStorageKey(sReference), JSON.stringify(oInfo));
		}
	};

	FlexInfoSession.removeByReference = function(sReference) {
		window.sessionStorage.removeItem(getSessionStorageKey(sReference));
	};

	return FlexInfoSession;
});
