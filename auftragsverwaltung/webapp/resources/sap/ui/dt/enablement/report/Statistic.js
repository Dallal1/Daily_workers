/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/model/json/JSONModel","sap/ui/layout/form/SimpleForm","sap/m/Label","sap/m/Text","./StatisticRenderer"],function(t,e,o,r,i,s){"use strict";var a=t.extend("sap.ui.dt.enablement.report.Statistic",{metadata:{library:"sap.ui.dt",properties:{data:{type:"object"}},aggregations:{_form:{type:"sap.ui.layout.form.SimpleForm",hidden:true,multiple:false}}},init(){this._oModel=null;this.setAggregation("_form",this._createForm())},exit(){this.setData(null)},setData(t){if(this._oModel){this._oModel.destroy();delete this._oModel}if(t){this._oModel=new e(t);this._getForm().setModel(this._oModel)}else{this._getForm().setModel(null)}this.setProperty("data",t)},_createForm(){var t=new o(`${this.getId()}--form`,{editable:false,layout:"ResponsiveGridLayout",title:"Statistics",content:[new r(`${this.getId()}--form-supported-label`,{text:"Supported"}),new i(`${this.getId()}--form-supported-value`,{text:"{/statistic/SUPPORTED}"}),new r(`${this.getId()}--form-partial-supported-label`,{text:"Partial Supported"}),new i(`${this.getId()}--form-partial-supported-value`,{text:"{/statistic/PARTIAL_SUPPORTED}"}),new r(`${this.getId()}--form-not-supported-label`,{text:"Not Supported"}),new i(`${this.getId()}--form-not-supported-value`,{text:"{/statistic/NOT_SUPPORTED}"}),new r(`${this.getId()}--form-unknown-label`,{text:"Unknown"}),new i(`${this.getId()}--form-unknown-value`,{text:"{/statistic/UNKNOWN}"}),new r(`${this.getId()}--form-error-label`,{text:"Error"}),new i(`${this.getId()}--form-error-value`,{text:"{/statistic/ERROR}"})]});return t},_getForm(){return this.getAggregation("_form")},renderer:s});return a});
//# sourceMappingURL=Statistic.js.map