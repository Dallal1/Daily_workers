/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.ui.mdc.enums.ValueHelpSelectionType
sap.ui.define(["sap/ui/base/DataType"], (DataType) => {
	"use strict";


	/**
	 * Enumeration of the possible selection types
	 *
	 * @enum {string}
	 * @private
	 * @ui5-restricted sap.ui.mdc
	 * @since 1.115
	 * @alias sap.ui.mdc.enums.ValueHelpSelectionType
	 */
	const ValueHelpSelectionType = {
		/**
		 * The given conditions are set and replace the existing ones.
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		Set: "Set",

		/**
		 * The given conditions are just added to the existing ones, if they don't already exist.
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		Add: "Add",

		/**
		 * The given conditions are removed.
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		Remove: "Remove"
	};

	DataType.registerEnum("sap.ui.mdc.enums.ValueHelpSelectionType", ValueHelpSelectionType);

	return ValueHelpSelectionType;

}, /* bExport= */ true);