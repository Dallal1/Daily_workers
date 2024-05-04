/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseFilter","sap/m/ComboBox","sap/ui/core/ListItem","sap/ui/model/json/JSONModel","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/ComboBoxHelper","sap/base/util/merge"],function(e,t,i,o,a,l,n){"use strict";const s=e.extend("sap.ui.integration.cards.filters.ComboBoxFilter",{metadata:{library:"sap.ui.integration",aggregations:{_comboBox:{type:"sap.m.ComboBox",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2}});s.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy()}};s.prototype.getField=function(){return this._getComboBox()};s.prototype.onDataChanged=function(){const e=this._getComboBox();l.setValueAndKey(e,e.getSelectedKey(),e.getValue());this._syncValue()};s.prototype.getValueForModel=function(){const e=this._getComboBox().getSelectedItem();if(e){return{value:this._getComboBox().getValue(),selectedItem:{title:e.getText(),key:e.getKey(),additionalText:e.getAdditionalText()}}}return{value:this._getComboBox().getValue()}};s.prototype.setValueFromOutside=function(e){const t=a.resolveValue(e,this.getCardInstance());l.setValueAndKey(this._getComboBox(),t?.selectedKey,t?.value);this._syncValue()};s.prototype.getStaticConfiguration=function(){const e=this.getConfig();let t="/";let i=[];let o;if(e.item&&e.item.path){t=e.item.path}const l=this.getModel().getProperty(t);if(e.item&&e.item.template){o=e.item.template;i=l.map(function(e,i){const l=t==="/"?t+i:t+"/"+i;return a.resolveValue(o,this,l)}.bind(this))}else{i=l}i=i.map(e=>({key:e.key&&e.key.toString(),title:e.title&&e.title.toString(),additionalText:e.additionalText&&e.additionalText.toString()}));const s=n({},e);delete s.item;s.items=i;const r=this.getValueForModel();s.value=r.value;s.selectedKey=r.selectedItem?.key;return s};s.prototype._getComboBox=function(){let e=this.getAggregation("_comboBox");if(!e){e=this._createComboBox();this.setAggregation("_comboBox",e)}return e};s.prototype._createComboBox=function(){const e=this.getConfig();const n=new t({placeholder:e.placeholder,showSecondaryValues:true,filterSecondaryValues:true});let s,r,m,u="/";n.attachChange(e=>{this._syncValue()});if(e&&e.item){u=e.item.path||u}if(e&&e.item&&e.item.template){s=e.item.template.key;r=e.item.template.title;m=e.item.template.additionalText}const d=this.getCardInstance();if(e&&e.items){s="{key}";r="{title}";m="{additionalText}";const t=new o(e.items);t.setSizeLimit(d.getModelSizeLimit());this.setModel(t)}this._oItemTemplate=new i({key:s,text:r,additionalText:m});n.bindItems({path:u,template:this._oItemTemplate});l.setValueAndKey(n,a.resolveValue(e.selectedKey,d),a.resolveValue(e.value,d));const p=this.createLabel(e);if(p){n.addAriaLabelledBy(p)}return n};return s});
//# sourceMappingURL=ComboBoxFilter.js.map