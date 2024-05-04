/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/rta/plugin/RenameHandler","sap/base/Log"],function(e,t,n){"use strict";var i=e.extend("sap.ui.rta.plugin.Rename",{metadata:{library:"sap.ui.rta",properties:{oldValue:"string"},associations:{},events:{editable:{},nonEditable:{}}}});i.prototype.exit=function(...n){e.prototype.exit.apply(this,n);this.setBusy(false);t._exit.call(this)};i.prototype.setDesignTime=function(e){t._setDesignTime.call(this,e)};i.prototype.startEdit=function(e){var n=this.getAction(e).domRef;var i=this.getAction(e).getTextMutators;t.startEdit.call(this,{overlay:e,domRef:n,getTextMutators:i,pluginMethodName:"plugin.Rename.startEdit"})};i.prototype.stopEdit=function(e){t._stopEdit.call(this,e,"plugin.Rename.stopEdit")};i.prototype.handler=function(e){e=this.getSelectedOverlays()||e;this.startEdit(e[0])};i.prototype.isRenameAvailable=function(e){return this._isEditableByPlugin(e)};i.prototype.isRenameEnabled=function(e){return this.isEnabled(e)};i.prototype.isEnabled=function(e){if(e.length>1){return false}var t=e[0];var n=this.getResponsibleElementOverlay(t);var i=true;if(!this.getAction(n)){i=false}var a=this.getAction(t);if(i&&typeof a.isEnabled!=="undefined"){if(typeof a.isEnabled==="function"){i=a.isEnabled(t.getElement())}else{i=a.isEnabled}}if(i){var r=t.getDesignTimeMetadata();var o=r.getAssociatedDomRef(t.getElement(),a.domRef);if(!(o&&o.get(0))){i=false}}return i};i.prototype.registerElementOverlay=function(...n){const[i]=n;i.attachEvent("editableChange",t._manageClickEvent,this);e.prototype.registerElementOverlay.apply(this,n)};i.prototype._isEditable=function(e){return this._checkChangeHandlerAndStableId(e)};i.prototype.deregisterElementOverlay=function(...n){const[i]=n;i.detachEvent("editableChange",t._manageClickEvent,this);i.detachBrowserEvent("click",t._onClick,this);e.prototype.deregisterElementOverlay.apply(this,n)};i.prototype.createRenameCommand=function(e,t){var i=this.getResponsibleElementOverlay(e);var a=i.getElement();var r=i.getDesignTimeMetadata();var o=this.getVariantManagementReference(i);return this.getCommandFactory().getCommandFor(a,"rename",{renamedElement:a,newValue:t},r,o).then(function(e){this.fireElementModified({command:e})}.bind(this)).catch(function(e){n.error("Error during rename: ",e)})};i.prototype._emitLabelChangeEvent=function(){var e=t._getCurrentEditableFieldText.call(this);this._fnSetControlText(e);return this.createRenameCommand(this._oEditedOverlay,e)};i.prototype.getMenuItems=function(e){return this._getMenuItems(e,{pluginId:"CTX_RENAME",rank:10,icon:"sap-icon://edit"})};i.prototype.getActionName=function(){return"rename"};return i});
//# sourceMappingURL=Rename.js.map