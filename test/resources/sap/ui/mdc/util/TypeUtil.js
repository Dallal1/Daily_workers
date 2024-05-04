/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/enums/BaseType","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/base/util/merge","sap/ui/model/SimpleType","sap/ui/mdc/util/DateUtil"],(e,t,a,n,s,r)=>{"use strict";const i="yyyy-MM-dd";const o="HH:mm:ss";const u={getDataTypeClassName:function(e){const t={Boolean:"sap.ui.model.type.Boolean",Currency:"sap.ui.model.type.Currency",Date:"sap.ui.model.type.Date",DateTime:"sap.ui.model.type.DateTime",Float:"sap.ui.model.type.Float",Integer:"sap.ui.model.type.Integer",String:"sap.ui.model.type.String",Time:"sap.ui.model.type.Time",Unit:"sap.ui.model.type.Unit"};if(t[e]){e=t[e]}return e},getBaseType:function(t,a,n){switch(t){case"sap.ui.model.type.Date":return e.Date;case"sap.ui.model.type.DateTime":return e.DateTime;case"sap.ui.model.type.Time":return e.Time;case"sap.ui.model.type.Boolean":return e.Boolean;case"sap.ui.model.type.Unit":case"sap.ui.model.type.Currency":if(!a||(!a.hasOwnProperty("showMeasure")||a.showMeasure)&&(!a.hasOwnProperty("showNumber")||a.showNumber)){return e.Unit}else if(!a.hasOwnProperty("showNumber")||a.showNumber){return e.Numeric}else{return e.String}case"sap.ui.model.type.Integer":case"sap.ui.model.type.Float":return e.Numeric;default:return e.String}},getBaseTypeForType:function(e){return this.getBaseType(e.getMetadata&&e.getMetadata().getName(),e.getFormatOptions(),e.getConstraints())},getDataTypeClass:function(e){const a=this.getDataTypeClassName(e);const n=a?sap.ui.require(a.replace(/\./g,"/"))||t.get(a):undefined;if(!n){throw new Error("DataType '"+e+"' cannot be determined")}return n},getDataTypeInstance:function(e,t,a){const n=this.getDataTypeClass(e);return new n(t,a)},getTypeConfig:function(e,t,a){const n=this._normalizeType(e,t,a);return{className:n.getMetadata().getName(),typeInstance:n,baseType:this.getBaseTypeForType(n)}},internalizeValue:function(t,a,n,s){const u=this._normalizeType(a,n,s);const p=this.getBaseTypeForType(u);switch(p){case e.DateTime:return r.ISOToType(t,u,p);case e.Date:if(t.indexOf("T")>=0){t=t.substr(0,t.indexOf("T"))}return r.stringToType(t,u,i);case e.Time:return r.stringToType(t,u,o);case e.Boolean:return t;case e.Numeric:return t;default:return u.parseValue(t,"string")}},externalizeValue:function(t,a,n,s){const u=this._normalizeType(a,n,s);const p=this.getBaseTypeForType(u);switch(p){case e.DateTime:return r.typeToISO(t,u,p);case e.Date:return r.typeToString(t,u,i);case e.Time:return r.typeToString(t,u,o);case e.Boolean:return t;case e.Numeric:return t;default:return u.formatValue(t,"string")}},_normalizeType:function(e,t,a){if(e instanceof s){return e}return this.getDataTypeInstance(e,t,a)},getUnitTypeInstance:function(e,t,s){const r=e.getMetadata().getClass();const i=n({},e.getFormatOptions());const o=a(e.getConstraints())?undefined:n({},e.getConstraints());this._adjustUnitFormatOptions(i,t,s);return new r(i,o)},_adjustUnitFormatOptions:function(e,t,a){e.showNumber=t;e.showMeasure=a;e.strictParsing=true},initializeTypeFromValue:function(e,t){return{}},initializeInternalType:function(e,t){}};return u});
//# sourceMappingURL=TypeUtil.js.map