/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/ui/base/DataType"], (DataType) => {
	"use strict";

	/**
	 * Defines in which mode the content of a {@link sap.ui.mdc.Field Field}, {@link sap.ui.mdc.FilterField FilterField} or {@link sap.ui.mdc.MultiValueField MultiValueField} is rendered.
	 *
	 * @enum {string}
	 * @private
	 * @ui5-restricted sap.ui.mdc
	 * @since 1.87
	 * @alias sap.ui.mdc.enum.ContentMode
	 * @deprecated since 1.115.0 - please see {@link sap.ui.mdc.enums.ContentMode}
	 */
	const ContentMode = {
		/**
		 * Display mode for single value
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		Display: "Display",
		/**
		 * Display mode for multiple values
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 * @since 1.96
		 */
		DisplayMultiValue: "DisplayMultiValue",
		/**
		 * Display mode for multiline single value
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 * @since 1.91
		 */
		DisplayMultiLine: "DisplayMultiLine",
		/**
		 * Edit mode for single value
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		Edit: "Edit",
		/**
		 * Edit mode for multiple values
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		EditMultiValue: "EditMultiValue",
		/**
		 * Edit mode for multiple lines single value
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		EditMultiLine: "EditMultiLine",
		/**
		 * Edit mode for operator dependent controls
		 * This is used for single value and only one operator.
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		EditOperator: "EditOperator",
		/**
		 * Edit mode for single value field if a field help is assigned
		 * To support field help, in some cases a different control needs to be rendered.
		 * @private
		 * @ui5-restricted sap.ui.mdc
		 */
		EditForHelp: "EditForHelp"
	};

	/**
	 * @deprecated As of version 1.121
	 */
	DataType.registerEnum("sap.ui.mdc.enum.ContentMode", ContentMode);

	return ContentMode;

}, /* bExport= */ true);