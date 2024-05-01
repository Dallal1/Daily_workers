/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/extend","sap/ui/base/ManagedObject","sap/ui/test/actions/Action","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,r,i,jQuery){"use strict";var n=r.extend("sap.ui.test.actions.EnterText",{metadata:{properties:{text:{type:"string"},clearTextFirst:{type:"boolean",defaultValue:true},keepFocus:{type:"boolean",defaultValue:false},pressEnterKey:{type:"boolean",defaultValue:false}},publicMethods:["executeOn"]},constructor:function(t){if(t&&t.text){t.text=e.escapeSettingsValue(t.text)}r.prototype.constructor.call(this,t)},init:function(){r.prototype.init.apply(this,arguments);this.controlAdapters=t(this.controlAdapters,n.controlAdapters)},executeOn:function(t){var e=this.$(t),r=e[0];if(!r){return}if(this.getText()===undefined||!this.getClearTextFirst()&&!this.getText()){this.oLogger.error("Please provide a text for this EnterText action");return}if(r.readOnly){this.oLogger.debug("Cannot enter text in control "+t+": control is not editable!");return}if(r.disabled){this.oLogger.debug("Cannot enter text in control "+t+": control is not enabled!");return}var n=this.getUtils();this.oLogger.timestamp("opa.actions.enterText");this.oLogger.debug("Enter text in control "+t);this._tryOrSimulateFocusin(e,t);if(this.getClearTextFirst()){n.triggerKeydown(r,i.DELETE);n.triggerKeyup(r,i.DELETE);e.val("");n.triggerEvent("input",r);if(typeof r.selectionStart==="number"){r.selectionStart=0;r.selectionEnd=0}}var s=e.val();if(e[0].selectionStart!==e[0].selectionEnd&&e[0].selectionStart!==s.length){s=s.slice(0,e[0].selectionStart);e[0].setSelectionRange(e[0].selectionStart,e[0].selectionStart)}var o=this.getClearTextFirst()?"":s;var a=r.selectionStart;this.getText().split("").forEach(function(e){if(a===0||typeof a!=="number"){o+=e}else{var i=o.slice(0,a);var s=o.slice(a);o=i+e+s}this.triggerCharacterInput(r,e,o,t);n.triggerEvent("input",r)},this);if(this.getPressEnterKey()){n.triggerKeydown(r,i.ENTER);n.triggerKeyup(r,i.ENTER);n.triggerEvent("input",r);n.triggerEvent("search",r)}else if(!this.getKeepFocus()){this._simulateFocusout(r);n.triggerEvent("search",r)}},triggerCharacterInput:function(t,e,r,i){i.addEventDelegate({onkeypress:function(t){if(!t.isDefaultPrevented()){n()}i.removeEventDelegate(this)}});function n(){if(typeof t=="string"){t=t?document.getElementById(t):null}var i=jQuery(t);if(typeof r!=="undefined"){i.val(r)}else{i.val(i.val()+e)}}this.getUtils().triggerKeypress(t,e)}});n.controlAdapters={};n.controlAdapters["sap.m.StepInput"]="input-inner";return n});
//# sourceMappingURL=EnterText.js.map