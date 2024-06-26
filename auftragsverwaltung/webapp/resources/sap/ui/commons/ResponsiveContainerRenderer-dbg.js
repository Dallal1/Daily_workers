/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.commons.ResponsiveContainer
sap.ui.define([],
	function() {
	"use strict";


	/**
	 * RatingIndicatorRenderer.
	 * @namespace
	 */
	var ResponsiveContainerRenderer = function() {
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRM The RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oContainer An object representation of the control that should be rendered
	 */
	ResponsiveContainerRenderer.render = function(oRM, oContainer) {
		var oContent = oContainer.getAggregation("content");
		oRM.write("<div ");
		oRM.writeControlData(oContainer);
		oRM.addStyle("width", oContainer.getWidth());
		oRM.addStyle("height", oContainer.getHeight());
		oRM.writeStyles();
		oRM.write(">");
		if (oContent) {
			oRM.renderControl(oContent);
		}
		// Render divs for each range into an invisible area to get the actual pixel width
		// for arbitrary CSS sizes (em, ex, rem, etc...)
		oRM.write("<div ");
		oRM.addStyle("width", "0px");
		oRM.addStyle("height", "0px");
		oRM.addStyle("overflow", "hidden");
		oRM.writeStyles();
		oRM.write(">");
		oContainer.getRanges().forEach(function(oRange) {
			oRM.write("<div ");
			oRM.writeElementData(oRange);
			oRM.addStyle("width", oRange.getWidth());
			oRM.addStyle("height", oRange.getHeight());
			oRM.writeStyles();
			oRM.write("></div>");
		});
		oRM.write("</div>");
		oRM.write("</div>");
	};

	return ResponsiveContainerRenderer;

}, /* bExport= */ true);
