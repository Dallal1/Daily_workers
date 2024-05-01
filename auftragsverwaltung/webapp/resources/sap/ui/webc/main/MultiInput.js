/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/webc/WebComponent","./library","sap/ui/core/EnabledPropagator","sap/ui/base/ManagedObjectObserver","sap/ui/core/library","./thirdparty/features/InputElementsFormSupport","./thirdparty/features/InputSuggestions","./thirdparty/MultiInput"],function(e,t,a,r,i){"use strict";var n=i.ValueState;var o=t.InputType;var p=e.extend("sap.ui.webc.main.MultiInput",{metadata:{library:"sap.ui.webc.main",tag:"ui5-multi-input-ui5",interfaces:["sap.ui.core.IFormContent","sap.ui.core.ISemanticFormContent"],properties:{accessibleName:{type:"string"},enabled:{type:"boolean",defaultValue:true,mapping:{type:"property",to:"disabled",formatter:"_mapEnabled"}},maxlength:{type:"int"},name:{type:"string",defaultValue:""},noTypeahead:{type:"boolean",defaultValue:false},placeholder:{type:"string",defaultValue:""},readonly:{type:"boolean",defaultValue:false},required:{type:"boolean",defaultValue:false},showClearIcon:{type:"boolean",defaultValue:false},showSuggestions:{type:"boolean",defaultValue:false},showValueHelpIcon:{type:"boolean",defaultValue:false},type:{type:"sap.ui.webc.main.InputType",defaultValue:o.Text},value:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:n.None},valueStateMessage:{type:"string",defaultValue:"",mapping:{type:"slot",to:"div"}},width:{type:"sap.ui.core.CSSSize",mapping:"style"},_semanticFormValue:{type:"string",defaultValue:"",visibility:"hidden"}},defaultAggregation:"suggestionItems",aggregations:{icon:{type:"sap.ui.webc.main.IIcon",multiple:true,slot:"icon"},suggestionItems:{type:"sap.ui.webc.main.IInputSuggestionItem",multiple:true},tokens:{type:"sap.ui.webc.main.IToken",multiple:true,slot:"tokens"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,mapping:{type:"property",to:"accessibleNameRef",formatter:"_getAriaLabelledByForRendering"}}},events:{change:{parameters:{}},input:{parameters:{}},suggestionItemPreview:{parameters:{item:{type:"HTMLElement"},targetRef:{type:"HTMLElement"}}},suggestionItemSelect:{parameters:{item:{type:"HTMLElement"}}},tokenDelete:{parameters:{token:{type:"HTMLElement"}}},valueHelpTrigger:{parameters:{}}},methods:["openPicker"],getters:["previewItem"],designtime:"sap/ui/webc/main/designtime/MultiInput.designtime"}});a.call(p.prototype);p.prototype.init=function(){this._oTokenizerObserver=new r(function(e){this.updateFormValueProperty()}.bind(this));this._oTokenizerObserver.observe(this,{aggregations:["tokens"]})};p.prototype.getFormFormattedValue=function(){return this.getTokens().map(function(e){return e.getText()}).join(", ")};p.prototype.getFormValueProperty=function(){return"_semanticFormValue"};p.prototype.updateFormValueProperty=function(){this.setProperty("_semanticFormValue",this.getFormFormattedValue(),true)};return p});
//# sourceMappingURL=MultiInput.js.map