sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	'sap/ui/core/date/UI5Date'
],
function (Controller, JSONModel, MessageBox, UI5Date) {
	"use strict";

	return Controller.extend("sap.m.sample.PlanningCalendarMinMax.Page", {

		onInit: function () {
			//dark mode
			sap.ui.getCore().applyTheme("sap_horizon_dark");
			// create model
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
			this.getView().setModel(oModel);
		},

		handleAppointmentSelect: function (oEvent) {
			var oAppointment = oEvent.getParameter("appointment");
			if (oAppointment) {
				var sSelected = oAppointment.getSelected() ? "selected" : "deselected";
				MessageBox.show("'" + oAppointment.getTitle() + "' " + sSelected + ". \n Selected appointments: " + this.byId("PC1").getSelectedAppointments().length);
			} else {
				var aAppointments = oEvent.getParameter("appointments");
				var sValue = aAppointments.length + " Appointments selected";
				MessageBox.show(sValue);
			}
		}

	});

});