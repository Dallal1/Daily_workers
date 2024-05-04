/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/model/json/JSONModel","sap/ui/core/Core","sap/ui/core/Fragment"],function(e,t,n,a){"use strict";var o=n.getLibraryResourceBundle("sap.m.designtime");var r=function(n,r){return new Promise(function(s){var c=[];var i=n.getItems();i.forEach(function(e){if(!e.isA("sap.m.IconTabSeparator")){c.push({text:e.getText()||e.getKey(),key:e.getKey()})}});var l={selectedKey:n.getSelectedKey(),titleText:o.getText("ICON_TAB_BAR_SELECT_TAB"),cancelBtn:o.getText("ICON_TAB_BAR_CANCEL_BTN"),okBtn:o.getText("ICON_TAB_BAR_SELECT_BTN"),items:c};var g=new t;g.setData(l);a.load({name:"sap.m.designtime.IconTabBarSelectTab",controller:this}).then(function(t){t.setModel(g);t.getBeginButton().attachPress(function(n){var a=e.getElementById("targetCombo").getSelectedKey();s(a);t.close()});t.getEndButton().attachPress(function(e){t.close()});t.attachEventOnce("afterClose",function(e){t.destroy()});t.addStyleClass(r.styleClass);t.open()})}).then(function(e){return[{selectorControl:n,changeSpecificData:{changeType:"selectIconTabBarFilter",content:{selectedKey:e,previousSelectedKey:n.getSelectedKey(),fireEvent:true}}}]})};return{name:{singular:"ICON_TAB_BAR_NAME",plural:"ICON_TAB_BAR_NAME_PLURAL"},palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabBar.icon.svg"}},aggregations:{items:{domRef:":sap-domref > .sapMITH",actions:{move:"moveControls"},propagateMetadata:function(e){if(e.isA("sap.m.IconTabFilter")){return{aggregations:{content:{domRef:function(){return":sap-domref > .sapMITBContainerContent"},actions:{move:"moveControls"}}}}}return null}},content:{domRef:function(e){var t=e._getIconTabHeader().oSelectedItem;if(t&&t.getContent().length){return null}return e.getDomRef("content")},actions:{move:"moveControls"}}},actions:{settings:function(){return{selectIconTabBarFilter:{name:o.getText("ICON_TAB_BAR_SELECT_TAB"),isEnabled:function(e){return!!e._getIconTabHeader().oSelectedItem},handler:r}}}},templates:{create:"sap/m/designtime/IconTabBar.create.fragment.xml"}}});
//# sourceMappingURL=IconTabBar.designtime.js.map