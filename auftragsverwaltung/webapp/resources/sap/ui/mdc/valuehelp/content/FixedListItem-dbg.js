/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.core.ListItem.
sap.ui.define([
	'sap/ui/core/ListItem'
], (
	ListItem) => {
	"use strict";

	/**
	 * Constructor for a new FixedListItem.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * An item that is used in the {@link sap.ui.mdc.valuehelp.content.FixedList FixedList}.
	 *
	 * @extends sap.ui.core.ListItem
	 *
	 * @author SAP SE
	 * @version 1.121.0
	 *
	 * @public
	 * @since 1.114.0
	 * @alias sap.ui.mdc.valuehelp.content.FixedListItem
	 */
	const FixedListItem = ListItem.extend("sap.ui.mdc.valuehelp.content.FixedListItem", /** @lends sap.ui.mdc.valuehelp.content.FixedListItem.prototype */ {
		metadata: {

			library: "sap.ui.mdc",
			properties: {

				/**
				 * Key of the group for what the items are grouped
				 */
				groupKey: {
					type: "any",
					group: "Appearance",
					defaultValue: null
				},

				/**
				 * Text of the group for what the items are grouped
				 */
				groupText: {
					type: "string",
					group: "Appearance",
					defaultValue: null
				}
			}
		}
	});


	return FixedListItem;

});