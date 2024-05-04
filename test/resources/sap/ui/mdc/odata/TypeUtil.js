/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/util/TypeUtil","sap/ui/mdc/enums/BaseType"],(e,t)=>{"use strict";const a=Object.assign({},e,{getPrimitiveType:function(e){const t={"Edm.Binary":"boolean","Edm.Boolean":"boolean","Edm.Byte":"boolean","Edm.Date":"date","Edm.DateTimeOffset":"dateTime","Edm.Decimal":"int","Edm.Double":"boolean","Edm.Duration":"float","Edm.Guid":"string","Edm.Int16":"int","Edm.Int32":"int","Edm.Int64":"int","Edm.SByte":"boolean","Edm.Single":"float","Edm.String":"string","Edm.TimeOfDay":"time"};return t[e]||"object"},getDataTypeClassName:function(t){const a={"Edm.Boolean":"sap.ui.model.odata.type.Boolean","Edm.Byte":"sap.ui.model.odata.type.Byte","Edm.DateTime":"sap.ui.model.odata.type.DateTime","Edm.DateTimeOffset":"sap.ui.model.odata.type.DateTimeOffset","Edm.Decimal":"sap.ui.model.odata.type.Decimal","Edm.Double":"sap.ui.model.odata.type.Double","Edm.Float":"sap.ui.model.odata.type.Single","Edm.Guid":"sap.ui.model.odata.type.Guid","Edm.Int16":"sap.ui.model.odata.type.Int16","Edm.Int32":"sap.ui.model.odata.type.Int32","Edm.Int64":"sap.ui.model.odata.type.Int64","Edm.SByte":"sap.ui.model.odata.type.SByte","Edm.Single":"sap.ui.model.odata.type.Single","Edm.String":"sap.ui.model.odata.type.String","Edm.Time":"sap.ui.model.odata.type.Time"};if(a[t]){t=a[t]}else if(t&&t.startsWith("Edm.")){throw new Error("Invalid data type "+t)}else{t=e.getDataTypeClassName.call(this,t)}return t},getBaseType:function(a,i,o){switch(a){case"sap.ui.model.odata.type.DateTime":if(o&&o.displayFormat==="Date"){return t.Date}else{return t.DateTime}case"sap.ui.model.odata.type.DateTimeOffset":case"sap.ui.model.odata.type.DateTimeWithTimezone":return t.DateTime;case"sap.ui.model.odata.type.Time":return t.Time;case"sap.ui.model.odata.type.Boolean":return t.Boolean;case"sap.ui.model.odata.type.Byte":case"sap.ui.model.odata.type.SByte":case"sap.ui.model.odata.type.Decimal":case"sap.ui.model.odata.type.Int16":case"sap.ui.model.odata.type.Int32":case"sap.ui.model.odata.type.Int64":case"sap.ui.model.odata.type.Single":case"sap.ui.model.odata.type.Double":return t.Numeric;default:return e.getBaseType.call(this,a,i,o)}},internalizeValue:function(a,i,o,d){const n=this._normalizeType(i,o,d);if(this.getBaseTypeForType(n)===t.Numeric){if(typeof a!=="string"&&(n.getMetadata().getName()==="sap.ui.model.odata.type.Int64"||n.getMetadata().getName()==="sap.ui.model.odata.type.Decimal")){return a.toString()}}return e.internalizeValue.call(this,a,i,o,d)},externalizeValue:function(a,i,o,d){const n=this._normalizeType(i,o,d);if(this.getBaseTypeForType(n)===t.Numeric){if(typeof a!=="string"&&(n.getMetadata().getName()==="sap.ui.model.odata.type.Int64"||n.getMetadata().getName()==="sap.ui.model.odata.type.Decimal")){return a.toString()}}return e.externalizeValue.call(this,a,i,o,d)},initializeTypeFromValue:function(e,a){if(e&&this.getBaseType(e.getMetadata().getName())===t.Unit&&Array.isArray(a)&&a.length>2){if(a[2]!==undefined){const t={mCustomUnits:a[2]};this.initializeInternalType(e,t);return t}}else{return{}}return null},initializeInternalType:function(e,t){if(t&&t.mCustomUnits!==undefined){e.formatValue([null,null,t.mCustomUnits],"string")}}});return a});
//# sourceMappingURL=TypeUtil.js.map