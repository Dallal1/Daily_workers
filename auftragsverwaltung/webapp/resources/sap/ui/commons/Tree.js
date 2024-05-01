/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/isEmptyObject","./library","sap/ui/core/Control","./TreeRenderer","./Button","sap/ui/core/Configuration"],function(jQuery,e,t,o,i,s,n,l){"use strict";var d=o.TreeSelectionMode;var r=i.extend("sap.ui.commons.Tree",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{title:{type:"string",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"auto"},showHeader:{type:"boolean",group:"Misc",defaultValue:true},showHeaderIcons:{type:"boolean",group:"Misc",defaultValue:true},showHorizontalScrollbar:{type:"boolean",group:"Misc",defaultValue:false},minWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},selectionMode:{type:"sap.ui.commons.TreeSelectionMode",group:"Behavior",defaultValue:d.Legacy}},defaultAggregation:"nodes",aggregations:{nodes:{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"node",bindable:"bindable"}},events:{select:{allowPreventDefault:true,parameters:{node:{type:"sap.ui.commons.TreeNode"},nodeContext:{type:"object"}}},selectionChange:{parameters:{nodes:{type:"sap.ui.commons.TreeNode[]"},nodeContexts:{type:"object[]"}}}}}});r.prototype.resizeListenerId;r.prototype.init=function(){this.bAllCollapsed=false;this.allowTextSelection(false);this.iOldScrollTop=null;this.mSelectedNodes={};this.mSelectedContexts={};this.aLeadSelection=null;var e=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.oCollapseAllButton=new n(this.getId()+"-CollapseAll",{icon:this.getIconPrefix()+"CollapseAll.png",tooltip:e.getText("TREE_COLLAPSE_ALL"),lite:true});this.oExpandAllButton=new n(this.getId()+"-ExpandAll",{icon:this.getIconPrefix()+"ExpandAll.png",tooltip:e.getText("TREE_EXPAND_ALL"),lite:true});this.oCollapseAllButton.attachPress(this.onCollapseAll,this);this.oExpandAllButton.attachPress(this.onExpandAll,this);this.oCollapseAllButton.addStyleClass("sapUiTreeCol");this.oExpandAllButton.addStyleClass("sapUiTreeExp")};r.prototype.exit=function(){if(this.oCollapseAllButton){this.oCollapseAllButton.destroy();this.oCollapseAllButton=null}if(this.oExpandAllButton){this.oExpandAllButton.destroy();this.oExpandAllButton=null}};r.SelectionType={Select:"Select",Toggle:"Toggle",Range:"Range"};r.prototype.onThemeChanged=function(){if(this.oCollapseAllButton&&this.oExpandAllButton){this.oCollapseAllButton.setIcon(this.getIconPrefix()+"CollapseAll.png");this.oExpandAllButton.setIcon(this.getIconPrefix()+"ExpandAll.png")}};r.prototype.onExpandAll=function(){this.expandAll()};r.prototype.onCollapseAll=function(){this.collapseAll()};r.prototype.expandAll=function(){var e=this._getNodes();for(var t=0;t<e.length;t++){e[t].expand(true,true);this._adjustSelectionOnExpanding(e[t])}};r.prototype.collapseAll=function(){var e=this._getNodes();for(var t=0;t<e.length;t++){e[t].collapse(true,true);this._adjustSelectionOnCollapsing(e[t])}this._adjustFocus()};r.prototype.onsapdown=function(e){this.moveFocus(false);e.preventDefault()};r.prototype.onsapup=function(e){this.moveFocus(true);e.preventDefault()};r.prototype.onsaphome=function(e){this.placeFocus(this.getFirstSibling(e.target));e.preventDefault()};r.prototype.onsaphomemodifiers=function(e){this.placeFocus(this.getFirst());e.preventDefault()};r.prototype.onsapend=function(e){this.placeFocus(this.getLastSibling(e.target));e.preventDefault()};r.prototype.onsapendmodifiers=function(e){this.placeFocus(this.getLast());e.preventDefault()};r.prototype.onsapcollapseall=function(e){if(this.bAllCollapsed){this.expandAll()}else{this.collapseAll()}this.bAllCollapsed=!this.bAllCollapsed};r.prototype.getIconPrefix=function(){var e="themes/"+l.getTheme()+"/";if(!l.getRTL()){e+="img/tree/"}else{e+="img-RTL/tree/"}return sap.ui.resource("sap.ui.commons",e)};r.prototype.getFirstSibling=function(e){var t=jQuery(e).siblings(".sapUiTreeNode:visible").first();if(t.length){return t[0]}return null};r.prototype.getLastSibling=function(e){var t=jQuery(e).siblings(".sapUiTreeNode:visible").last();if(t.length){return t[0]}return null};r.prototype.getFirst=function(){var e=this.$().find(".sapUiTreeNode:visible").first();if(e.length){return e[0]}return null};r.prototype.getLast=function(){var e=this.$().find(".sapUiTreeNode:visible").last();if(e.length){return e[0]}return null};r.prototype.moveFocus=function(e){var t=jQuery(".sapUiTreeNode:focus");if(t.length){var o=sap.ui.getCore().byId(t[0].id);var i=this.$().find(".sapUiTreeNode:visible");var s=i.index(t[0]);var n=s;if(e){n--}else{n++}if(n>=0&&n<i.length){var l=i.eq(n);var d=sap.ui.getCore().byId(l[0].id);o.blur();d.focus()}}};r.prototype._adjustFocus=function(){var e=this.$().find('.sapUiTreeNode[tabIndex="0"]');if(!e.is(":visible")){var t=this.$().find(".sapUiTreeNode");var o=t.index(e[0]);var i=t.filter(":lt("+o+")");var s=i.filter(":visible");var n=s[s.length-1];if(n){n.setAttribute("tabindex","0");if(jQuery(".sapUiTreeNode:focus").is(":not(:visible)")){n.focus()}}}};r.prototype.placeFocus=function(e){if(!e){return}var t=this.$().find(".sapUiTreeNode[tabIndex='0']");if(t.length){t[0].setAttribute("tabindex","-1")}e.setAttribute("tabindex","0");var o=sap.ui.getCore().byId(e.id);o.focus()};r.prototype._adjustSelectionOnExpanding=function(e){if(!e){return}var t=[];if(e.getSelectedForNodes().length){t.push(e)}a(e,t,null);var o=e.$();if(o&&o.hasClass("sapUiTreeNodeSelectedParent")){o.removeClass("sapUiTreeNodeSelectedParent")}var i=e.$("children").find(".sapUiTreeNodeExpanded.sapUiTreeNodeSelectedParent");i.removeClass("sapUiTreeNodeSelectedParent")};function a(e,t,o){var i=e.getExpanded(),s=false,n=i&&!!e.getSelectedForNodes().length,l=o||i?o:e,d;for(d=0;d<t.length;d++){if(t[d].getSelectedForNodes().indexOf(e.getId())!==-1){s=true;t[d].removeAssociation("selectedForNodes",e,true)}}if(l&&s&&l!==e){if(l.getSelectedForNodes().indexOf(e.getId())===-1){l.addAssociation("selectedForNodes",e,true)}l.$().addClass("sapUiTreeNodeSelectedParent")}if(n){t.push(e)}var r=e._getNodes();for(d=0;d<r.length;d++){a(r[d],t,l)}if(n){t.pop(e)}}function c(e,t){var o=e._getNodes(),i;for(var s=0;s<o.length;s++){i=o[s];if(i.getIsSelected()){t.addAssociation("selectedForNodes",i,true)}c(i,t)}}r.prototype._adjustSelectionOnCollapsing=function(e){if(!e){return}c(e,e);if(e.getSelectedForNodes().length){var t=e.$();if(t&&!t.hasClass("sapUiTreeNodeSelectedParent")){t.addClass("sapUiTreeNodeSelectedParent")}}};r.prototype.isTreeBinding=function(e){return e=="nodes"};r.prototype.updateNodes=function(e){var t,o,i,s,n;if(e==="filter"){t=this.getAggregation("nodes");s=t.length;for(n=0;n<s;n++){t[n].destroy()}this.mSelectedNodes={}}this.updateAggregation("nodes");for(i in this.mSelectedContexts){o=this.getNodeByContext(this.mSelectedContexts[i]);if(o){o.setIsSelected(true)}else{this.mSelectedContexts=this._removeItemFromObject(this.mSelectedContexts,i)}}};r.prototype._removeItemFromObject=function(e,t){var o,i={};for(o in e){if(o!==t){i[o]=e[o]}}return i};r.prototype.getNodeContext=function(e){var t=this.getBindingInfo("nodes"),o=t&&t.model;return e.getBindingContext(o)};r.prototype.getNodeByContext=function(e){var t=this.getBindingInfo("nodes"),o=t&&t.model;return this.findNode(this,function(t){var i=t.getBindingContext(o);return e&&i&&e.getPath()===i.getPath()})};r.prototype.findNode=function(e,t){var o,i=this;if(t(e)){return e}jQuery.each(e._getNodes(),function(e,s){o=i.findNode(s,t);if(o){return false}});return o};r.prototype.setSelectionMode=function(e){e=this.validateProperty("selectionMode",e);if(this.getSelectionMode()!=e){this.setProperty("selectionMode",e);this._delSelection()}return this};r.prototype.getSelection=function(){for(var e in this.mSelectedNodes){return this.mSelectedNodes[e]}return null};r.prototype.setSelection=function(e,t,o){var i=true;if(!t){i=this.fireSelect({node:e,nodeContext:this.getNodeContext(e)})}if(i){switch(this.getSelectionMode()){case d.Legacy:case d.Single:this._setSelectedNode(e,t);break;case d.Multi:if(o==r.SelectionType.Range){this._setSelectedNodeMapRange(e,t)}else if(o==r.SelectionType.Toggle){this._setSelectedNodeMapToggle(e,t)}else{this._setSelectedNode(e,t)}break;case d.None:break}}};r.prototype.onAfterRendering=function(){if(this.iOldScrollTop){this.$("TreeCont").scrollTop(this.iOldScrollTop)}};r.prototype.invalidate=function(){var e=this;i.prototype.invalidate.apply(this,arguments);if(this.iSelectionUpdateTimer){return}this.iSelectionUpdateTimer=setTimeout(function(){e.mSelectedNodes={};e.mSelectedContexts=[];e.updateSelection(e,true);e.iSelectionUpdateTimer=null},0)};r.prototype._addSelectedNodeContext=function(e){var t;if(e&&e.sPath){t=e.sPath;if(this.getSelectionMode()===d.Multi){if(!(t in this.mSelectedContexts)){this.mSelectedContexts[t]=e}}else{this.mSelectedContexts={};this.mSelectedContexts[t]=e}}};r.prototype.updateSelection=function(o,i){var s=this;jQuery.each(o._getNodes(),function(o,n){if(n.getIsSelected()){switch(s.getSelectionMode()){case d.None:e.warning("Added selected nodes in a tree with disabled selection");n.setIsSelected(false);break;case d.Legacy:if(t(s.mSelectedNodes)){s.mSelectedNodes[n.getId()]=n;s._addSelectedNodeContext(s.getNodeContext(n))}break;case d.Single:if(t(s.mSelectedNodes)==false){e.warning("Added multiple selected nodes in single select tree");n.setIsSelected(false)}else{s.mSelectedNodes[n.getId()]=n;s._addSelectedNodeContext(s.getNodeContext(n))}break;case d.Multi:if(!i){e.warning("Added selected node inside collapsed node in multi select tree");n.setIsSelected(false)}else{s.mSelectedNodes[n.getId()]=n;s._addSelectedNodeContext(s.getNodeContext(n))}break}}s.updateSelection(n,i&&n.getExpanded())})};r.prototype.onBeforeRendering=function(){this.iOldScrollTop=this.$("TreeCont").scrollTop()};r.prototype._setSelectedNode=function(e,t){var o=this,i=this.getNodeContext(e);jQuery.each(this.mSelectedNodes,function(e,i){o._delMultiSelection(i,t)});e._select(t,true);this.mSelectedNodes[e.getId()]=e;this._addSelectedNodeContext(i);this.oLeadSelection=e;if(!t){this.fireSelectionChange({nodes:[e],nodeContexts:[i]})}};r.prototype._setSelectedNodeMapToggle=function(e,t){this._setNodeSelection(e,!e.getIsSelected(),t)};r.prototype._setSelectedNodeMapRange=function(e,t){var o,i=[],s=[],n,l,d,r;if(this.mSelectedNodes[e.getId()]==e){return}else{if(this._getNodes().length>0){o=this._getSelectableNodes();n=o.indexOf(this.oLeadSelection);l=o.indexOf(e);d=n<l?n:l;r=n<l?l:n;for(var a=d;a<=r;a++){this._setMultiSelection(o[a],t)}}}if(!t){jQuery.map(this.mSelectedNodes,function(e){i.push(e)});jQuery.map(this.mSelectedContexts,function(e){s.push(e)});this.fireSelectionChange({nodes:i,nodeContexts:s})}};r.prototype._getSelectableNodes=function(e){var t=[];function o(e){jQuery.each(e,function(e,i){if(i.getSelectable()){t.push(i)}if(i.getExpanded()){o(i._getNodes())}})}o(this._getNodes());return t};r.prototype._setNodeSelection=function(e,t,o){var i=[],s=[],n;if(this.getSelectionMode()==d.Single){if(t){var l=this.getSelection();this._setSelectedNode(e,o);if(!e.isVisible()){n=this._getVisibleNode(e);this._adjustSelectionOnCollapsing(n)}if(l&&!l.isVisible()){n=this._getVisibleNode(l);this._adjustSelectionOnExpanding(n)}return}else{this._delMultiSelection(e,o);if(!e.isVisible()){n=this._getVisibleNode(e);this._adjustSelectionOnExpanding(n)}}}if(t){this._setMultiSelection(e,o);this.oLeadSelection=e}else{this._delMultiSelection(e,o);this.oLeadSelection=e}if(!o){jQuery.map(this.mSelectedNodes,function(e){i.push(e)});jQuery.map(this.mSelectedContexts,function(e){s.push(e)});this.fireSelectionChange({nodes:i,nodeContexts:s})}};r.prototype._setMultiSelection=function(e,t){if(!e){return}e._select(t);this.mSelectedNodes[e.getId()]=e;this._addSelectedNodeContext(this.getNodeContext(e))};r.prototype._delMultiSelection=function(e){var t;if(!e){return}e._deselect();this.mSelectedNodes=this._removeItemFromObject(this.mSelectedNodes,e.getId());t=e.getBindingContext();if(t&&t.sPath){if(t.sPath in this.mSelectedContexts){this.mSelectedContexts=this._removeItemFromObject(this.mSelectedContexts,t.sPath)}}};r.prototype._delSelection=function(){var e=this;if(this.oSelectedNode){this.oSelectedNode._deselect()}if(t(this.mSelectedNodes)==false){jQuery.each(this.mSelectedNodes,function(t,o){e._delMultiSelection(o)})}};r.prototype._getNodes=function(){return this.mAggregations.nodes||[]};r.prototype._getVisibleNode=function(e){var t=e.getParent();if(t.isVisible()){var o=t}else{o=this._getVisibleNode(t)}return o};return r});
//# sourceMappingURL=Tree.js.map