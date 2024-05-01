/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([], function() {
	"use strict";

	/**
	 * Base class for connectors.
	 *
	 * @name sap.ui.fl.interfaces.BaseLoadConnector
	 * @since 1.79
	 * @version 1.121.0
	 *
	 * @private
	 * @ui5-restricted SAP Web IDE (Visual Editor), UX Tools
	 * @interface
	 */
	var BaseConnector = /** @lends sap.ui.fl.interfaces.BaseLoadConnector */ {
		/**
		 * Interface called to get the flex data, including changes and variants.
		 *
		 * @param {object} mPropertyBag Properties needed by the connectors
		 * @param {string} mPropertyBag.flexReference Reference of the application
		 * @param {string} [mPropertyBag.url] Configured URL for the connector
		 * @param {string} [mPropertyBag.cacheKey] Key which can be used to etag / cachebuster the request
		 * @returns {Promise<Object>} Promise resolving with an object containing a flex data response
		 *
		 * @private
		 * @ui5-restricted SAP Web IDE (Visual Editor), UX Tools
		 */
		loadFlexData(/* mPropertyBag */) {
			return Promise.reject("loadFlexData is not implemented");
		},

		/**
		 * Interface called to get the flex feature.
		 *
		 * @returns {Promise<object>} Resolves with an object containing the data for the flex features
		 */
		loadFeatures() {
			return Promise.reject("loadFeatures is not implemented");
		},

		/**
		 * Get the names of variants' authors.
		 *
		 * @param {object} mPropertyBag - Property bag
		 * @param {string} mPropertyBag.reference - Flexibility reference
		 * @param {string} [mPropertyBag.url] - Configured URL for the connector
		 * @returns {Promise<object>} Resolves with a map between variant IDs and their authors' names containing the data for the flex features
		 */
		loadVariantsAuthors() {
			return Promise.reject("loadVariantsAuthors is not implemented");
		}
	};

	return BaseConnector;
});
