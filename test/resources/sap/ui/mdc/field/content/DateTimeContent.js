/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/mdc/field/content/DateContent","sap/ui/mdc/enums/OperatorName","sap/ui/mdc/util/DateUtil","sap/base/util/merge"],(e,t,a,n,i)=>{"use strict";const o=Object.assign({},t,{getEditOperator:function(){return{[a.EQ]:{name:"sap/m/DateTimePicker",create:this._createDatePickerControl}}},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.DateTimeContent - createEditMultiLine not defined!")},_createDatePickerControl:function(e,a,i){const o=t._createDatePickerControl.apply(this,arguments);const r=e.getDateOriginalType()||e.getDataType();if(n.showTimezone(r)){const t=e.getUnitConditionsType();o[0].bindProperty("timezone",{path:"$field>/conditions",type:t,targetType:"sap.ui.mdc.raw:1"});o[0].setShowTimezone(true)}return o},_adjustDataTypeForDate:function(e){const a=e.retrieveDataType();let o=a.getFormatOptions();if(n.showTimezone(a)){this._getDatePattern(e,o);e.setDateOriginalType(e.getDataType());e.setDataType(n.createInternalType(a,e.getValueFormat()));e.updateConditionType();o=i({},o);delete o.pattern;o.showDate=false;o.showTime=false;o.showTimezone=true;const t=a.getConstraints();const r=a.getMetadata().getClass();e.setUnitType(new r(o,t))}else{t._adjustDataTypeForDate.apply(this,arguments)}}});return o});
//# sourceMappingURL=DateTimeContent.js.map