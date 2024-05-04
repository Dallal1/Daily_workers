/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./ListBoxRenderer","sap/ui/core/library","sap/ui/Device"],function(jQuery,e,t,i,s,n,a){"use strict";var o=n.TextAlign;var r=t.extend("sap.ui.commons.ListBox",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},allowMultiSelect:{type:"boolean",group:"Behavior",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},scrollTop:{type:"int",group:"Behavior",defaultValue:-1},displayIcons:{type:"boolean",group:"Behavior",defaultValue:false},displaySecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},valueTextAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:o.Begin},secondaryValueTextAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:o.Begin},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},visibleItems:{type:"int",group:"Dimension",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{id:{type:"string"},selectedIndex:{type:"int"},selectedItem:{type:"sap.ui.core.Item"},selectedIndices:{type:"int[]"}}}}}});r.prototype.init=function(){this.allowTextSelection(false);if(!this._bHeightInItems){this._bHeightInItems=false;this._iVisibleItems=-1}this._sTotalHeight=null;if(r._fItemHeight===undefined){r._fItemHeight=-1}if(r._iBordersAndStuff===undefined){r._iBordersAndStuff=-1}this._aSelectionMap=[];this._iLastDirectlySelectedIndex=-1;this._aActiveItems=null};r.prototype.onThemeChanged=function(){this._sTotalHeight=null;if(!this._bHeightInItems){this._iVisibleItems=-1}this._skipStoreScrollTop=true;if(this.getDomRef()){this.invalidate()}};r.prototype.onBeforeRendering=function(){if(this._skipStoreScrollTop){delete this._skipStoreScrollTop;return}this.getScrollTop()};r.prototype.onAfterRendering=function(){var e=this.getDomRef();if(r._fItemHeight<=0){var t=sap.ui.getCore().getStaticAreaRef();var s=document.createElement("div");s.id="sap-ui-commons-ListBox-sizeDummy";s.innerHTML='<div class="sapUiLbx sapUiLbxFlexWidth sapUiLbxStd"><ul><li class="sapUiLbxI"><span class="sapUiLbxITxt">&nbsp;</span></li></ul></div>';if(a.browser.safari){t.insertBefore(s,t.firstChild)}else{t.appendChild(s)}var n=s.firstChild.firstChild.firstChild;r._fItemHeight=n.offsetHeight;t.removeChild(s)}if(r._iBordersAndStuff==-1){var o=jQuery(this.getDomRef());var l=o.outerHeight();var h=o.height();r._iBordersAndStuff=l-h}if(this._bHeightInItems){if(this._sTotalHeight==null){this._calcTotalHeight();e.style.height=this._sTotalHeight}}if(this._iVisibleItems==-1){this._updatePageSize()}var d=this.getFocusDomRef(),c=d.childNodes,p=[],f=this.getItems();this._aActiveItems=[];var g=this._aActiveItems;for(var u=0;u<c.length;u++){if(!(f[u]instanceof sap.ui.core.SeparatorItem)){g[p.length]=u;p.push(c[u])}}if(!this.oItemNavigation){var I=!this.getEnabled()||!this.getEditable();this.oItemNavigation=new i(null,null,I);this.oItemNavigation.attachEvent(i.Events.AfterFocus,this._handleAfterFocus,this);this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(d);this.oItemNavigation.setItemDomRefs(p);this.oItemNavigation.setCycling(false);this.oItemNavigation.setSelectedIndex(this._getNavigationIndexForRealIndex(this.getSelectedIndex()));this.oItemNavigation.setPageSize(this._iVisibleItems);if(this.oScrollToIndexRequest){this.scrollToIndex(this.oScrollToIndexRequest.iIndex,this.oScrollToIndexRequest.bLazy)}else{var m=this.getProperty("scrollTop");if(m>-1){e.scrollTop=m}}var v=this;window.setTimeout(function(){if(v.oScrollToIndexRequest){v.scrollToIndex(v.oScrollToIndexRequest.iIndex,v.oScrollToIndexRequest.bLazy);v.oScrollToIndexRequest=null}else{var t=v.getProperty("scrollTop");if(t>-1){e.scrollTop=t}}},0)};r.prototype._getNavigationIndexForRealIndex=function(e){var t=this.getItems();var i=e;for(var s=0;s<e;s++){if(t[s]instanceof sap.ui.core.SeparatorItem){i--}}return i};r.prototype._updatePageSize=function(){var e=this.getDomRef();if(e){if(r._fItemHeight>0){this._iVisibleItems=Math.floor(e.clientHeight/r._fItemHeight)}}};r.prototype.scrollToIndex=function(e,t){var i=this.getDomRef();if(i){var s=this.$("list").children("li[data-sap-ui-lbx-index="+e+"]");s=s.get(0);if(s){var n=s.offsetTop;if(!t){this.setScrollTop(n)}else{var a=i.scrollTop;var o=jQuery(i).height();if(a>=n){this.setScrollTop(n)}else if(n+r._fItemHeight>a+o){this.setScrollTop(Math.ceil(n+r._fItemHeight-o))}}}this.getScrollTop()}else{this.oScrollToIndexRequest={iIndex:e,bLazy:t}}return this};r.prototype.getVisibleItems=function(){return this._iVisibleItems};r.prototype.setVisibleItems=function(e){this.setProperty("visibleItems",e,true);this._iVisibleItems=e;if(e<0){this._bHeightInItems=false}else{this._bHeightInItems=true}this._sTotalHeight=null;var t=this.getDomRef();if(t){if(this._bHeightInItems){var i=t.firstChild?t.firstChild.firstChild:null;if(i||r._fItemHeight>0&&r._iBordersAndStuff>0){t.style.height=this._calcTotalHeight()}else{this.invalidate()}}else{t.style.height=this.getHeight();this._updatePageSize();if(this.oItemNavigation){this.oItemNavigation.setPageSize(this._iVisibleItems)}}}return this};r.prototype._calcTotalHeight=function(){var e=this._iVisibleItems*r._fItemHeight;this._sTotalHeight=e+r._iBordersAndStuff+"px";return this._sTotalHeight};r.prototype.setHeight=function(e){this.validateProperty("height",e);if(this.getHeight()===e){return this}this._bHeightInItems=false;this._iVisibleItems=-1;var t=this.getDomRef();if(t){t.style.height=e;this._updatePageSize();if(this.oItemNavigation){this.oItemNavigation.setPageSize(this._iVisibleItems)}}return this.setProperty("height",e,true)};r.prototype.setWidth=function(e){var t=this.getDomRef();if(t){t.style.width=e}this.setProperty("width",e,true);return this};r.prototype.setScrollTop=function(e){e=Math.round(e);var t=this.getDomRef();this.oScrollToIndexRequest=null;if(t){t.scrollTop=e}this.setProperty("scrollTop",e,true);return this};r.prototype.getScrollTop=function(){var e=this.getDomRef();if(e){var t=Math.round(e.scrollTop);this.setProperty("scrollTop",t,true);return t}else{return this.getProperty("scrollTop")}};r.prototype.onmousedown=function(e){if(a.browser.webkit&&e.target&&e.target.id===this.getId()){var t=document.activeElement?document.activeElement.id:this.getId();var i=this;setTimeout(function(){var e=i.getDomRef().scrollTop;var s=t?document.getElementById(t):null;if(s){s.focus()}i.getDomRef().scrollTop=e},0)}};r.prototype.onclick=function(e){this._handleUserActivation(e)};r.prototype.ontouchmove=function(e){e.setMarked()};r.prototype.onsapspace=function(e){this._handleUserActivation(e)};r.prototype.onsapspacemodifiers=r.prototype.onsapspace;r.prototype.onsapenter=r.prototype.onsapspace;r.prototype.onsapentermodifiers=r.prototype.onsapspace;r.prototype._handleUserActivation=function(e){if(!this.getEnabled()||!this.getEditable()){return}var t=e.target;if(t.id===""||t.id&&t.id.endsWith("-txt")){t=t.parentNode;if(t.id===""){t=t.parentNode}}var i=jQuery(t).attr("data-sap-ui-lbx-index");if(typeof i=="string"&&i.length>0){var s=parseInt(i);var n=this.getItems();var a=n[s];if(n.length<=s){s=n.length-1}if(s>=0&&s<n.length){if(a.getEnabled()&&!(a instanceof sap.ui.core.SeparatorItem)){if(e.ctrlKey||e.metaKey){this._handleUserActivationCtrl(s,a)}else if(e.shiftKey){this.setSelectedIndices(this._getUserSelectionRange(s));this.fireSelect({id:this.getId(),selectedIndex:s,selectedIndices:this.getSelectedIndices(),selectedItem:a,sId:this.getId(),aSelectedIndices:this.getSelectedIndices()});this._iLastDirectlySelectedIndex=s}else{this._handleUserActivationPlain(s,a)}}}e.preventDefault();e.stopPropagation()}};r.prototype._handleUserActivationPlain=function(e,t){this._iLastDirectlySelectedIndex=e;this.oItemNavigation.setSelectedIndex(this._getNavigationIndexForRealIndex(e));if(this.getSelectedIndex()!=e||this.getSelectedIndices().length>1){this.setSelectedIndex(e);this.fireSelect({id:this.getId(),selectedIndex:e,selectedIndices:this.getSelectedIndices(),selectedItem:t,sId:this.getId(),aSelectedIndices:this.getSelectedIndices()})}};r.prototype._handleUserActivationCtrl=function(e,t){this._iLastDirectlySelectedIndex=e;this.oItemNavigation.setSelectedIndex(this._getNavigationIndexForRealIndex(e));if(this.isIndexSelected(e)){this.removeSelectedIndex(e)}else{this.addSelectedIndex(e)}this.fireSelect({id:this.getId(),selectedIndex:e,selectedIndices:this.getSelectedIndices(),selectedItem:t,sId:this.getId(),aSelectedIndices:this.getSelectedIndices()})};r.prototype._getUserSelectionRange=function(e){if(this._iLastDirectlySelectedIndex==-1){return[]}var t=this.getItems();var i=[];var s;if(this._iLastDirectlySelectedIndex<=e){for(s=this._iLastDirectlySelectedIndex;s<=e;s++){if(s>-1&&(t[s].getEnabled()&&!(t[s]instanceof sap.ui.core.SeparatorItem))){i.push(s)}}}else{for(s=e;s<=this._iLastDirectlySelectedIndex;s++){if(s>-1&&(t[s].getEnabled()&&!(t[s]instanceof sap.ui.core.SeparatorItem))){i.push(s)}}}return i};r.prototype.getSelectedIndex=function(){for(var e=0;e<this._aSelectionMap.length;e++){if(this._aSelectionMap[e]){return e}}return-1};r.prototype.setSelectedIndex=function(e){if(e<-1||e>this._aSelectionMap.length-1){return this}var t=this.getItems();if(e>-1&&(!t[e].getEnabled()||t[e]instanceof sap.ui.core.SeparatorItem)){return this}for(var i=0;i<this._aSelectionMap.length;i++){this._aSelectionMap[i]=false}this._aSelectionMap[e]=true;if(this.oItemNavigation){this.oItemNavigation.setSelectedIndex(this._getNavigationIndexForRealIndex(e))}this.getRenderer().handleSelectionChanged(this);return this};r.prototype.addSelectedIndex=function(e){if(!this.getAllowMultiSelect()){this.setSelectedIndex(e)}if(e<-1||e>this._aSelectionMap.length-1){return this}var t=this.getItems();if(e>-1&&(!t[e].getEnabled()||t[e]instanceof sap.ui.core.SeparatorItem)){return this}if(this._aSelectionMap[e]){return this}this._aSelectionMap[e]=true;this.getRenderer().handleSelectionChanged(this);return this};r.prototype.removeSelectedIndex=function(e){if(e<0||e>this._aSelectionMap.length-1){return this}if(!this._aSelectionMap[e]){return this}this._aSelectionMap[e]=false;this.getRenderer().handleSelectionChanged(this);return this};r.prototype.clearSelection=function(){for(var e=0;e<this._aSelectionMap.length;e++){if(this._aSelectionMap[e]){this._aSelectionMap[e]=false}}this._iLastDirectlySelectedIndex=-1;if(this.oItemNavigation){this.oItemNavigation.setSelectedIndex(-1)}this.getRenderer().handleSelectionChanged(this);return this};r.prototype.getSelectedIndices=function(){var e=[];for(var t=0;t<this._aSelectionMap.length;t++){if(this._aSelectionMap[t]){e.push(t)}}return e};r.prototype.setSelectedIndices=function(e){var t=[];var i=this.getItems();var s;for(s=0;s<e.length;s++){if(e[s]>-1&&e[s]<this._aSelectionMap.length){if(i[e[s]].getEnabled()&&!(i[e[s]]instanceof sap.ui.core.SeparatorItem)){t.push(e[s])}}}if(t.length>0){if(!this.getAllowMultiSelect()){t=[t[0]]}}for(s=0;s<this._aSelectionMap.length;s++){this._aSelectionMap[s]=false}for(s=0;s<t.length;s++){this._aSelectionMap[t[s]]=true}this.getRenderer().handleSelectionChanged(this);return this};r.prototype.addSelectedIndices=function(e){var t=[];var i=this.getItems();var s;for(s=0;s<e.length;s++){if(e[s]>-1&&e[s]<this._aSelectionMap.length){if(i[e[s]].getEnabled()&&!(i[e[s]]instanceof sap.ui.core.SeparatorItem)){t.push(e[s])}}}if(t.length>0){if(!this.getAllowMultiSelect()){t=[t[0]]}for(s=0;s<t.length;s++){this._aSelectionMap[t[s]]=true}this.getRenderer().handleSelectionChanged(this)}return this};r.prototype.isIndexSelected=function(e){if(e<-1||e>this._aSelectionMap.length-1){return false}return this._aSelectionMap[e]};r.prototype.setSelectedKeys=function(e){var t=this.getItems();var i={};for(var s=0;s<e.length;s++){i[e[s]]=true}var n=[];for(var a=0;a<t.length;a++){if(i[t[a].getKey()]){n.push(a)}}return this.setSelectedIndices(n)};r.prototype.getSelectedKeys=function(){var e=this.getItems();var t=[];for(var i=0;i<this._aSelectionMap.length;i++){if(this._aSelectionMap[i]){t.push(e[i].getKey())}}return t};r.prototype.getSelectedItem=function(){var e=this.getSelectedIndex();if(e<0||e>=this._aSelectionMap.length){return null}return this.getItems()[e]};r.prototype.getSelectedItems=function(){var e=this.getItems();var t=[];for(var i=0;i<this._aSelectionMap.length;i++){if(this._aSelectionMap[i]){t.push(e[i])}}return t};r.prototype.setAllowMultiSelect=function(e){this.setProperty("allowMultiSelect",e);var t=false;var i=false;if(!e&&this._aSelectionMap){for(var s=0;s<this._aSelectionMap.length;s++){if(this._aSelectionMap[s]){if(!t){t=true}else{this._aSelectionMap[s]=false;i=true}}}}if(i){this.getRenderer().handleSelectionChanged(this)}return this};r.prototype._handleAfterFocus=function(e){var t=e.getParameter("index");t=t!==undefined&&t>=0?this._aActiveItems[t]:0;this.getRenderer().handleARIAActivedescendant(this,t)};r.prototype.setItems=function(e,t,i){this._bNoItemsChangeEvent=true;if(t){this.destroyItems()}else{this.removeAllItems()}for(var s=0,n=e.length;s<n;s++){this.addItem(e[s])}this._bNoItemsChangeEvent=undefined;if(!i){this.fireEvent("itemsChanged",{event:"setItems",items:e})}return this};r.prototype.addItem=function(e){this._bNoItemInvalidateEvent=true;this.addAggregation("items",e);this._bNoItemInvalidateEvent=false;if(!this._aSelectionMap){this._aSelectionMap=[]}this._aSelectionMap.push(false);if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"addItem",item:e})}e.attachEvent("_change",this._handleItemChanged,this);return this};r.prototype.insertItem=function(e,t){if(t<0||t>this._aSelectionMap.length){return this}this._bNoItemInvalidateEvent=true;this.insertAggregation("items",e,t);this._bNoItemInvalidateEvent=false;this._aSelectionMap.splice(t,0,false);this.invalidate();if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"insertItems",item:e,index:t})}e.attachEvent("_change",this._handleItemChanged,this);return this};r.prototype.removeItem=function(e){var t=e;if(typeof e=="string"){e=sap.ui.getCore().byId(e)}if(typeof e=="object"){t=this.indexOfItem(e)}if(t<0||t>this._aSelectionMap.length-1){if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"removeItem",item:e})}return undefined}this._bNoItemInvalidateEvent=true;var i=this.removeAggregation("items",t);this._bNoItemInvalidateEvent=false;this._aSelectionMap.splice(t,1);this.invalidate();if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"removeItem",item:i})}i.detachEvent("_change",this._handleItemChanged,this);return i};r.prototype.removeAllItems=function(){this._bNoItemInvalidateEvent=true;var e=this.removeAllAggregation("items");this._bNoItemInvalidateEvent=false;this._aSelectionMap=[];this.invalidate();if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"removeAllItems"})}for(var t=0;t<e.length;t++){e[t].detachEvent("_change",this._handleItemChanged,this)}return e};r.prototype.destroyItems=function(){var e=this.getItems();for(var t=0;t<e.length;t++){e[t].detachEvent("_change",this._handleItemChanged,this)}this._bNoItemInvalidateEvent=true;var i=this.destroyAggregation("items");this._bNoItemInvalidateEvent=false;this._aSelectionMap=[];this.invalidate();if(!this._bNoItemsChangeEvent){this.fireEvent("itemsChanged",{event:"destroyItems"})}return i};r.prototype.updateItems=function(){this._bNoItemsChangeEvent=true;this.updateAggregation("items");this._bNoItemInvalidateEvent=true;if(!this._bItemsChangedAfterUpdate){this._bItemsChangedAfterUpdate=setTimeout(function(){this._itemsChangedAfterUpdate()}.bind(this),0)}};r.prototype._itemsChangedAfterUpdate=function(){this._bNoItemsChangeEvent=undefined;this._bItemsChangedAfterUpdate=undefined;this._bNoItemInvalidateEvent=undefined;this.fireEvent("itemsChanged",{event:"updateItems"})};r.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}if(this._bItemsChangedAfterUpdate){clearTimeout(this._bItemsChangedAfterUpdate);this._bItemsChangedAfterUpdate=undefined;this._bNoItemsChangeEvent=undefined;this._bNoItemInvalidateEvent=undefined}};r.prototype.getFocusDomRef=function(){return this.getDomRef("list")};r.prototype.getIdForLabel=function(){return this.getId()+"-list"};r.prototype._handleItemChanged=function(e){if(!this._bNoItemInvalidateEvent){this.fireEvent("itemInvalidated",{item:e.oSource})}};return r});
//# sourceMappingURL=ListBox.js.map