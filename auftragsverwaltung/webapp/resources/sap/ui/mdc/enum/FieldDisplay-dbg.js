/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["sap/ui/base/DataType"], (DataType) => {
	"use strict";

	/**
	 * Defines the output of a {@link sap.ui.mdc.Field Field}, {@link sap.ui.mdc.FilterField FilterField}, or {@link sap.ui.mdc.MultiValueField MultiValueField} control.
	 *
	 * For the {@link sap.ui.mdc.Field Field} control, this enumeration defines how the <code>value</code> and <code>additionalValue</code> properties are formatted.
	 *
	 * For the {@link sap.ui.mdc.MultiValueField MultiValueField} control, this enumeration defines how the <code>key</code> and <code>description</code> properties of the items are formatted.
	 *
	 * For the {@link sap.ui.mdc.FilterField FilterField} control, this enumeration defines how key and description of equal conditions are formatted.
	 *
	 * @enum {string}
	 * @since 1.48.0
	 * @alias sap.ui.mdc.enum.FieldDisplay
	 * @private
	 * @ui5-restricted sap.fe
	 * @deprecated since 1.115.0 - please see {@link sap.ui.mdc.enums.FieldDisplay}
	 */
	const FieldDisplay = {
		/**
		 * Only the value (key) is displayed
		 * @public
		 */
		Value: "Value",
		/**
		 * Only the description is displayed
		 * @public
		 */
		Description: "Description",
		/**
		 * The value (key) and the description are displayed in the field. The description is displayed after the value (key) in brackets.
		 * @public
		 */
		ValueDescription: "ValueDescription",
		/**
		 * The description and the value (key) are displayed in the field. The value (key) is displayed after the description in brackets.
		 * @public
		 */
		DescriptionValue: "DescriptionValue"
	};

	/**
	 * @deprecated As of version 1.121
	 */
	DataType.registerEnum("sap.ui.mdc.enum.FieldDisplay", FieldDisplay);

	return FieldDisplay;

}, /* bExport= */ true);