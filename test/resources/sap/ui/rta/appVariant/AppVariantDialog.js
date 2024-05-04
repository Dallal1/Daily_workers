/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Button","sap/m/Dialog","sap/m/DialogRenderer","sap/m/GenericTile","sap/m/ImageContent","sap/m/Input","sap/m/Label","sap/m/SelectDialog","sap/m/StandardListItem","sap/m/TextArea","sap/m/TileContent","sap/m/VBox","sap/ui/core/Element","sap/ui/core/library","sap/ui/core/Lib","sap/ui/core/IconPool","sap/ui/core/Title","sap/ui/layout/form/SimpleForm","sap/ui/layout/library","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/ui/rta/Utils","sap/ui/layout/form/ResponsiveGridLayout"],function(e,t,a,n,i,l,s,r,o,u,p,c,d,g,A,m,T,_,v,I,L,y,f){"use strict";var{SimpleFormLayout:S}=v.form;var{ValueState:h}=g;var C=A.getResourceBundleFor("sap.ui.rta");var E;var x;var P;var V;var w;var b;var O;var N;var B;var D;var R;var G;var M;function U(){E=new n("tile",{header:"{/title}",subheader:"{/subtitle}",ariaLabel:C.getText("APP_VARIANT_TILE_ARIA_LABEL"),tileContent:[new p({content:[new i({src:"{/icon}"})]})]}).addStyleClass("sapUiMediumMarginBegin").addStyleClass("sapUiTinyMarginTop").addStyleClass("sapUiTinyMarginBottom")}function X(e){var t=e.getParameter("value");var a=new I("name",L.Contains,t);var n=e.getSource().getBinding("items");n.filter([a])}function F(e){var t=e.getParameter("selectedContexts");if(t&&t.length){t.forEach(function(e){var t=e.getObject().name;B.setValue(t);G.setProperty("/icon",e.getObject().icon)})}e.getSource().getBinding("items").filter([])}function j(){R||=new r("selectDialog",{noDataText:C.getText("APP_VARIANT_ICON_NO_DATA"),title:C.getText("APP_VARIANT_ICON_SELECT_ICON"),search(e){X(e)},confirm(e){F(e)},cancel(e){F(e)}});R.addStyleClass(f.getRtaStyleClassName());R.bindAggregation("items",{path:"/icons",template:new o({title:"{name}",description:"",icon:"{icon}",iconDensityAware:false,iconInset:false,type:"Active"})});var e=m.getIconNames();var t=[];e.forEach(function(e){var a=m.getIconInfo(e);t.push({icon:a.uri,name:a.text===""?e.toLowerCase():a.text})});M.setProperty("/icons",t);R.setModel(M);R.getBinding("items").filter([]);R.open()}function H(){x=new s({required:true,text:C.getText("APP_DIALOG_TITLE_TEXT"),textAlign:"Left"});P=new l("titleInput",{value:"{/title}",valueLiveUpdate:true,placeholder:C.getText("SAVE_AS_DIALOG_PLACEHOLDER_TITLE_TEXT"),liveChange(){var e=d.getElementById("saveButton");if(this.getValue()===""){this.setValueState(h.Error);e.setEnabled(false)}else{this.setValueState(h.None);e.setEnabled(true)}}});V=new s({text:C.getText("APP_DIALOG_SUB_TITLE_TEXT"),textAlign:"Left"});w=new l({value:"{/subtitle}",valueLiveUpdate:true});b=new s({text:C.getText("APP_DIALOG_DESCRIPTION_TEXT"),textAlign:"Left"});O=new u({rows:4});N=new s({text:C.getText("APP_DIALOG_ICON_TEXT"),textAlign:"Left"});B=new l("selectInput",{showValueHelp:true,liveChange(e){j(e)},valueHelpRequest(e){j(e)},value:"{/iconname}",valueLiveUpdate:true})}function q(){D=new _({editable:true,layout:S.ResponsiveGridLayout,labelSpanXL:4,labelSpanL:4,labelSpanM:4,labelSpanS:4,adjustLabelSpan:false,emptySpanXL:0,emptySpanL:0,emptySpanM:0,emptySpanS:0,columnsXL:2,columnsL:2,columnsM:2,singleContainerFullSize:false,content:[new T("title1"),x,P,V,w,N,B,b,O,new T("title2"),E]});return D}function z(){var e=new c({items:[q()]}).addStyleClass("sapUISmallMargin");return e}var J=t.extend("sap.ui.rta.appVariant.AppVariantDialog",{metadata:{library:"sap.ui.rta",events:{create:{},cancel:{}}},init(){t.prototype.init.apply(this);this.setTitle(C.getText("CREATE_APP_VARIANT_DIALOG_TITLE"));this.setContentWidth("860px");this.setContentHeight("250px");G=new y({title:null,subtitle:null,icon:" ",iconname:null});M=new y({icons:null});this.setModel(G);U();H();this.addContent(z());this._createButtons();this.addStyleClass(f.getRtaStyleClassName())},onAfterRendering(){document.getElementById("title1").style.height="0px";document.getElementById("title2").style.height="0px";document.getElementById("tile").style.float="left"},_onCreate(){var e=P.getValue()||" ";var t=w.getValue()||" ";var a=O.getValue()||" ";var n=B.getValue()?m.getIconInfo(B.getValue()).uri:" ";this.fireCreate({title:e,subTitle:t,description:a,icon:n});this.close();this.destroy()},_createButtons(){this.addButton(new e("saveButton",{text:C.getText("APP_VARIANT_DIALOG_SAVE"),tooltip:C.getText("TOOLTIP_APP_VARIANT_DIALOG_SAVE"),enabled:false,press:function(){this._onCreate()}.bind(this)}));this.addButton(new e({text:C.getText("SAVE_AS_APP_VARIANT_DIALOG_CANCEL"),tooltip:C.getText("TOOLTIP_SAVE_AS_APP_VARIANT_DIALOG_CANCEL"),press:function(){this.fireCancel();this.close();this.destroy()}.bind(this)}))},destroy(...e){if(G){G.destroy()}t.prototype.destroy.apply(this,e)},renderer:a});return J});
//# sourceMappingURL=AppVariantDialog.js.map