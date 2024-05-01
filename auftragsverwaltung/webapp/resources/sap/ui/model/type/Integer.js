/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/isEmptyObject","sap/ui/core/Lib","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/SimpleType","sap/ui/model/ValidateException"],function(t,e,o,a,r,i,n,s){"use strict";var u=n.extend("sap.ui.model.type.Integer",{constructor:function(){n.apply(this,arguments);this.sName="Integer"}});u.prototype.formatValue=function(t,e){var o=t;if(t==undefined||t==null){return null}if(this.oInputFormat){o=this.oInputFormat.parse(t);if(o==null){throw new r("Cannot format float: "+t+" has the wrong format")}}switch(this.getPrimitiveType(e)){case"string":return this.oOutputFormat.format(o);case"int":case"float":case"any":return o;default:throw new r("Don't know how to format Integer to "+e)}};u.prototype.parseValue=function(t,e){var a,r;switch(this.getPrimitiveType(e)){case"string":a=this.oOutputFormat.parse(String(t));if(isNaN(a)){r=o.getResourceBundleFor("sap.ui.core");throw new i(r.getText("EnterInt"))}break;case"float":a=Math.floor(t);if(a!=t){r=o.getResourceBundleFor("sap.ui.core");throw new i(r.getText("EnterInt"))}break;case"int":a=t;break;default:throw new i("Don't know how to parse Integer from "+e)}if(this.oInputFormat){a=this.oInputFormat.format(a)}return a};u.prototype.validateValue=function(e){if(this.oConstraints){var a=o.getResourceBundleFor("sap.ui.core"),r=[],i=[],n=e,u=this;if(this.oInputFormat){n=this.oInputFormat.parse(e)}t(this.oConstraints,function(t,e){switch(t){case"minimum":if(n<e){r.push("minimum");i.push(a.getText("Integer.Minimum",[u.oOutputFormat.format(e)]))}break;case"maximum":if(n>e){r.push("maximum");i.push(a.getText("Integer.Maximum",[u.oOutputFormat.format(e)]))}break;default:break}});if(r.length>0){throw new s(this.combineMessages(i),r)}}};u.prototype.setFormatOptions=function(t){this.oFormatOptions=t;this._createFormats()};u.prototype._handleLocalizationChange=function(){this._createFormats()};u.prototype._createFormats=function(){var t=this.oFormatOptions.source;this.oOutputFormat=a.getIntegerInstance(this.oFormatOptions);if(t){if(e(t)){t={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."}}this.oInputFormat=a.getIntegerInstance(t)}};return u});
//# sourceMappingURL=Integer.js.map