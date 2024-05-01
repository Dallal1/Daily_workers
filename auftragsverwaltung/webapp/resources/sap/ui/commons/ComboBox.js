/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./TextField","./library","sap/ui/Device","sap/ui/core/Popup","./ComboBoxRenderer","sap/ui/core/library","./ListBox","sap/ui/base/Event","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/events/jquery/EventExtension","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/selectText","jquery.sap.strings"],function(jQuery,e,t,i,s,o,n,a,d,r,h,l){"use strict";var p=n.AccessibleRole;var g=e.extend("sap.ui.commons.ComboBox",{metadata:{interfaces:["sap.ui.commons.ToolbarItem"],library:"sap.ui.commons",deprecated:true,properties:{maxPopupItems:{type:"int",group:"Behavior",defaultValue:10},displaySecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},selectedKey:{type:"string",group:"Data",defaultValue:null},selectedItemId:{type:"string",group:"Data",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.ListItem",multiple:true,singularName:"item",bindable:"bindable"},myListBox:{type:"sap.ui.commons.ListBox",multiple:false,visibility:"hidden"}},associations:{listBox:{type:"sap.ui.commons.ListBox",multiple:false}}}});g.prototype.init=function(){e.prototype.init.apply(this,arguments);this._iClosedUpDownIdx=-1;this._sCloseId=null;this.setAccessibleRole(p.Combobox);if(!i.system.desktop){this.mobile=true}};g.prototype.exit=function(){if(this._oListBox){if(this._oListBoxDelegate){this._oListBox.removeDelegate(this._oListBoxDelegate)}if(this.getAggregation("myListBox")){this.destroyAggregation("myListBox",true)}else{this._oListBox.destroy()}this._oListBox=null}else if(this.getListBox()){var e=sap.ui.getCore().byId(this.getListBox());if(e){e.detachEvent("itemsChanged",this._handleItemsChanged,this);e.detachEvent("itemInvalidated",this._handleItemInvalidated,this)}}this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;if(this._sHandleItemsChanged){clearTimeout(this._sHandleItemsChanged);this._sHandleItemsChanged=null;this._bNoItemCheck=undefined}};g.prototype.onclick=function(e){if(this.getEnabled&&this.getEnabled()&&this.getEditable()&&e.target===this.getF4ButtonDomRef()){if(this.oPopup&&this.oPopup.isOpen()){this._close()}else if(!this._F4ForClose){this._open()}this.focus()}this._F4ForClose=false};g.prototype.onmousedown=function(e){var t=this.getF4ButtonDomRef();if(e.target!==t||!this.getEnabled()||!this.getEditable()){if(this.oPopup&&this.oPopup.isOpen()){e.stopPropagation()}return}else if(e.target==t&&jQuery(this.getFocusDomRef()).data("sap.INItem")){e.stopPropagation();this.focus()}if(this.oPopup&&this.oPopup.isOpen()){this._F4ForClose=true}else{this._F4ForOpen=true}};g.prototype.onsapshow=function(e){if(this.mobile){return}if(this.oPopup&&this.oPopup.isOpen()){this._close()}else{this._open()}e.preventDefault();e.stopImmediatePropagation()};g.prototype.onsapnextmodifiers=function(t){e.prototype.onsapnextmodifiers.apply(this,arguments);if(t.keyCode==h.ARROW_DOWN&&t.altKey){this.onsapshow(t);t.stopPropagation()}};g.prototype.onsaphide=function(e){if(this.mobile){return}this._close();e.stopPropagation()};g.prototype.onsapescape=function(t){if(this.oPopup&&this.oPopup.isOpen()){this._close();t.stopPropagation()}e.prototype.onsapescape.apply(this,arguments);var i=this.getSelectedItemId();if(i){var s=sap.ui.getCore().byId(i);this._iClosedUpDownIdx=this.indexOfItem(s);var o=this._getListBox();o.setSelectedIndex(this._iClosedUpDownIdx);this._updatePosInSet(null,this._iClosedUpDownIdx+1,s.getAdditionalText?s.getAdditionalText():"")}else{this._updatePosInSet(null,-1,null);this._iClosedUpDownIdx=-1}};g.prototype.onsapenter=function(e){this._close();this._checkChange(e)};g.prototype.onsapfocusleave=function(t){var i=this._getListBox();if(t.relatedControlId&&r(i.getFocusDomRef(),sap.ui.getCore().byId(t.relatedControlId).getFocusDomRef())||this._bOpening){this.focus()}else{e.prototype.onsapfocusleave.apply(this,arguments)}};g.prototype._checkChange=function(e,t){var i=this.getInputDomRef();if(!i){return}var s=jQuery(i).val(),o=this.getValue();if(!this._F4ForOpen&&(this.getEditable()&&this.getEnabled())){var n=this.getItems(),a=null,d,r,h,l;if(o!=s){this.setValue(s,true);for(var p=0,g=n.length;p<g;p++){d=n[p].getText();if(d===s){if(p==this._iClosedUpDownIdx){a=n[p];r=a.getKey();h=a.getId();l=p;break}else if(!l){a=n[p];r=a.getKey();h=a.getId();l=p}}}this.setProperty("selectedKey",r,true);this.setProperty("selectedItemId",h,true);if(h){this._iClosedUpDownIdx=l}else{this._iClosedUpDownIdx=-1}if(this.mobile){if(!h){this._addDummyOption(s)}else{this._removeDummyOption();this.getDomRef("select").selectedIndex=l}}}else{var u=this.getSelectedItemId();var f;l=this._iClosedUpDownIdx;if(l>=0){a=n[l];if(a.getText()==s){f=a.getId()}}if(f&&f!=u){this.setSelectedItemId(f,true)}else{return}}this.fireChange({newValue:s,selectedItem:a})}};g.prototype.onkeypress=function(t){if(t.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}if(this._sTypeAhead){clearTimeout(this._sTypeAhead)}if(g._isHotKey(t)||t.keyCode===h.F4&&t.which===0){return}var i=t.which||t.keyCode;if(i!==h.DELETE&&i!==h.BACKSPACE&&i!==h.ESCAPE){this._sTypeAhead=setTimeout(function(){this._doTypeAhead()}.bind(this),200)}else{e.prototype.onkeypress.apply(this,arguments);if(i!==h.ESCAPE){this._updatePosInSet(null,-1,null)}}};g.prototype.onsapup=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}if(jQuery(this.getFocusDomRef()).data("sap.InNavArea")){return}var t=this._getListBox(),i=t.getItems(),s=this.getInputDomRef(),o=jQuery(s).val();var n=this._prepareUpDown(i,o);n=this._updateIdx(i,s,n-1,n,e);e.preventDefault();e.stopPropagation()};g.prototype.onsapdown=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}if(jQuery(this.getFocusDomRef()).data("sap.InNavArea")){return}var t=this._getListBox(),i=t.getItems(),s=this.getInputDomRef(),o=jQuery(s).val();var n=this._prepareUpDown(i,o);n=this._updateIdx(i,s,n+1,n,e);e.preventDefault();e.stopPropagation()};g.prototype.onsaphome=function(t){e.prototype.onsaphome.apply(this,arguments);if(t.target.id==this.getId()+"-select"){return}if(!this.getEditable()||!this.getEnabled()||!this.oPopup||!this.oPopup.isOpen()){return}var i=this._getListBox(),s=i.getItems(),o=this.getInputDomRef();this._updateIdx(s,o,0,undefined,t);t.preventDefault();t.stopPropagation()};g.prototype.onsapend=function(t){e.prototype.onsapend.apply(this,arguments);if(t.target.id==this.getId()+"-select"){return}if(!this.getEditable()||!this.getEnabled()||!this.oPopup||!this.oPopup.isOpen()){return}var i=this._getListBox(),s=i.getItems(),o=this.getInputDomRef();var n=s.length-1;n=this._updateIdx(s,o,n,undefined,t);t.preventDefault();t.stopPropagation()};g.prototype._doTypeAhead=function(){this._sTypeAhead=null;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;var e=this._getListBox(),t=e.getItems(),i,s,o=jQuery(this.getInputDomRef()),n=o.val(),a=jQuery.sap.startsWithIgnoreCase;this._sTypedChars=n;var d=false;var r=0;for(var h=t.length;r<h;r++){i=t[r];s=""+i.getText();if(a(s,n)&&i.getEnabled()){this._updatePosInSet(o,r+1,i.getAdditionalText?i.getAdditionalText():"");o.val(s);this._doSelect(n.length,s.length);e.setSelectedIndex(r);e.scrollToIndex(r,true);d=true;if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=r}return}}e.clearSelection();e.scrollToIndex(r,true);if(!d){this._updatePosInSet(o,-1,null);if(this.mobile){this._addDummyOption(n)}}};g.prototype._prepareUpDown=function(e,t){var i;if(this._iClosedUpDownIdx>=0&&e[this._iClosedUpDownIdx]&&e[this._iClosedUpDownIdx].getText()!==t){this._iClosedUpDownIdx=-1}if(this._iClosedUpDownIdx===-1){for(var s=0,o=e.length;s<o;s++){i=e[s].getText();if(i===t){this._iClosedUpDownIdx=s;break}}}return this._iClosedUpDownIdx};g.prototype._updateIdx=function(e,t,i,s,o){var n=e.length,a=i===0&&s===undefined,d=s!==undefined&&s<i||a,r,h=jQuery(t);if(i<0){r=0}else if(i<n){r=i}else{r=n-1}var l,p=false;do{i=d?r++:r--;l=e[i];p=l&&l.getEnabled()&&!(l instanceof sap.ui.core.SeparatorItem)&&l.getId()!==this.getId()+"_shi"}while(!p&&r<n&&r>=0);if(p){var g=l.getText();var u=i+1;if(this._determinePosinset){u=this._determinePosinset(e,i)}this._updatePosInSet(h,u,l.getAdditionalText?l.getAdditionalText():"");h.val(g);this._doSelect();this._fireLiveChange(o);var f=this._getListBox();f.setSelectedIndex(i);f.scrollToIndex(i,true)}else{i=s}this._iClosedUpDownIdx=i;return i};g.prototype._doSelect=function(e,t){var i=this.getInputDomRef();if(i){var s=jQuery(i);i.focus();s.selectText(e?e:0,t?t:s.val().length)}return this};g.prototype.getF4ButtonDomRef=function(){return this.getDomRef("icon")};g.prototype._getPrivateListBox=function(){if(this._oListBox){return this._oListBox}this._oListBox=new a(this.getId()+"-lb",{allowMultiSelect:false});this.setAggregation("myListBox",this._oListBox,true);this._oListBox.attachEvent("itemsChanged",this._handleItemsChanged,this);this._oListBox.attachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this.getDomRef()){this.$().attr("aria-owns",this.getId()+"-input "+this._oListBox.getId())}return this._oListBox};g.prototype._getExistingListBox=function(){var e=this.getListBox(),t;if(e){t=sap.ui.getCore().byId(e)}else if(this._oListBox){t=this._getPrivateListBox()}return t};g.prototype._getListBox=function(e){var t=this._getExistingListBox();if(!t){t=this._getPrivateListBox()}if(e){t.setAllowMultiSelect(false);t.setDisplaySecondaryValues(this.getDisplaySecondaryValues());var i=this.getDomRef();if(i){t.setMinWidth(jQuery(i).rect().width+"px")}}return t};g.prototype._open=function(e){if(this.mobile){return}if(e===undefined){e=-1}if(!this.getEditable()||!this.getEnabled()){return}if(!this.oPopup){this.oPopup=new s}this._F4ForOpen=false;var t=this._getListBox(!this.oPopup.isOpen());var i=this.oPopup;this._prepareOpen(t);if(!this._oListBoxDelegate){this._oListBoxDelegate={oCombo:this,onclick:function(e){var t=jQuery(e.target).closest("li").attr("id");if(t){var i=new d("_internalSelect",this.oCombo,{selectedId:t});this.oCombo._handleSelect(i)}}}}t.addDelegate(this._oListBoxDelegate);i.setContent(t);i.setAutoClose(true);i.setAutoCloseAreas([this.getDomRef()]);i.setDurations(0,0);i.setInitialFocusId(this.getId()+"-input");var o=this._rerenderListBox(t);if(o){return}i.attachOpened(this._handleOpened,this);var n=s.Dock;i.open(e,n.BeginTop,n.BeginBottom,this,null,null,s.CLOSE_ON_SCROLL);jQuery(t.getFocusDomRef()).attr("tabindex","-1");jQuery(this.getDomRef()).attr("aria-expanded",true)};g.prototype._rerenderListBox=function(e){sap.ui.getCore().applyChanges();return false};g.prototype._prepareOpen=function(e){this._bOpening=true;var t=jQuery(this.getInputDomRef()),i=t.val(),s,o=e.getItems(),n,a=jQuery.sap.startsWithIgnoreCase,d=i==="",r=this.getSelectedItemId(),l;var p=0;var g=-1;for(var u=o.length;p<u;p++){l=o[p];if(!l.getEnabled()){continue}n=""+l.getText();if(d||a(n,i)){if(n==i&&p==this._iClosedUpDownIdx){g=p;s=n;break}else if(this._iClosedUpDownIdx<0&&n==i&&l.getId()==r){g=p;s=n;break}else if(g<0){g=p;s=n}}}if(g>=0){this._iClosedUpDownIdx=g;this._updatePosInSet(t,g+1,l.getAdditionalText?l.getAdditionalText():"");t.val(s);this._doSelect();var f=new jQuery.Event("sapshow");f.which=h.F4;this._fireLiveChange(f)}var c=e.getItems().length;var m=this.getMaxPopupItems();e.setVisibleItems(m<c?m:-1);e.setSelectedIndex(g)};g.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);var e=this._getListBox();e.scrollToIndex(this._iClosedUpDownIdx,true);e.attachSelect(this._handleSelect,this);this.oPopup.attachClosed(this._handleClosed,this);if(jQuery(this.getFocusDomRef()).data("sap.InNavArea")){jQuery(this.getFocusDomRef()).data("sap.InNavArea",false)}this._bOpening=false};g.prototype._close=function(e){if(this.oPopup){this.oPopup.close(0)}};g.prototype._handleClosed=function(){this.oPopup.detachClosed(this._handleClosed,this);var e=this._getListBox();e.removeDelegate(this._oListBoxDelegate);e.detachSelect(this._handleSelect,this);jQuery(this.getDomRef()).attr("aria-expanded",false);if(this._cleanupClose){this._cleanupClose(e)}};g.prototype._handleSelect=function(e){var t=e.getParameter("selectedIndex"),i=e.getParameter("selectedId"),s=e.getParameter("selectedItem");if(!s&&i){s=sap.ui.getCore().byId(i);if(s.getParent()!==this._getListBox(false)){s=null}t=jQuery.inArray(s,this._getListBox().getItems())}if(s&&s.getEnabled()){var o=s.getText();this._iClosedUpDownIdx=t;this._close();this._updatePosInSet(null,this._getListBox().getSelectedIndex()+1,s.getAdditionalText?s.getAdditionalText():"");var n=this.getValue();var a=this.getSelectedKey();var d=s.getKey();var r=this.getSelectedItemId();var h=s.getId();this._sTypedChars=o;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;if(n!=o||a!=d||r!=h){this.setValue(o,true);this.setProperty("selectedKey",d,true);this.setProperty("selectedItemId",h,true);this.fireChange({newValue:o,selectedItem:s})}else if(o!=jQuery(this.getInputDomRef()).val()){jQuery(this.getInputDomRef()).val(o)}}this._doSelect();return s};g.prototype.getItems=function(){var e=this._getExistingListBox();return e?e.getItems():[]};g.prototype.insertItem=function(e,t){e=this.validateAggregation("items",e,true);this._getListBox().insertItem(e,t);return this};g.prototype.addItem=function(e){e=this.validateAggregation("items",e,true);this._getListBox().addItem(e);return this};g.prototype.removeItem=function(e){return this._getListBox().removeItem(e)};g.prototype.removeAllItems=function(){var e=this._getExistingListBox();return e?e.removeAllItems():[]};g.prototype.indexOfItem=function(e){return this._getListBox().indexOfItem(e)};g.prototype.destroyItems=function(){var e=this._getExistingListBox();if(e){this._getListBox().destroyItems()}return this};g.prototype.updateItems=function(){this._bNoItemCheck=true;this.updateAggregation("items");if(!this._sHandleItemsChanged){this._sHandleItemsChanged=setTimeout(function(){this._handleItemsChanged(null,true)}.bind(this),0)}};g.prototype.setListBox=function(e){var t=sap.ui.getCore().byId(this.getListBox());if(t){t.detachEvent("itemsChanged",this._handleItemsChanged,this);t.detachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this._bListBoxDependentSet){this.removeDependent(t);this._bListBoxDependentSet=false}}if(this._oListBox&&e){this._oListBox.detachEvent("itemsChanged",this._handleItemsChanged,this);this._oListBox.detachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this.getAggregation("myListBox")){this.destroyAggregation("myListBox",true)}else{this._oListBox.destroy()}this._oListBox=null}this.setAssociation("listBox",e);var i=typeof e==="string"?sap.ui.getCore().byId(e):e;if(i&&i.attachEvent){i.attachEvent("itemsChanged",this._handleItemsChanged,this);i.attachEvent("itemInvalidated",this._handleItemInvalidated,this)}if(i&&!i.getParent()){this.addDependent(i);this._bListBoxDependentSet=true}if(this.getDomRef()&&i){this.$().attr("aria-owns",this.getId()+"-input "+i.getId())}return this};g.prototype._handleItemsChanged=function(e,t){if(t){this._sHandleItemsChanged=null;this._bNoItemCheck=undefined}if(this._bNoItemCheck){return}var i=[];if(this._getExistingListBox()){i=this._getListBox().getItems()}var s=this.getSelectedKey();var o=this.getSelectedItemId();var n,a,d,r;var h=this.getValue();var l=-1;var p=false;var g=false;var u=false;this._iClosedUpDownIdx=-1;var f=!!this.getBinding("value");var c=!!this.getBinding("selectedKey");if(f&&c){f=false}var m=0;var I;for(m=0;m<i.length;m++){I=i[m];if((this._sWantedSelectedKey||this._sWantedSelectedItemId)&&(I.getKey()==this._sWantedSelectedKey||I.getId()==this._sWantedSelectedItemId)&&I.getEnabled()){n=I.getKey();a=I.getId();d=I.getText();r=I.getAdditionalText?I.getAdditionalText():"";l=m;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;break}else if(s&&I.getKey()==s&&I.getEnabled()&&!(u&&f)){p=true;n=s;a=I.getId();d=I.getText();r=I.getAdditionalText?I.getAdditionalText():"";l=m;if(d==h&&a==o&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break}if(c&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break}}else if(o&&I.getId()==o&&I.getEnabled()&&!p&&!(u&&f)){g=true;n=I.getKey();a=o;d=I.getText();r=I.getAdditionalText?I.getAdditionalText():"";l=m}else if(I.getText()==h&&I.getEnabled()&&!(p&&!f)&&!(g&&!f)&&!u){u=true;n=I.getKey();a=I.getId();d=h;r=I.getAdditionalText?I.getAdditionalText():"";l=m;if(f&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break}}}this._iClosedUpDownIdx=l;if(h!=d&&l>=0){this.setProperty("value",d,true);jQuery(this.getInputDomRef()).val(d)}this.setProperty("selectedKey",n,true);this.setProperty("selectedItemId",a,true);var _=this.getDomRef();if(_){jQuery(this.getInputDomRef()).attr("aria-setsize",i.length);if(a){this._updatePosInSet(null,l+1,r)}else{this._updatePosInSet(null,-1,null)}if(this.mobile){var y=this.getDomRef("select");while(y.length>0){y.remove(0)}for(m=0;m<i.length;m++){I=i[m];var v=document.createElement("option");v.text=I.getText();v.id=this.getId()+"-"+I.getId();if(!I.getEnabled()){v.disabled="disabled"}y.add(v,null)}y.selectedIndex=l}}};g.prototype._handleItemInvalidated=function(t){if(this._bNoItemCheck){return}var i=t.getParameter("item");if(i.getId()==this.getSelectedItemId()){if(i.getKey()!=this.getSelectedKey()){this.setProperty("selectedKey",i.getKey(),true)}if(i.getText()!=this.getValue()){e.prototype.setValue.apply(this,[i.getText()])}}if(!this._sHandleItemsChanged){this._handleItemsChanged(t)}};g.prototype.onAfterRendering=function(t){e.prototype.onAfterRendering.apply(this,arguments);var i=this.getListBox();if(i){var s=sap.ui.getCore().byId(i);if(s.getDomRef()){s.$().appendTo(sap.ui.getCore().getStaticAreaRef())}}if(this.mobile){var o=this;this.$("select").on("change",function(){var e=o.$("select").val();var t=o.getItems();var i=true;var s=0;var n=o.getValue();for(var a=0;a<t.length;a++){if(t[a].getText()==e){i=t[a].getEnabled()}if(t[a].getText()==n){s=a}}if(i){o.setValue(e);o.fireChange({newValue:e,selectedItem:sap.ui.getCore().byId(o.getSelectedItemId())})}else{o.getDomRef("select").selectedIndex=s}});if(this.getSelectedItemId()){for(var n=0;n<this.getItems().length;n++){var a=this.getItems()[n];if(this.getSelectedItemId()==a.getId()){this.getDomRef("select").selectedIndex=n;break}}}else{this._addDummyOption(this.getValue())}}};g._isHotKey=function(e){if(e.altKey||e.ctrlKey||e.metaKey){return true}var t=e.keyCode||e.which;switch(t){case h.ENTER:case h.SHIFT:case h.TAB:case h.ALT:case h.CONTROL:return true;case h.END:case h.HOME:case h.ARROW_LEFT:case h.ARROW_UP:case h.ARROW_RIGHT:case h.ARROW_DOWN:case h.F1:case h.F2:case h.F3:case h.F4:case h.F5:case h.F6:case h.F7:case h.F8:case h.F9:case h.F10:case h.F11:case h.F12:if(e.type=="keypress"){return e.which===0}else{return true}default:return false}};g.prototype.setSelectedKey=function(e){if(this.getSelectedKey()==e){return this}if(!e&&this._isSetEmptySelectedKeyAllowed()){return this}var t=this.getItems();var i=true;var s;var o;var n;for(var a=0;a<t.length;a++){if(t[a].getKey()==e&&t[a].getEnabled()){var d=t[a];s=d.getId();var r=d.getText();n=d.getAdditionalText?d.getAdditionalText():"";this.setValue(r,true);this._sTypedChars=r;o=a;i=false;break}}if(!i){this.setProperty("selectedKey",e,true);this.setProperty("selectedItemId",s,true);var h=this.getDomRef();if(h){this._updatePosInSet(null,o+1,n);if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=o}}this._sWantedSelectedKey=undefined;this._iClosedUpDownIdx=o}else{this._sWantedSelectedKey=e;this._iClosedUpDownIdx=-1}this._sWantedSelectedItemId=undefined;return this};g.prototype._isSetEmptySelectedKeyAllowed=function(){this.setProperty("selectedKey","",true);this.setProperty("selectedItemId","",true);this.setValue("",true);return true};g.prototype.setSelectedItemId=function(e){if(this.getSelectedItemId()==e){return this}if(!e&&this._isSetEmptySelectedKeyAllowed()){return this}var t=this.getItems();var i=true;var s;var o;var n;for(var a=0;a<t.length;a++){if(t[a].getId()==e&&t[a].getEnabled()){var d=t[a];s=d.getKey();var r=d.getText();n=d.getAdditionalText?d.getAdditionalText():"";this.setValue(r,true);this._sTypedChars=r;o=a;i=false;break}}if(!i){this.setProperty("selectedItemId",e,true);this.setProperty("selectedKey",s,true);var h=this.getDomRef();if(h){this._updatePosInSet(null,o+1,n);if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=o}}this._sWantedSelectedItemId=undefined;this._iClosedUpDownIdx=o}else{this._sWantedSelectedItemId=e;this._iClosedUpDownIdx=-1}this._sWantedSelectedKey=undefined;return this};g.prototype.setValue=function(t,i){if(!i){var s=this.getItems();var o;var n;var a;var d;this._iClosedUpDownIdx=-1;for(var r=0;r<s.length;r++){if(s[r].getText()==t&&s[r].getEnabled()){var h=s[r];n=h.getId();o=h.getKey();d=h.getAdditionalText?h.getAdditionalText():"";a=r;this._iClosedUpDownIdx=a;break}}this.setProperty("selectedKey",o,true);this.setProperty("selectedItemId",n,true);var l=this.getDomRef();if(l){if(n){this._updatePosInSet(null,a+1,d)}else{this._updatePosInSet(null,-1,null)}if(this.mobile){if(!n){this._addDummyOption(t)}else{this._removeDummyOption();this.getDomRef("select").selectedIndex=a}}}}e.prototype.setValue.apply(this,[t]);this._sTypedChars=this.getValue();this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;return this};g.prototype.invalidate=function(t){if(!t||!(t instanceof a)||t!=this._getListBox()){e.prototype.invalidate.apply(this,arguments)}else{if(this.getUIArea()&&t.getDomRef()){this.getUIArea().addInvalidatedControl(t)}}};g.prototype.clone=function(t){var i=e.prototype.clone.apply(this,arguments),s=this.getAggregation("myListBox"),o;if(s&&!i._oListBox){s.detachEvent("itemsChanged",this._handleItemsChanged,this);s.detachEvent("itemInvalidated",this._handleItemInvalidated,this);o=s.clone(t);o.attachEvent("itemsChanged",i._handleItemsChanged,i);o.attachEvent("itemInvalidated",i._handleItemInvalidated,i);i.setAggregation("myListBox",o,true);i._oListBox=o;s.attachEvent("itemsChanged",this._handleItemsChanged,this);s.attachEvent("itemInvalidated",this._handleItemInvalidated,this)}return i};g.prototype._addDummyOption=function(e){var t=this.getDomRef("dummyOption");if(!t){var i=this.getItems();t=document.createElement("option");t.text=e;t.id=this.getId()+"-dummyOption";if(i.length>0){this.getDomRef("select").add(t,document.getElementById(this.getId()+"-"+i[0].getId()))}else{this.getDomRef("select").add(t,null)}}else{t.text=e}this.getDomRef("select").selectedIndex=0};g.prototype._removeDummyOption=function(){var e=this.getDomRef("dummyOption");if(e){this.getDomRef("select").remove(0)}};g.prototype.getFocusDomRef=function(){if(this.mobile){return this.getDomRef("select")||null}else{return this.getDomRef("input")||null}};g.prototype._updatePosInSet=function(e,t,i){if(!e){e=this.$("input")}if(t>=0){e.attr("aria-posinset",t);if(this.getDisplaySecondaryValues()){this.$("SecVal").text(i)}}else{e.removeAttr("aria-posinset");if(this.getDisplaySecondaryValues()){this.$("SecVal").text("")}}};g.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);t.role="combobox";t.type=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_COMBO");return t};return g});
//# sourceMappingURL=ComboBox.js.map