/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// ---------------------------------------------------------------------------------------
// Delegate class used to help create content in the filterbar and fill relevant metadata
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
sap.ui.define([
	"sap/ui/core/Lib", "sap/ui/mdc/FilterBarDelegate"
], (Library, FilterBarDelegate) => {
	"use strict";

	const mdcMessageBundle = Library.getResourceBundleFor("sap.ui.mdc");

	const ValueHelpFilterBarDelegate = Object.assign({}, FilterBarDelegate);

	ValueHelpFilterBarDelegate.fetchProperties = function(oFilterBar) {
		return Promise.resolve([{
			name: "$search",
			label: mdcMessageBundle.getText("filterbar.SEARCH"),
			dataType: "sap.ui.model.type.String"
		}]);
	};

	return ValueHelpFilterBarDelegate;
});