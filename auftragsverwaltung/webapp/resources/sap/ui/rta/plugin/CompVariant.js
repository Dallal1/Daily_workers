/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/MessageBox","sap/base/util/restricted/_omit","sap/base/util/isEmptyObject","sap/ui/core/Lib","sap/ui/dt/OverlayRegistry","sap/ui/dt/Util","sap/ui/rta/plugin/Plugin","sap/ui/rta/plugin/RenameHandler","sap/ui/rta/Utils","sap/ui/fl/write/api/ContextSharingAPI"],function(t,e,a,n,i,r,o,s,c,l){"use strict";var d=o.extend("sap.ui.rta.plugin.CompVariant",{metadata:{library:"sap.ui.rta",properties:{oldValue:{type:"string"}}}});function g(t){return t.getMetadata().getName()==="sap.ui.comp.smartvariants.SmartVariantManagement"}function u(t,e,a,n){var i=t.getDesignTimeMetadata();var o=n||t.getElement();return Promise.resolve().then(function(){if(e.length===1){return this.getCommandFactory().getCommandFor(o,e[0],a,i)}var t;return this.getCommandFactory().getCommandFor(o,"composite").then(function(n){t=n;var r=[];e.forEach(function(t){r.push(this.getCommandFactory().getCommandFor(o,t,a[t],i))}.bind(this));return Promise.all(r).then(function(e){e.forEach(t.addCommand.bind(t));return t})}.bind(this))}.bind(this)).then(function(t){this.fireElementModified({command:t})}.bind(this)).catch(function(t){throw r.createError(e[0],t,"sap.ui.rta.plugin.CompVariant")})}function p(t){return t.getElement().getAllVariants()}function m(t){this.startEdit(t[0])}d.prototype.setDesignTime=function(t){s._setDesignTime.call(this,t)};d.prototype.isRenameAvailable=function(t){const e=t.getElement();if(g(e)){const a=p(t);const n=a.find(function(t){return t.getVariantId()===e.getPresentVariantId()});const i=this.getCommandFactory().getFlexSettings().layer;return n.isRenameEnabled(i)}return false};d.prototype.isRenameEnabled=function(t){return this.isRenameAvailable(t[0])};d.prototype.startEdit=function(t){var e=t.getDesignTimeMetadata().getData().variantRenameDomRef;s.startEdit.call(this,{overlay:t,domRef:e,pluginMethodName:"plugin.CompVariant.startEdit"})};d.prototype.stopEdit=function(t){s._stopEdit.call(this,t,"plugin.CompVariant.stopEdit")};d.prototype._emitLabelChangeEvent=function(){var t=this._oEditedOverlay;var e=t.getElement().getPresentVariantId();var a=s._getCurrentEditableFieldText.call(this);var n={newVariantProperties:{}};n.newVariantProperties[e]={name:a};u.call(this,t,["compVariantUpdate"],n)};function h(t){var n=t[0].getElement();var i=this.getCommandFactory().getFlexSettings();i.variantManagementControl=n;var r={layer:this.getCommandFactory().getFlexSettings().layer,contextSharingComponentContainer:l.createComponent(i),rtaStyleClass:c.getRtaStyleClassName()};n.openManageViewsDialogForKeyUser(r,function(i){if(!a(i)){u.call(this,t[0],["compVariantUpdate"],{newVariantProperties:e(i,["default"]),newDefaultVariantId:i.default,oldDefaultVariantId:n.getDefaultVariantId()})}}.bind(this))}function f(e,a,i){if(i===t.Action.CANCEL){return}var r=n.getResourceBundleFor("sap.ui.rta");var o=e.getElement();var s;if(i===r.getText("BTN_MODIFIED_VARIANT_SAVE")){C(o).then(function(t){s={compVariantSwitch:{targetVariantId:a,sourceVariantId:o.getPresentVariantId()},compVariantUpdate:t};u.call(this,e,["compVariantUpdate","compVariantSwitch"],s)}.bind(this))}if(i===r.getText("BTN_MODIFIED_VARIANT_DISCARD")){u.call(this,e,["compVariantSwitch"],{targetVariantId:a,sourceVariantId:o.getPresentVariantId(),discardVariantContent:true})}}function V(t){return p(t[0]).length>1}function A(e,a){var i=e[0];var r=i.getElement();if(r.getModified()){var o=n.getResourceBundleFor("sap.ui.rta");var s=a.eventItem.getParameters().item.getProperty("key");t.warning(o.getText("MSG_CHANGE_MODIFIED_VARIANT"),{onClose:f.bind(this,i,s),actions:[o.getText("BTN_MODIFIED_VARIANT_SAVE"),o.getText("BTN_MODIFIED_VARIANT_DISCARD"),t.Action.CANCEL],emphasizedAction:o.getText("BTN_MODIFIED_VARIANT_SAVE"),styleClass:c.getRtaStyleClassName(),id:"compVariantWarningDialog"})}else{u.call(this,i,["compVariantSwitch"],{targetVariantId:a.eventItem.getParameters().item.getProperty("key"),sourceVariantId:r.getPresentVariantId()})}}function C(t){return t.getPresentVariantContent().then(function(e){var a={onlySave:true,newVariantProperties:{}};a.newVariantProperties[t.getPresentVariantId()]={content:e};return a})}function v(t){var e=t[0].getElement();C(e).then(function(e){u.call(this,t[0],["compVariantUpdate"],e)}.bind(this))}function E(t){return t[0].getElement().currentVariantGetModified()}function I(t,e){var a=t[0].getElement();var n=this.getCommandFactory().getFlexSettings();n.variantManagementControl=a;var i=l.createComponent(n);return new Promise(function(n){a.openSaveAsDialogForKeyUser(c.getRtaStyleClassName(),function(i){if(i){u.call(this,t[0],["compVariantSaveAs"],{newVariantProperties:{default:i.default,executeOnSelection:i.executeOnSelection,content:i.content,type:i.type,text:i.text,contexts:i.contexts},previousDirtyFlag:a.getModified(),previousVariantId:a.getPresentVariantId(),previousDefault:a.getDefaultVariantId(),activateAfterUndo:!!e})}n(i)}.bind(this),i)}.bind(this))}function T(t,e,a){var r=n.getResourceBundleFor("sap.ui.rta");if(a===r.getText("BTN_CREATE_NEW_VIEW")){I.call(this,[i.getOverlay(t)],true).then(function(a){if(!a){t.activateVariant(e)}})}else{t.activateVariant(e)}}function _(e){var a=n.getResourceBundleFor("sap.ui.rta");var i=e[0];var r=i.getElement();var o=this.getAction(i);var s=r.getVariantManagement();var l=s.getModified();return o.handler(r,{styleClass:c.getRtaStyleClassName()}).then(function(e){if(e&&e.length){var n=e[0].changeSpecificData.content.persistencyKey;var r=s.getAllVariants();var o=r.find(function(t){return t.getVariantId()===s.getPresentVariantId()});if(o.isEditEnabled(this.getCommandFactory().getFlexSettings().layer)){u.call(this,i,["compVariantContent"],{variantId:e[0].changeSpecificData.content.key,newContent:e[0].changeSpecificData.content.content,persistencyKey:n,isModifiedBefore:l},s)}else{t.warning(a.getText("MSG_CHANGE_READONLY_VARIANT"),{onClose:T.bind(this,s,o.getVariantId()),actions:[a.getText("BTN_CREATE_NEW_VIEW"),t.Action.CANCEL],emphasizedAction:a.getText("BTN_CREATE_NEW_VIEW"),styleClass:c.getRtaStyleClassName()})}}}.bind(this))}d.prototype._isEditable=function(t){return this.hasStableId(t)&&!!this.getAction(t)};d.prototype.getMenuItems=function(t){var e=t[0];var a=e.getElement();var i=[];if(this.isAvailable([e])){if(this.getAction(e).changeType==="variantContent"){i.push({id:"CTX_COMP_VARIANT_CONTENT",text:this.getActionText(e,this.getAction(e)),handler:_.bind(this),enabled:true,rank:250,icon:"sap-icon://key-user-settings"})}else{var r=this.getCommandFactory().getFlexSettings().layer;var o=n.getResourceBundleFor("sap.ui.rta");var s=p(e);var c=s.find(function(t){return t.getVariantId()===a.getPresentVariantId()});if(c.isRenameEnabled(r)){i.push({id:"CTX_COMP_VARIANT_RENAME",text:o.getText("CTX_RENAME"),handler:m.bind(this),enabled:true,rank:210,icon:"sap-icon://edit"})}if(c.isEditEnabled(r)){i.push({id:"CTX_COMP_VARIANT_SAVE",text:o.getText("CTX_VARIANT_SAVE"),handler:v.bind(this),enabled:E,rank:220,icon:"sap-icon://save"})}i.push({id:"CTX_COMP_VARIANT_SAVE_AS",text:o.getText("CTX_VARIANT_SAVEAS"),handler:I.bind(this),enabled:true,rank:230,icon:"sap-icon://duplicate"});i.push({id:"CTX_COMP_VARIANT_MANAGE",text:o.getText("CTX_VARIANT_MANAGE"),handler:h.bind(this),enabled:true,rank:240,icon:"sap-icon://action-settings"});var l=s.map(function(t){var e=a.getPresentVariantId()===t.getVariantId();var n={id:t.getVariantId(),text:t.getText("variantName"),icon:e?"sap-icon://accept":"blank",enabled:!e};return n});i.push({id:"CTX_COMP_VARIANT_SWITCH",text:o.getText("CTX_VARIANT_SWITCH"),handler:A.bind(this),enabled:V,submenu:l,rank:250,icon:"sap-icon://switch-views"})}}return i};d.prototype.getActionName=function(){return"compVariant"};return d});
//# sourceMappingURL=CompVariant.js.map