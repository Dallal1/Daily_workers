/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
	"sap/m/Shell",
	"sap/ui/core/ComponentContainer",
	"sap/ui/core/Core"
], function(
	Shell,
	ComponentContainer,
	Core
) {
	"use strict";
	Core.ready().then(() => {
		new Shell({
			app: new ComponentContainer({
				height: "100%",
				name: "sap.ui.rta.appVariant.manageApps",
				settings: {
					id: "sap.ui.rta.appVariant.manageApps"
				}
			})
		}).placeAt("content");
	});
});