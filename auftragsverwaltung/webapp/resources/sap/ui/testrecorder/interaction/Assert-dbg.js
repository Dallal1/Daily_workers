/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/test/_ControlFinder",
	"sap/ui/testrecorder/CommunicationBus",
	"sap/ui/testrecorder/CommunicationChannels",
	"sap/ui/testrecorder/interaction/Commands"
], function (_ControlFinder, CommunicationBus, CommunicationChannels, Commands) {
	"use strict";

	return {
		execute: function (mData) {
			// rootElementId - the element to highlight in both app and tree
			// interactionElementId - the element for interaction idSuffix
			var sRootDomElementId = _ControlFinder._getIdentifiedDOMElementId("#" + mData.domElementId);
			CommunicationBus.publish(CommunicationChannels.SELECT_CONTROL_IN_TREE, {
				rootElementId: sRootDomElementId,
				interactionElementId: mData.domElementId,
				action: Commands.ASSERT,
				assertion: mData.assertion
			});
		}
	};
});
