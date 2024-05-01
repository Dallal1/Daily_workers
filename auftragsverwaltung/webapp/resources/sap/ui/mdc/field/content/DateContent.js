/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/mdc/enums/BaseType","sap/ui/mdc/enums/OperatorValueType","sap/ui/mdc/enums/OperatorName","sap/ui/mdc/util/DateUtil","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/core/library","sap/ui/model/Filter"],(e,t,a,n,i,r,o,l)=>{"use strict";const{CalendarType:s}=o;let d;let p;const c=Object.assign({},e,{getEditMultiLine:function(){return[null]},getEdit:function(){return["sap/m/DynamicDateRange","sap/ui/mdc/condition/OperatorDynamicDateOption","sap/ui/mdc/field/DynamicDateRangeConditionsType","sap/m/library","sap/m/DynamicDateFormat"]},getEditOperator:function(){return{[n.EQ]:{name:"sap/m/DatePicker",create:this._createDatePickerControl},[n.BT]:{name:"sap/m/DateRangeSelection",create:this._createDateRangePickerControl}}},getEditForHelp:function(){return e.getEdit.apply(this,arguments)},getUseDefaultValueHelp:function(){return{name:"defineConditions",oneOperatorSingle:false,oneOperatorMulti:true,single:false,multi:true}},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.DateContent - createEditMultiLine not defined!")},_createDatePickerControl:function(e,t,a){const n=t[0];const i=e.getConditionsType();e.setHideOperator(true);this._adjustDataTypeForDate(e);const r=new n(a,{value:{path:"$field>/conditions",type:i},displayFormat:e.getDisplayFormat(),valueFormat:e.getValueFormat(),placeholder:"{$field>/placeholder}",textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",width:"100%",tooltip:"{$field>/tooltip}",liveChange:e.getHandleContentLiveChange(),change:e.getHandleContentChange()});if(r.setDisplayFormatType){r.setDisplayFormatType(e.getCalendarType())}if(r.setSecondaryCalendarType){r.setSecondaryCalendarType(e.getSecondaryCalendarType())}r._setPreferUserInteraction(true);e.setAriaLabelledBy(r);return[r]},_createDateRangePickerControl:function(e,t,a){const n=t[0];const i=e.getConditionsType();this._adjustDataTypeForDate(e);const r=new n(a,{value:{path:"$field>/conditions",type:i},displayFormat:e.getDisplayFormat(),valueFormat:e.getValueFormat(),delimiter:"...",displayFormatType:e.getCalendarType(),secondaryCalendarType:e.getSecondaryCalendarType(),placeholder:"{$field>/placeholder}",textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",width:"100%",tooltip:"{$field>/tooltip}",liveChange:e.getHandleContentLiveChange(),change:e.getHandleContentChange()});r._setPreferUserInteraction(true);e.setAriaLabelledBy(r);return[r]},_adjustDataTypeForDate:function(e){const t=e.retrieveDataType();const a=t.getFormatOptions();this._getDatePattern(e,a);if(!a||a.style||!a.pattern||a.pattern!==e.getValueFormat()||!a.calendarType||a.calendarType!==s.Gregorian){e.setDateOriginalType(e.getDataType());e.setDataType(i.createInternalType(t,e.getValueFormat()));e.updateConditionType()}},_getDatePattern:function(e,a){const n=e.getField().getBaseType();switch(n){case t.Date:e.setValueFormat("yyyy-MM-dd");break;case t.DateTime:e.setValueFormat("yyyy-MM-dd'T'HH:mm:ss");break;case t.Time:e.setValueFormat("HH:mm:ss");break;default:return}e.setDisplayFormat("medium");if(a){if(a.style){e.setDisplayFormat(a.style)}else if(a.pattern){e.setDisplayFormat(a.pattern)}if(a.calendarType){e.setCalendarType(a.calendarType)}if(a.secondaryCalendarType){e.setSecondaryCalendarType(a.secondaryCalendarType)}}},createEdit:function(e,t,a){const n=t[0];const i=t[1];const r=t[2];const o=t[3];if(!d||!p){d=o.StandardDynamicDateRangeKeys;p=t[4]}const s=e.getConditionsType(false,r);const c=function(t){return this._getDateRangeStandardOptions(t,e)}.bind(this);const u=new l({path:"/",test:function(t){const a=e.getField().getBaseType();return!this._getDateRangeStandardOption(t,a)}.bind(this)});const y=function(t,n){const r=e.getField().getBaseType();const o=n.getObject();return this._createOperatorDynamicDateOption(o,e,i,r,a)}.bind(this);const g=new n(a,{value:{path:"$field>/conditions",type:s},formatter:this._getDateRangeFormatter(e),placeholder:"{$field>/placeholder}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:e.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",width:"100%",tooltip:"{$field>/tooltip}",standardOptions:{path:"$field>/_operators",formatter:c},customOptions:{path:"$field>/_operators",filters:u,factory:y},change:e.getHandleContentChange()});e.setAriaLabelledBy(n);return[g]},createEditForHelp:function(t,a,n){if(t.getDataType()&&t.getDataType().isA("sap.ui.model.CompositeType")){t.setIsMeasure(true)}return e.createEdit.apply(this,arguments)},_getDateRangeStandardOptions:function(e,t){if(!e||e.length===0){e=t.getField().getSupportedOperators()}const a=[];const n=t.getField().getBaseType();for(const t of e){const e=this._getDateRangeStandardOption(t,n);if(e){a.push(e)}}return a},_getDateRangeStandardOption:function(e,t){const a=r.getOperator(e);return r.getDynamicDateOptionForOperator(a,d,t)},_createOperatorDynamicDateOption:function(e,t,n,i,o){const l=r.getOperator(e);let s;if(l){const e=r.getCustomDynamicDateOptionForOperator(l,i);const d=t.retrieveDataType();const p=[];for(let e=0;e<l.valueTypes.length;e++){if(l.valueTypes[e]&&l.valueTypes[e]!==a.Static){p.push("custom")}}s=new n(o+"--"+e,{key:e,operator:l,type:d,baseType:i,valueTypes:p})}return s},_getDateRangeFormatter:function(e){const a=e.retrieveDataType();const n=e.getField().getBaseType();const i=a.getFormatOptions();const r={};const o={};if(i.style){r.style=i.style}else if(i.pattern){r.pattern=i.pattern}if(n===t.DateTime){o.datetime=r}o.date=r;return p.getInstance(o)}});return c});
//# sourceMappingURL=DateContent.js.map