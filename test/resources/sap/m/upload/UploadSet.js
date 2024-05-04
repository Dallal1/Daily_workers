/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Element","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer","sap/m/upload/UploaderHttpRequestMethod","sap/ui/core/dnd/DragDropInfo","sap/ui/core/dnd/DropInfo","sap/m/upload/UploadSetToolbarPlaceholder","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/ui/core/Core","sap/ui/core/InvisibleText","sap/m/Menu","sap/m/MenuItem","sap/m/MenuButton","sap/ui/core/Lib"],function(e,t,i,o,s,r,a,l,n,d,p,h,u,g,m,f,_,c,I,y,T,U,D,E,b,v,S,F,L,C,P){"use strict";var A=r.UploadType;var M=r.MenuButtonMode;var x=e.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:null,deprecated:true},noDataDescription:{type:"string",defaultValue:null,deprecated:true},noDataIllustrationType:{type:"sap.m.IllustratedMessageType",group:"Appearance",defaultValue:E.NoData,deprecated:true},dragDropText:{type:"string",defaultValue:null},dragDropDescription:{type:"string",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},uploadButtonInvisible:{type:"boolean",group:"Appearance",defaultValue:false},sameFilenameAllowed:{type:"boolean",group:"Behavior",defaultValue:false},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:I.Post},multiple:{type:"boolean",group:"Behavior",defaultValue:false},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:r.ListMode.MultiSelect},cloudFilePickerEnabled:{type:"boolean",group:"Behavior",defaultValue:false},cloudFilePickerServiceUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},cloudFilePickerButtonText:{type:"string",defaultValue:""},directory:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false},illustratedMessage:{type:"sap.m.IllustratedMessage",multiple:false}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileRenamed:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"},response:{type:"string"},readyState:{type:"string"},status:{type:"string"},responseXML:{type:"string"},headers:{type:"object"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},selectionChanged:{parameters:{items:{type:"sap.m.upload.UploadSetItem[]"}}},itemDragStart:{},itemDrop:{}}},renderer:c});var B=r.UploadState;x.prototype.init=function(){this._oRb=P.getResourceBundleFor("sap.m");this._oList=null;this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._oUploadButton=null;this._oDragIndicator=false;this._initialIllustrationClone=true;this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null;this._aGroupHeadersAdded=[];this._iFileUploaderPH=null;this._oItemToUpdate=null;this._oInvisibleText=new S;this._oInvisibleText.toStatic();this._oIllustratedMessage=this.getAggregation("illustratedMessage");if(!this._oIllustratedMessage){this._oIllustratedMessage=new D({illustrationType:E.NoData,illustrationSize:b.Auto,title:this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT"),description:this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION")})}this._oIllustratedMessage.addIllustrationAriaLabelledBy(this._oInvisibleText.getId());this.setAggregation("illustratedMessage",this._oIllustratedMessage);this._oInvisibleText.setText(this._oRb.getText("UPLOAD_SET_ILLUSTRATED_MESSAGE"));this._cloudFilePickerControl=null;this._oListEventDelegate=null;this.addDependent(this._oInvisibleText)};x.prototype.exit=function(){if(this._oList){this._oList.destroy();this._oList=null}if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null}if(this._oFileUploader){this._oFileUploader.destroy();this._oFileUploader=null}if(this._oUploader){this._oUploader.destroy();this._oUploader=null}if(this._oIllustratedMessage){this._oIllustratedMessage.destroy();this._oIllustratedMessage=null}if(this._oIllustratedMessageClone){this._oIllustratedMessageClone.destroy();this._oIllustratedMessageClone=null}};x.prototype.onBeforeRendering=function(e){if(this._oListEventDelegate){this._oList.removeEventDelegate(this._oListEventDelegate);this._oListEventDelegate=null}this._aGroupHeadersAdded=[];this._clearGroupHeaders();this._fillListWithUploadSetItems(this.getItems());if(this._initialIllustrationClone){this._oIllustratedMessageClone=this.getAggregation("illustratedMessage").clone();this._initialIllustrationClone=false}};x.prototype.onAfterRendering=function(){var e;if(this._oEditedItem){e=this._oEditedItem._getFileNameEdit().$("inner");if(e){e.on("focus",function(){e.selectText(0,e.val().length)});e.trigger("focus")}if(this._oEditedItem&&this._oEditedItem.getEditState()){var t=this._oEditedItem.getListItem()?this._oEditedItem.getListItem().getDomRef():null;var i=t?t.querySelector(".sapMUSObjectMarkerContainer"):null;if(i){i.setAttribute("style","display: none")}}}this._oListEventDelegate={onclick:function(e){this._handleClick(e,this._oEditedItem)}.bind(this)};this._oList.addDelegate(this._oListEventDelegate);if(this._bItemRemoved){this._bItemRemoved=false;var o=this.getList();var s=o.getItems();if(s.length>0){s[0].focus()}else{o.getDomRef().querySelector(".sapMUCNoDataPage").focus()}}if(this.getCloudFilePickerEnabled()){this._oFileUploader.addStyleClass("sapMUSTFileUploaderVisibility")}};x.prototype._handleClick=function(e,t){var i=e.target.closest("button");var o="";if(i){o=i.id}if(o.lastIndexOf("editButton")===-1){if(o.lastIndexOf("cancelButton")!==-1){if(t){this._handleItemEditCancelation(e,t)}}else if(e.target.id.lastIndexOf("thumbnail")<0&&e.target.id.lastIndexOf("icon")<0&&e.target.id.lastIndexOf("deleteButton")<0&&e.target.id.lastIndexOf("fileNameEdit-inner")<0){if(t){this._handleItemEditConfirmation(e,t)}}}};x.prototype.onkeydown=function(e){var o,s;if(this._oEditedItem&&this._oEditedItem._getFileNameEdit().$("inner")[0]===e.target){s=this._oEditedItem}else if(e.target){o=t.getElementById(e.target.id);if(o){s=this._mListItemIdToItemMap[o.getId()]}}if(!s){return}switch(e.keyCode){case i.F2:if(s._bInEditMode){this._handleItemEditConfirmation(e,s)}else{this._handleItemEdit(e,s)}break;case i.ESCAPE:this._handleItemEditCancelation(e,s);break;case i.DELETE:if(!s.$("fileNameEdit").hasClass("sapMInputFocused")&&s.getEnabledRemove()&&s.getVisibleRemove()){this._handleItemDelete(e,s)}break;case i.ENTER:if(s===this._oEditedItem){this._handleItemEditConfirmation(e,s)}break;default:return}};x.prototype.getToolbar=function(){if(!this._oToolbar){var e=this.getCloudFilePickerEnabled()?this._getCloudFilePicker():this.getDefaultFileUploader();this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new p(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new g,e]});this._iFileUploaderPH=2;this.addDependent(this._oToolbar)}else{this._iFileUploaderPH=this._getFileUploaderPlaceHolderPosition(this._oToolbar);if(this._oToolbar&&this._iFileUploaderPH>-1){this._setFileUploaderInToolbar(e)}else if(this._oToolbar){this._oToolbar.addContent(e)}}if(this.getCloudFilePickerEnabled()){this._oToolbar.addContent(this.getDefaultFileUploader())}}return this._oToolbar};x.prototype._openFileUploaderPicker=function(){this._oFileUploader.oFileUpload.click()};x.prototype._openCloudFilePicker=function(){this._invokeCloudFilePicker()};x.prototype._itemSelectedCallback=function(e){var t=e.getParameter("item");switch(t.getText()){case this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT"):this._oMenuButton.detachEvent("defaultAction",this._openFileUploaderPicker.bind(this)).attachEvent("defaultAction",this._openCloudFilePicker.bind(this));this._openCloudFilePicker();this._oMenuButton.setText(t.getText());break;case this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT"):this._oMenuButton.detachEvent("defaultAction",this._openCloudFilePicker.bind(this)).attachEvent("defaultAction",this._openFileUploaderPicker.bind(this));this._openFileUploaderPicker();this._oMenuButton.setText(t.getText());break}};x.prototype._setListNoDataText=function(e,t){var i="";var o=this.getAggregation("illustratedMessage");if(!e){i=o.getTitle()+" "+o.getDescription()}else if(e){if(t){i=o.getTitle()+" "+e}else{i=e+" "+o.getDescription()}}return i};x.prototype.getNoDataText=function(){var e=this.getProperty("noDataText");e=e||this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT");if(this._oList){this._oList.setNoDataText(this._setListNoDataText(e))}return e};x.prototype.getNoDataDescription=function(){var e=this.getProperty("noDataDescription");e=e||this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");if(this._oList){this._oList.setNoDataText(this._setListNoDataText(e,true))}return e};x.prototype.getDragDropText=function(){var e=this.getProperty("dragDropText");e=e||this._oRb.getText("IllustratedMessage_TITLE_UploadCollection");return e};x.prototype.getDragDropDescription=function(){var e=this.getProperty("dragDropDescription");e=e||this._oRb.getText("IllustratedMessage_DESCRIPTION_UploadCollection");return e};x.prototype.setToolbar=function(e){this.setAggregation("toolbar",e);this.getToolbar();return this};x.prototype.addAggregation=function(t,i,o){e.prototype.addAggregation.call(this,t,i,o);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i);this._refreshInnerListStyle()}};x.prototype.insertAggregation=function(t,i,o,s){e.prototype.insertAggregation.call(this,t,i,o,s);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i,o||0);this._refreshInnerListStyle()}};x.prototype.removeAggregation=function(t,i,o){var s,r;e.prototype.removeAggregation.call(this,t,i,o);if(t==="items"||t==="incompleteItems"){if(typeof i==="number"){r=this.getItems();s=r[i]}else if(typeof i==="object"){if(this.getList()&&this.getList().getItems().length){s=i.isDestroyStarted()?i:i._getListItem()}}var a=this.getList().removeAggregation("items",s,o);if(a&&i){a.destroy();i.destroy()}this._refreshInnerListStyle()}};x.prototype.removeAllAggregation=function(t,i){if(t==="items"){this.getItems().forEach(function(e){if(this._oList){this._oList.removeAggregation("items",e._getListItem(),i)}}.bind(this))}else if(t==="incompleteItems"){this.getIncompleteItems().forEach(function(e){if(this._oList){this._oList.removeAggregation("items",e._getListItem(),i)}}.bind(this))}e.prototype.removeAllAggregation.call(this,t,i)};x.prototype.setFileTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this.getDefaultFileUploader().setFileType(t);this._checkRestrictions()}return this};x.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this.getDefaultFileUploader().setMaximumFilenameLength(e);this._checkRestrictions()}return this};x.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this.getDefaultFileUploader().setMaximumFileSize(e);this._checkRestrictions()}return this};x.prototype.setMediaTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this.getDefaultFileUploader().setMimeType(t);this._checkRestrictions()}return this};x.prototype.setShowIcons=function(e){if(e!==this.getShowIcons()){this._getAllItems().forEach(function(t){t._getIcon().setVisible(e)});this.setProperty("showIcons",e,false)}return this};x.prototype.setTerminationEnabled=function(e){if(e!==this.getTerminationEnabled()){this._getAllItems().forEach(function(t){if(t.getUploadState()===B.Uploading){t._getTerminateButton().setVisible(e)}});this.setProperty("terminationEnabled",e,false)}return this};x.prototype.setUploadButtonInvisible=function(e){if(e!==this.getUploadButtonInvisible()){var t=!e;this.getDefaultFileUploader().setVisible(t);if(this._oUploadButton){this._oUploadButton.setVisible(t)}this.setProperty("uploadButtonInvisible",e,true)}return this};x.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);if(this._oUploadButton){this._oUploadButton.setEnabled(e)}this.setProperty("uploadEnabled",e,false)}return this};x.prototype.setMultiple=function(e){if(this.getMultiple()!==e){this.setProperty("multiple",e);this.getDefaultFileUploader().setMultiple(e)}return this};x.prototype.setDirectory=function(e){if(this.getDirectory()!==e){this.setProperty("directory",e);this.getDefaultFileUploader().setDirectory(e);if(e){this.setProperty("multiple",false)}}return this};x.prototype.setMode=function(e){if(e===r.ListMode.Delete){this.setProperty("mode",r.ListMode.None);o.info("sap.m.ListMode.Delete is not supported by UploadSet. Value has been resetted to 'None'")}else if(e===r.ListMode.MultiSelect&&!this.getInstantUpload()){this.setProperty("mode",r.ListMode.None);o.info("sap.m.ListMode.MultiSelect is not supported by UploadSet for Pending Upload. Value has been reset to 'None'")}else{this.setProperty("mode",e)}if(this._oList){this._oList.setMode(this.getMode())}return this};x.prototype._getIllustratedMessage=function(){var e=this.getAggregation("illustratedMessage");if(e&&this._oList&&this._oList.getItems&&!this._oList.getItems().length){if(this._getDragIndicator()){e.setIllustrationType(E.UploadCollection);e.setTitle(this.getDragDropText());e.setDescription(this.getDragDropDescription());e.removeAllAdditionalContent()}else{e.setIllustrationType(this._oIllustratedMessageClone.getIllustrationType());if(this._oIllustratedMessageClone.getTitle()){e.setTitle(this._oIllustratedMessageClone.getTitle())}else{e.setTitle(this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT"))}if(this._oIllustratedMessageClone.getDescription()){e.setDescription(this._oIllustratedMessageClone.getDescription())}else{e.setDescription(this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION"))}if(this._oIllustratedMessageClone.getAdditionalContent().length){e.removeAllAdditionalContent();e.addAdditionalContent(new a(this._oIllustratedMessageClone.getAdditionalContent()[0].mProperties))}else{e.addAdditionalContent(this.getUploadButtonForIllustratedMessage())}}}return e};x.prototype.getUploadButtonForIllustratedMessage=function(){if(!this._oUploadButton){var e=this.getAggregation("illustratedMessage").getAccessibilityReferences();var t=e.title;var i=e.description;this._oUploadButton=new a({id:this.getId()+"-uploadButton",type:r.ButtonType.Standard,enabled:this.getUploadEnabled(),visible:!this.getUploadButtonInvisible(),text:this._oRb.getText("UPLOADCOLLECTION_UPLOAD"),ariaDescribedBy:[t,i],press:function(){var e=this.getDefaultFileUploader();e.$().find("input[type=file]").trigger("click")}.bind(this)})}return this._oUploadButton};x.prototype.setUploadUrl=function(e){this.setProperty("uploadUrl",e);if(this._oUploader){this._oUploader.setUploadUrl(e)}return this};x.prototype.getList=function(){if(!this._oList){this._oList=new n(this.getId()+"-list",{selectionChange:[this._handleSelectionChange,this],headerToolbar:this.getToolbar(),dragDropConfig:[new y({dropPosition:"Between",sourceAggregation:"items",targetAggregation:"items",dragStart:[this._onDragStartItem,this],drop:[this._onDropItem,this]}),new T({dropEffect:"Move",dropPosition:"OnOrBetween",dragEnter:[this._onDragEnterFile,this],drop:[this._onDropFile,this]})],mode:this.getMode(),noDataText:this._setListNoDataText()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList)}return this._oList};x.prototype._onDragStartItem=function(e){this.fireItemDragStart(e)};x.prototype._onDropItem=function(e){this.fireItemDrop(e)};x.prototype._onDragEnterFile=function(e){var t=e.getParameter("dragSession");var i=t.getDragControl();this._oDragIndicator=true;this._getIllustratedMessage();if(i){e.preventDefault()}};x.prototype._onDropFile=function(e){this._oDragIndicator=false;this._getIllustratedMessage();e.preventDefault();if(!this.getUploadEnabled()){return}var t=e.getParameter("browserEvent").dataTransfer.items;t=Array.from(t);t=t.filter(function(e){return e.webkitGetAsEntry()?true:false});var i=t.map(function(e){var t=e.webkitGetAsEntry();return{entryType:t&&t.isFile?"File":"Directory"}});if(t&&t.length>1&&!this.getMultiple()&&!this.getDirectory()){var s=this._oRb.getText("UPLOADCOLLECTION_MULTIPLE_FALSE");o.warning("Multiple files upload is retsricted for this multiple property set");d.error(s);return}else if(t&&t.length>1&&this.getMultiple()&&!n("File",i)){var r=this._oRb.getText("UPLOAD_SET_DIRECTORY_FALSE");o.warning("Multiple files upload is retsricted, drag & drop only files");d.error(r);return}if(t&&t.length&&!this.getDirectory()&&n("Directory",i)){var a=this._oRb.getText("UPLOAD_SET_DIRECTORY_FALSE");o.warning("Directory of files upload is retsricted for this directory property set");d.error(a);return}else if(t&&t.length&&this.getDirectory()&&!n("Directory",i)){var l=this._oRb.getText("UPLOAD_SET_DROP_DIRECTORY");o.warning("Directory of files upload is retsricted, drag & drop only directories here.");d.error(l);return}if(t&&t.length){this._getFilesFromDataTransferItems(t).then(function(e){if(e&&e.length){this._processNewFileObjects(e)}}.bind(this))}function n(e,t){return t.every(function(t){return t.entryType===e})}};x.prototype._getFilesFromDataTransferItems=function(e){var t=[];return new Promise(function(o,s){var r=[];for(var a=0;a<e.length;a++){r.push(i(e[a].webkitGetAsEntry()))}Promise.all(r).then(function(e){o(t)},function(e){s(e)})});function i(e){return new Promise(function(o,s){if(e.isFile){e.file(function(e){t.push(e);o(e)},function(e){s(e)})}else if(e.isDirectory){var r=e.createReader();r.readEntries(function(e){var t=[];for(var s=0;s<e.length;s++){t.push(i(e[s]))}o(Promise.all(t))})}})}};x.prototype._getDragIndicator=function(){return this._oDragIndicator};x.prototype.upload=function(){if(!this.getUploadEnabled()){o.warning("Upload is currently disabled for this upload set.");return}this.getIncompleteItems().forEach(function(e){this._uploadItemIfGoodToGo(e)}.bind(this))};x.prototype.uploadItem=function(e){this._uploadItemIfGoodToGo(e)};x.prototype.getDefaultFileUploader=function(){var e=this._oRb.getText("UPLOADCOLLECTION_UPLOAD");if(!this._oFileUploader){this._oFileUploader=new m(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:false,enabled:this.getUploadEnabled(),fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),maximumFilenameLength:this.getMaxFileNameLength(),maximumFileSize:this.getMaxFileSize(),icon:"",iconFirst:false,multiple:this.getDirectory()?false:this.getMultiple(),style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this],typeMissmatch:[this._fireFileTypeMismatch,this],fileSizeExceed:[this._fireFileSizeExceed,this],filenameLengthExceed:[this._fireFilenameLengthExceed,this],visible:!this.getUploadButtonInvisible(),directory:this.getDirectory()})}return this._oFileUploader};x.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadProgressed(this._onUploadProgressed.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this));e.attachUploadAborted(this._onUploadAborted.bind(this))};x.prototype.getSelectedItems=function(){var e=this._oList.getSelectedItems();return this._getUploadSetItemsByListItems(e)};x.prototype.getSelectedItem=function(){var e=this._oList.getSelectedItem();if(e){return this._getUploadSetItemsByListItems([e])}return null};x.prototype.setSelectedItemById=function(e,t){this._oList.setSelectedItemById(e+"-listItem",t);this._setSelectedForItems([this._getUploadSetItemById(e)],t);return this};x.prototype.setSelectedItem=function(e,t){return this.setSelectedItemById(e.getId(),t)};x.prototype.selectAll=function(){var e=this._oList.selectAll();if(e.getItems().length!==this.getItems().length){o.info("Internal 'List' and external 'UploadSet' are not in sync.")}this._setSelectedForItems(this.getItems(),true);return this};x.prototype.openFileDialog=function(e){if(this._oFileUploader){if(e){if(!this._oFileUploader.getMultiple()){this._oItemToUpdate=e;this._oFileUploader.$().find("input[type=file]").trigger("click")}else{o.warning("Version Upload cannot be used in multiple upload mode")}}else{this._oFileUploader.$().find("input[type=file]").trigger("click")}}return this};x.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");this._processNewFileObjects(t)};x.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(B.Uploading)};x.prototype._onUploadProgressed=function(e){var t=e.getParameter("item"),i=Math.round(e.getParameter("loaded")/e.getParameter("total")*100);t.setProgress(i)};x.prototype._onUploadCompleted=function(e){var t=e.getParameter("item"),i=e.getParameter("responseXHR"),o=null;if(i.responseXML){o=i.responseXML.documentElement.textContent}var s={item:t,response:i.response,responseXML:o,readyState:i.readyState,status:i.status,headers:i.headers};t.setProgress(100);if(this._oItemToUpdate&&this.getInstantUpload()){this.removeAggregation("items",this._oItemToUpdate,false)}this.insertItem(t,0);t.setUploadState(B.Complete);this._oItemToUpdate=null;this.fireUploadCompleted(s)};x.prototype._onUploadAborted=function(e){var t=e.getParameter("item");t.setUploadState(B.Error);this.fireUploadTerminated({item:t})};x.prototype._handleItemEdit=function(e,t){if(this._oEditedItem){this._oEditedItem=f._findById(this._oEditedItem.getId(),this._getAllItems());this._handleItemEditConfirmation(e,this._oEditedItem)}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:t})){this._oEditedItem=f._findById(t.getId(),this._getAllItems());this._oEditedItem._setInEditMode(true)}}};x.prototype._handleItemRestart=function(e,t){t.setUploadState(B.Ready);this._uploadItemIfGoodToGo(t)};x.prototype._handleItemEditConfirmation=function(e,t){var i=t._getFileNameEdit(),o,s,r=t.getFileName(),a=f._splitFileName(r),l=f._findById(t.getId(),this._getAllItems());if(i!==null){o=i.getValue().trim()}i.focus();if(!o||o.length===0){i.setValueStateText(this._oRb.getText("UPLOAD_SET_TYPE_FILE_NAME"));i.setProperty("valueState","Error",true);i.setShowValueStateMessage(true);return}if(a.name===o){this._removeErrorStateFromItem(this,l);t._setInEditMode(false);this.fireAfterItemEdited({item:t});this._oEditedItem=null;return}if(!this.getSameFilenameAllowed()&&f._checkDoubleFileName(o+"."+a.extension,this._getAllItems())){i.setValueStateText(this._oRb.getText("UPLOAD_SET_FILE_NAME_EXISTS"));i.setProperty("valueState","Error",true);i.setShowValueStateMessage(true)}else{s=a.extension?o+"."+a.extension:o;t.setFileName(s);this._removeErrorStateFromItem(this,l);t._setInEditMode(false);this.fireFileRenamed({item:t})}this._oEditedItem=null;this.invalidate()};x.prototype._removeErrorStateFromItem=function(e,t){t.errorState=null;e.sErrorState=null;e.editModeItem=null};x.prototype._handleItemEditCancelation=function(e,t){t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};x.prototype.handleItemGetDisabled=function(e){if(!this._oEditedItem||this._oEditedItem.getId()!==e.getId()){return}this._handleItemEditCancelation(null,e)};x.prototype._handleItemDelete=function(e,t){var i;if(this._oEditedItem){this._oEditedItem=f._findById(this._oEditedItem.getId(),this._getAllItems());this._handleItemEditConfirmation(e,this._oEditedItem);if(this._oEditedItem){return}}if(!t.fireRemovePressed({item:t})){return}if(!this.fireBeforeItemRemoved({item:t})){return}if(!t.getFileName()){i=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT")}else{i=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",t.getFileName())}this._oItemToBeDeleted=f._findById(t.getId(),this._getAllItems());d.show(i,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[d.Action.OK,d.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""})};x.prototype._handleClosedDeleteDialog=function(e){if(e!==d.Action.OK){return}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this.fireAfterItemRemoved({item:this._oItemToBeDeleted});this._oItemToBeDeleted=null;this._bItemRemoved=true};x.prototype._handleTerminateRequest=function(e,t){var i=new n({items:[new h({title:t.getFileName(),icon:t._getIcon().getSrc()})]}),o=new l({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new u({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),i],buttons:[new a({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),type:r.ButtonType.Emphasized,press:[s,this]}),new a({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){o.close()}})],afterClose:function(){o.destroy()}});o.open();function s(){if(t.getUploadState()===B.Uploading){if(this.fireBeforeUploadTermination({item:t})){this._handleUploadTermination(t)}}else if(t.getUploadState()===B.Complete){this.removeItem(t)}o.close();this.invalidate()}};x.prototype._handleUploadTermination=function(e){this._getActiveUploader().terminateItem(e)};x.prototype._handleSelectionChange=function(e){var t=e.getParameter("listItems"),i=[];t.forEach(function(e){i.push(this._mListItemIdToItemMap[e.getId()])}.bind(this));this.fireSelectionChanged({items:i})};x.prototype._onDragEnterSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDropIndicator")}};x.prototype._onDragLeaveSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator")}};x.prototype._onDragOverSet=function(e){e.preventDefault()};x.prototype._onDropOnSet=function(e){var t;e.preventDefault();if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");t=e.originalEvent.dataTransfer.files;this._processNewFileObjects(t)}};x.prototype._onDragEnterBody=function(e){if(this.getUploadEnabled()){this._oLastEnteredTarget=e.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};x.prototype._onDragLeaveBody=function(e){if(this._oLastEnteredTarget===e.target&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};x.prototype._onDragOverBody=function(e){e.preventDefault();if(this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};x.prototype._onDropOnBody=function(e){if(this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};x.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems())};x.prototype._refreshInnerListStyle=function(){var e=this.getList().length-1;this._oList.getItems().forEach(function(t,i){t.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(i===0&&e===0){t.addStyleClass("sapMUCListSingleItem")}else if(i===0){t.addStyleClass("sapMUCListFirstItem")}else if(i===e){t.addStyleClass("sapMUCListLastItem")}else{t.addStyleClass("sapMUCListItem")}})};x.prototype._processNewFileObjects=function(e){var t=[],i;for(var o=0;o<e.length;o++){t.push(e[o])}t.forEach(function(e){i=new f({uploadState:B.Ready});i._setFileObject(e);i.setFileName(e.name);if(!this.fireBeforeItemAdded({item:i})){return}this.insertIncompleteItem(i);this.fireAfterItemAdded({item:i});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(i)}}.bind(this))};x.prototype._projectToNewListItem=function(e,t){var i=e._getListItem();this._mListItemIdToItemMap[i.getId()]=e;if(e.sParentAggregationName==="items"){this._mapGroupForItem(e)}if(t===0){this.getList().insertAggregation("items",i,t,true)}else{this.getList().addAggregation("items",i,true)}e.attachEvent("selected",this._handleItemSetSelected,this);this._checkRestrictionsForItem(e)};x.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new _({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};x.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};x.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===B.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){var t=e.getHeaderFields().length?e.getHeaderFields():this.getHeaderFields();this._getActiveUploader().uploadItem(e,t)}}};x.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{dragenter:this._onDragEnterBody.bind(this),dragleave:this._onDragLeaveBody.bind(this),dragover:this._onDragOverBody.bind(this),drop:this._onDropOnBody.bind(this)},set:{dragenter:this._onDragEnterSet.bind(this),dragleave:this._onDragLeaveSet.bind(this),dragover:this._onDragOverSet.bind(this),drop:this._onDropOnSet.bind(this)}}}return this._oDragDropHandlers};x.prototype._checkRestrictions=function(){this.getIncompleteItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this))};x.prototype._checkRestrictionsForItem=function(e){e._checkTypeRestriction(this.getFileTypes());e._checkNameLengthRestriction(this.getMaxFileNameLength());e._checkSizeRestriction(this.getMaxFileSize());e._checkMediaTypeRestriction(this.getMediaTypes())};x.prototype._fireFileTypeMismatch=function(e){var t=this.getMediaTypes();var i=this.getFileTypes();var o=e.getParameter("fileType");var s=e.getParameter("mimeType");var r=!!t&&t.length>0&&!!s&&t.indexOf(s)===-1;var a=!!i&&i.length>0&&!!o&&i.indexOf(o)===-1;var l=[new Blob([])];var n={type:e.getParameter("fileType"),webkitRelativePath:"",name:e.getParameter("fileName")};var d=new File(l,e.getParameter("fileName"),n);var p=new f;p._setFileObject(d);p.setFileName(d.name);if(r){this.fireMediaTypeMismatch({item:p})}else if(a){this.fireFileTypeMismatch({item:p})}};x.prototype._fireFileSizeExceed=function(e){var t=new f;t.setFileName(e.getParameter("fileName"));this.fireFileSizeExceeded({item:t})};x.prototype._fireFilenameLengthExceed=function(e){var t=new f;t.setFileName(e.getParameter("fileName"));this.fireFileNameLengthExceeded({item:t})};x.prototype._setSelectedForItems=function(e,t){if(this.getMode()!==r.ListMode.MultiSelect&&t){var i=this.getItems();for(var o=0;o<i.length;o++){i[o].setSelected(false)}}for(var s=0;s<e.length;s++){e[s].setSelected(t)}};x.prototype._getUploadSetItemById=function(e){var t=this.getItems();for(var i=0;i<t.length;i++){if(t[i].getId()===e){return t[i]}}return null};x.prototype._getUploadSetItemsByListItems=function(e){var t=[];var i=this.getItems();if(e){for(var o=0;o<e.length;o++){for(var s=0;s<i.length;s++){if(e[o].getId()===i[s].getId()+"-listItem"){t.push(i[s]);break}}}return t}return null};x.prototype._clearGroupHeaders=function(){this.getList().getItems().forEach(function(e){if(e.isGroupHeader()){e.destroy(false)}})};x.prototype._mapGroupForItem=function(e){var t=this.getBinding("items"),i=this.getBindingInfo("items")?this.getBindingInfo("items").model:undefined,o=this.getBindingInfo("items")?this.getBindingInfo("items").groupHeaderFactory:null;var s=function(e){return e.getBindingContext(i)?t.getGroup(e.getBindingContext(i)):null};var r=function(e){return s(e)&&s(e).key};if(t&&t.isGrouped()&&e){if(!this._aGroupHeadersAdded.some(function(t){return t===r(e)})){if(o){this.getList().addItemGroup(s(e),o(s(e)),true)}else if(s(e)){this.getList().addItemGroup(s(e),null,true)}this._aGroupHeadersAdded.push(r(e))}}};x.prototype._fillListWithUploadSetItems=function(e){var t=this;e.forEach(function(e,i){e._reset();if(e&&!e.getVisibleEdit()&&(t._oEditedItem&&t._oEditedItem.getId()===e.getId())){e._setInEditMode(false)}t._projectToNewListItem(e,true);t._refreshInnerListStyle()})};x.prototype._getFileUploaderPlaceHolderPosition=function(e){for(var t=0;t<e.getContent().length;t++){if(e.getContent()[t]instanceof U){return t}}return-1};x.prototype._setFileUploaderInToolbar=function(e){this._oToolbar.getContent()[this._iFileUploaderPH].setVisible(false);this._oToolbar.insertContent(e,this._iFileUploaderPH)};x.prototype._getCloudFilePicker=function(){if(this.getCloudFilePickerEnabled()){this._oMenuButton=new C({text:this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT"),buttonMode:M.Split,menu:this._getMenuButtonItems(),defaultAction:this._openFileUploaderPicker.bind(this)});return this._oMenuButton}return null};x.prototype._getMenuButtonItems=function(){return new F({items:[new L({text:this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT")}),new L({text:this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT")})],itemSelected:this._itemSelectedCallback.bind(this)})};x.prototype._invokeCloudFilePicker=function(){var e=null;if(this._cloudFilePickerControl){e=this._getCloudFilePickerInstance();e.open()}else{this._loadCloudFilePickerDependency().then(function(t){this._cloudFilePickerControl=t;e=this._getCloudFilePickerInstance();e.open()}.bind(this)).catch(function(e){o.error(e)})}return e};x.prototype._onCloudPickerFileChange=function(e){var t=e.getParameters();var i=[];if(t&&t.selectedFiles){t.selectedFiles.forEach(function(e){i.push(this._createFileFromCloudPickerFile(e))}.bind(this))}this._processNewCloudPickerFileObjects(i)};x.prototype._createFileFromCloudPickerFile=function(e){var t=[new Blob([])];var i={type:e.getFileShareItemContentType(),size:e.getFileShareItemContentSize(),webkitRelativePath:"",name:e.getFileShareItemName()};var o=new File(t,e.getFileShareItemName(),i);return{file:o,fileShareProperties:e.mProperties}};x.prototype._mapFileShareItemToUploadSetItem=function(e,t){e.setFileName(t.fileShareItemName);e.setUrl(t.fileShareItemContentLink)};x.prototype._processNewCloudPickerFileObjects=function(e){var t;e.forEach(function(e){var i=e.file,o=e.fileShareProperties;t=new f({uploadState:B.Ready});t._setUploadType(A.Cloud);if(o&&o!==null){this._mapFileShareItemToUploadSetItem(t,o)}t._setFileObject(i);t.setFileName(i.name);if(!this.fireBeforeItemAdded({item:t})){return}this.insertIncompleteItem(t);this.fireAfterItemAdded({item:t});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(t)}}.bind(this))};x.prototype._loadCloudFilePickerDependency=function(){return new Promise(function(e,t){v.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(){sap.ui.require(["sap/suite/ui/commons/CloudFilePicker"],function(t){e(t)},function(e){t(e)})}).catch(function(){t("CloudFilePicker Control not available.")})})};x.prototype._getCloudFilePickerInstance=function(){return new this._cloudFilePickerControl({serviceUrl:this.getCloudFilePickerServiceUrl(),confirmButtonText:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),title:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),fileNameMandatory:true,enableDuplicateCheck:this.getSameFilenameAllowed(),select:this._onCloudPickerFileChange.bind(this)})};x.prototype.ondragleave=function(e){var t=e.dragSession;if(!t||!t.getDropControl()||t&&!e.relatedTarget){this._oDragIndicator=false;this._getIllustratedMessage()}};x.prototype._handleItemSetSelected=function(e){var t=e.getSource();if(t instanceof f){var i=this._getListItemById(t.getId()+"-listItem");if(i){i.setSelected(t.getSelected())}}};x.prototype._getListItemById=function(e){const t=this.getList()?.getItems();if(t&&t.length&&e){return t.find(t=>t?.getId()===e)}return null};return x});
//# sourceMappingURL=UploadSet.js.map