/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/model/BindingMode","sap/ui/model/ParseException","sap/ui/model/ValidateException"],(e,t,n,i)=>{"use strict";const r=Object.assign({},e,{getDisplayMultiValue:function(){return[null]},getDisplayMultiLine:function(){return[null]},getEdit:function(){return["sap/m/SearchField"]},getEditMultiValue:function(){return[null]},getEditMultiLine:function(){return[null]},getEditForHelp:function(){return[null]},getUseDefaultEnterHandler:function(){return false},getUseDefaultValueHelp:function(){return false},createEdit:function(e,r,a){const l=r[0];const o=e.getConditionsType();e.setHideOperator(true);e.updateConditionType();const u=new l(a,{value:{path:"$field>/conditions",type:o,mode:t.OneWay},placeholder:"{$field>/placeholder}",width:"100%",tooltip:"{$field>/tooltip}",search:function(t){if(t.getParameters().clearButtonPressed||t.getParameters().escPressed){return}e.getHandleEnter().call(this,t)},change:function(t){const r=t.getSource();const a=t.getParameter("value");const l=r.getBinding("value");try{l.setExternalValue(a);const e={element:r,property:"value",type:l.getType(),newValue:a,oldValue:""};r.fireValidationSuccess(e,false,true)}catch(e){const t={element:r,property:"value",type:l.getType(),newValue:a,oldValue:"",exception:e,message:e.message};if(e instanceof n){r.fireParseError(t,false,true)}else if(e instanceof i){r.fireValidationError(t,false,true)}else{throw e}}e.getHandleContentChange().call(this,t)},liveChange:e.getHandleContentLiveChange()});e.setAriaLabelledBy(u);return[u]},createEditMultiValue:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiValue not defined!")},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiLine not defined!")},createDisplayMultiValue:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createDisplayMultiValue not defined!")},createDisplayMultiLine:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createDisplayMultiLine not defined!")},createEditForHelp:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditForHelp not defined!")}});return r});
//# sourceMappingURL=SearchContent.js.map