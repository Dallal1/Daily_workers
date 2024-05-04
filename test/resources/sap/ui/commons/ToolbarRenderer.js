/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/base/assert","./library","./ToolbarSeparator"],function(jQuery,e,t,r,i){"use strict";var a=r.ToolbarSeparatorDesign;var o={};o.render=function(e,r){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");t(r&&r.isA("sap.ui.commons.Toolbar"),"ToolbarRenderer.render: oToolbar must be a toolbar");e.write("<div role='toolbar' tabindex='0'");e.writeControlData(r);if(r.getWidth()){e.addStyle("width",r.getWidth())}var s=r.getTooltip_AsString();if(s){e.writeAttributeEscaped("title",s)}e.addClass("sapUiTb");e.addClass("sapUiTbDesign"+r.getDesign());if(r.getStandalone()){e.addClass("sapUiTbStandalone")}e.writeStyles();e.writeClasses();e.write(">");var n=r.getRightItems();var l=n.length;var d=l>0;var p="<div class='sapUiTbInner' id='"+r.getId()+"-inner"+"'>";if(d){e.write("<div class='sapUiTbCont sapUiTbContLeft'>"+p)}else{e.write("<div class='sapUiTbCont'>"+p)}var u=r.getItems();var f=u.length;for(var b=0;b<f;b++){var g=u[b];if(g){t(g.getMetadata().isInstanceOf("sap.ui.commons.ToolbarItem"),"ToolbarRenderer.render: oToolbarItem must be a ToolbarItem");if(g instanceof i){o.renderSeparator(e,g)}else{e.renderControl(g)}}}e.write("<div id='");e.write(r.getId());e.write("-mn' class='sapUiTbOB' role='button' aria-haspopup='true' title='"+a.getText("TOOLBAR_OVERFLOW")+"' tabindex='-1'></div></div></div>");if(d){e.write("<div class='sapUiTbInnerRight' >");for(var b=0;b<l;b++){var g=n[b];if(g){t(g.getMetadata().isInstanceOf("sap.ui.commons.ToolbarItem"),"ToolbarRenderer.render: oToolbarItem must be a ToolbarItem");if(g instanceof i){o.renderSeparator(e,g)}else{e.renderControl(g)}}}e.write("</div>")}e.write("</div>")};o.renderSeparator=function(e,t){if(t.getDisplayVisualSeparator()){e.write("<span ");e.writeElementData(t);if(t.getDesign()===a.FullHeight){e.write(" class='sapUiTbSeparator sapUiTbSepFullHeight' role='separator'></span>")}else{e.write(" class='sapUiTbSeparator' role='separator'></span>")}}else{e.write("<span ");e.writeElementData(t);e.write(" class='sapUiTbSpacer' role='separator'></span>")}};o.fillOverflowPopup=function(e){var t=e.getDomRef("pu");if(!t){t=o.initOverflowPopup(e).firstChild}var r=jQuery(t.parentNode),i=e.getVisibleItemInfo(true).count,a=e.getDomRef().firstChild.firstChild,s=0,n=a.firstChild,l=e.getId()+"-mn",d=r.width(),p=0;while(n){var u=n.nextSibling;if(s>=i){if(n.id===l){break}p=p<jQuery(n).outerWidth(true)?jQuery(n).outerWidth(true):p;t.appendChild(n)}n=u;s++}if(p>d){var f=12;r.width(p+f)}};o.initOverflowPopup=function(e){var t=sap.ui.getCore().getStaticAreaRef();var r=document.createElement("div");r.className="sapUiTbDD sapUiTbDesignFlat";r.innerHTML="<div id='"+e.getId()+"-pu' data-sap-ui="+e.getId()+" tabindex='0' role='menu'></div>";t.appendChild(r);return r};o.emptyOverflowPopup=function(t,r){var i=t.getDomRef("pu"),a=t.getDomRef(),o=null,s="",n=[];if(r===undefined){r=true}if(i){if(r&&a){o=a.firstChild.firstChild;s="insertBefore";n=[t.getDomRef("mn")]}else if(!r){o=i;s="removeChild"}else{e.error("The renderer 'sap.ui.commons.ToolbarRenderer' cannot empty the toolbar overflow popup.");return}while(i.hasChildNodes()){var l=[i.firstChild].concat(n);o[s].apply(o,l)}if(a&&t.sOriginalStylePropertyWidth){jQuery(a).width(t.sOriginalStylePropertyWidth);t.sOriginalStylePropertyWidth=null}}};o.getPopupArea=function(e){return e.getDomRef("pu")};o.setActive=function(e){e.$("mn").addClass("sapUiTbOBAct")};o.unsetActive=function(e){e.$("mn").removeClass("sapUiTbOBAct")};return o},true);
//# sourceMappingURL=ToolbarRenderer.js.map