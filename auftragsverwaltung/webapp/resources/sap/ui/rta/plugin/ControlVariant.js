/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Lib","sap/ui/rta/plugin/Plugin","sap/ui/rta/plugin/RenameHandler","sap/ui/rta/Utils","sap/ui/dt/ElementOverlay","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/ui/dt/Util","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/ui/fl/variants/VariantManagement","sap/ui/fl/write/api/ContextSharingAPI","sap/ui/base/ManagedObject","sap/base/Log","sap/m/MessageBox"],function(t,e,a,n,i,r,o,s,l,g,u,c,d,m,h,p,f){"use strict";r.prototype._variantManagement=undefined;r.prototype.getVariantManagement=function(){return this._variantManagement};r.prototype.setVariantManagement=function(t){this._variantManagement=t};r.prototype.hasVariantManagement=function(){return!!this._variantManagement};function v(t){var e=t.getElement().getManageDialog();if(e&&!e.bIsDestroyed){e.destroy()}}var V=a.extend("sap.ui.rta.plugin.ControlVariant",{metadata:{library:"sap.ui.rta",properties:{oldValue:"string"},associations:{},events:{}}});function C(t){var e=t.getElement();var a=t.getDesignTimeMetadata();var n=this._getVariantModel(e);var i=t.getVariantManagement();return this.getCommandFactory().getCommandFor(e,"save",{model:n},a,i)}function E(t,e,a,n){var i=t.getElement();var r=t.getDesignTimeMetadata();return this.getCommandFactory().getCommandFor(i,"switch",{targetVariantReference:e,sourceVariantReference:a,discardVariantContent:n},r)}V.prototype.registerElementOverlay=function(...e){const[i]=e;var r=i.getElement();var s;a.prototype.registerElementOverlay.apply(this,e);if(r instanceof d){var l=r.getFor();var u;var c=g.getAppComponentForControl(r);var m=r.getId();s=c.getLocalId(m)||m;i.setVariantManagement(s);if(!l||Array.isArray(l)&&l.length===0){return}u=!Array.isArray(l)?[l]:l;u.forEach(function(e){var a=e instanceof h?e:t.getElementById(e);var n=o.getOverlay(a);this._propagateVariantManagement(n,s)}.bind(this));i.attachEvent("editableChange",n._manageClickEvent,this);v(i)}else if(!i.getVariantManagement()){s=this._getVariantManagementFromParent(i);if(s){i.setVariantManagement(s);i.attachEvent("editableChange",n._manageClickEvent,this)}}};V.prototype._isPersonalizationMode=function(){return this.getCommandFactory().getFlexSettings().layer===u.USER};V.prototype._propagateVariantManagement=function(t,e){var a=[];t.setVariantManagement(e);a=s.getAllChildOverlays(t);a.forEach(function(t){a=a.concat(this._propagateVariantManagement(t,e))}.bind(this));return a};V.prototype._getVariantManagementFromParent=function(t){var e=t.getVariantManagement();if(!e&&t.getParentElementOverlay()){return this._getVariantManagementFromParent(t.getParentElementOverlay())}return e};V.prototype.deregisterElementOverlay=function(...t){const e=t[0];if(this._isVariantManagementControl(e)){v(e)}e.detachEvent("editableChange",n._manageClickEvent,this);e.detachBrowserEvent("click",n._onClick,this);this.removeFromPluginsList(e);a.prototype.deregisterElementOverlay.apply(this,t)};V.prototype._getVariantModel=function(t){var e=g.getAppComponentForControl(t);return e?e.getModel(c.getVariantModelName()):undefined};V.prototype._isEditable=function(t){if(this._isPersonalizationMode()){return false}return this._isVariantManagementControl(t)&&this.hasStableId(t)};V.prototype._isVariantManagementControl=function(t){var e=t.getElement();var a=e.getAssociation("for");return!!(a&&e instanceof d)};V.prototype.isVariantSwitchAvailable=function(t){return this._isVariantManagementControl(t)};V.prototype.isVariantSwitchEnabled=function(t){var e=t[0];var a=[];if(this._isVariantManagementControl(e)){var n=e.getElement();var i=e.getVariantManagement?e.getVariantManagement():undefined;if(!i){return false}var r=this._getVariantModel(n);if(r){a=r.getData()[i].variants.reduce(function(t,e){if(e.visible){return t.concat(e)}return t},[])}var o=a.length>1;return o}return false};V.prototype.setDesignTime=function(t){n._setDesignTime.call(this,t)};V.prototype.isRenameAvailable=function(t){return this._isVariantManagementControl(t)};V.prototype.isRenameEnabled=function(t){return this._isVariantManagementControl(t[0])};V.prototype.isVariantSaveAvailable=function(t){return this._isVariantManagementControl(t)};V.prototype.isVariantSaveEnabled=function(t){var e=t[0];var a=e.getElement();var n=this._getVariantModel(a);var i=e.getVariantManagement();return n.oData[i]&&n.oData[i].modified};V.prototype.isVariantSaveAsAvailable=function(t){return this._isVariantManagementControl(t)};V.prototype.isVariantSaveAsEnabled=function(t){return this._isVariantManagementControl(t[0])};V.prototype.isVariantConfigureAvailable=function(t){return this._isVariantManagementControl(t)};V.prototype.isVariantConfigureEnabled=function(t){return this._isVariantManagementControl(t[0])};V.prototype.switchVariant=function(t,a,n){var r=t.getElement();var o=e.getResourceBundleFor("sap.ui.rta");function s(e){if(e===f.Action.CANCEL){return}if(e===o.getText("BTN_MODIFIED_VARIANT_SAVE")){var i;this.getCommandFactory().getCommandFor(r,"composite").then(function(e){i=e;return C.call(this,t)}.bind(this)).then(function(e){i.addCommand(e);return E.call(this,t,a,n)}.bind(this)).then(function(t){i.addCommand(t);this.fireElementModified({command:i})}.bind(this))}if(e===o.getText("BTN_MODIFIED_VARIANT_DISCARD")){E.call(this,t,a,n,true).then(function(t){this.fireElementModified({command:t})}.bind(this))}}if(r.getModified()){f.warning(o.getText("MSG_CHANGE_MODIFIED_VARIANT"),{onClose:s.bind(this),actions:[o.getText("BTN_MODIFIED_VARIANT_SAVE"),o.getText("BTN_MODIFIED_VARIANT_DISCARD"),f.Action.CANCEL],emphasizedAction:o.getText("BTN_MODIFIED_VARIANT_SAVE"),styleClass:i.getRtaStyleClassName(),id:"controlVariantWarningDialog"})}else{E.call(this,t,a,n).then(function(t){this.fireElementModified({command:t})}.bind(this)).catch(function(t){throw l.createError("ControlVariant#switchVariant",t,"sap.ui.rta")})}};V.prototype.renameVariant=function(t){this.startEdit(t[0])};V.prototype.startEdit=function(t){var e=t.getDesignTimeMetadata().getData().variantRenameDomRef;n.startEdit.call(this,{overlay:t,domRef:e,pluginMethodName:"plugin.ControlVariant.startEdit"})};V.prototype.stopEdit=function(t){n._stopEdit.call(this,t,"plugin.ControlVariant.stopEdit")};V.prototype.createSaveCommand=function(t){var e=t[0];return C.call(this,e).then(function(t){this.fireElementModified({command:t})}.bind(this))};V.prototype.createSaveAsCommand=function(t){var e=t[0];var a=e.getElement();var n=e.getDesignTimeMetadata();var i=this._getVariantModel(a);var r=e.getVariantManagement();var o=i.getCurrentVariantReference(r);return this.getCommandFactory().getCommandFor(a,"saveAs",{sourceVariantReference:o,model:i},n,r).then(function(t){this.fireElementModified({command:t})}.bind(this))};V.prototype._emitLabelChangeEvent=function(){var t=n._getCurrentEditableFieldText.call(this);var e=this._oEditedOverlay;var a=e.getDesignTimeMetadata();var i=e.getElement();var r=e.getVariantManagement();return this._createSetTitleCommand({text:t,element:i,designTimeMetadata:a,variantManagementReference:r}).then(function(t){this.fireElementModified({command:t})}.bind(this))};V.prototype._createSetTitleCommand=function(t){this._oEditableControlDomRef.textContent=t.text;return this.getCommandFactory().getCommandFor(t.element,"setTitle",{newText:t.text},t.designTimeMetadata,t.variantManagementReference).catch(function(t){p.error("Error during rename: ",t)})};V.prototype._prepareOverlayForValueState=function(t,e){t.getValueState=function(){return"Error"};t.getValueStateText=function(){return e};t.getDomRefForValueStateMessage=function(){return this.$()}};V.prototype.configureVariants=function(t){var e=t[0];var a=e.getElement();var n=e.getVariantManagement();var r=this._getVariantModel(a);var o=e.getDesignTimeMetadata();var s=this.getCommandFactory().getFlexSettings();var g=s;g.variantManagementControl=a;return r.manageVariants(a,n,s.layer,i.getRtaStyleClassName(),m.createComponent(g)).then(function(t){if(t.length>0){return this.getCommandFactory().getCommandFor(a,"configure",{control:a,changes:t},o,n)}return undefined}.bind(this)).then(function(t){if(t){this.fireElementModified({command:t})}}.bind(this)).catch(function(t){throw l.createError("ControlVariant#configureVariants",t,"sap.ui.rta")})};V.prototype.getMenuItems=function(t){var a=t[0];var n=[];if(this.isRenameAvailable(a)){n.push({id:"CTX_VARIANT_SET_TITLE",text:e.getResourceBundleFor("sap.ui.rta").getText("CTX_RENAME"),handler:this.renameVariant.bind(this),enabled:this.isRenameEnabled.bind(this),rank:210,icon:"sap-icon://edit"})}if(this.isVariantSaveAvailable(a)){n.push({id:"CTX_VARIANT_SAVE",text:e.getResourceBundleFor("sap.ui.rta").getText("CTX_VARIANT_SAVE"),handler:this.createSaveCommand.bind(this),enabled:this.isVariantSaveEnabled.bind(this),rank:220,icon:"sap-icon://save"})}if(this.isVariantSaveAsAvailable(a)){n.push({id:"CTX_VARIANT_SAVEAS",text:e.getResourceBundleFor("sap.ui.rta").getText("CTX_VARIANT_SAVEAS"),handler:this.createSaveAsCommand.bind(this),enabled:this.isVariantSaveAsEnabled.bind(this),rank:225,icon:"sap-icon://duplicate"})}if(this.isVariantConfigureAvailable(a)){n.push({id:"CTX_VARIANT_MANAGE",text:e.getResourceBundleFor("sap.ui.rta").getText("CTX_VARIANT_MANAGE"),handler:this.configureVariants.bind(this),enabled:this.isVariantConfigureEnabled.bind(this),startSection:true,rank:230,icon:"sap-icon://action-settings"})}if(this.isVariantSwitchAvailable(a)){var i=this._getVariantModel(a.getElement());var r=a.getVariantManagement();var o=i.getData()[r].variants.reduce(function(t,e){if(e.visible){var a=i.getData()[r].currentVariant===e.key;var n={id:e.key,text:e.title,icon:a?"sap-icon://accept":"blank",enabled:!a};return t.concat(n)}return t},[]);n.push({id:"CTX_VARIANT_SWITCH_SUBMENU",text:e.getResourceBundleFor("sap.ui.rta").getText("CTX_VARIANT_SWITCH"),handler:function(t,e){var a=e.eventItem.getParameters().item.getProperty("key");var n=t[0];var o=i.getData()[r].currentVariant;return this.switchVariant(n,a,o)}.bind(this),enabled:this.isVariantSwitchEnabled.bind(this),submenu:o,rank:240,icon:"sap-icon://switch-views"})}return n};V.prototype.getActionName=function(){return"controlVariant"};return V});
//# sourceMappingURL=ControlVariant.js.map