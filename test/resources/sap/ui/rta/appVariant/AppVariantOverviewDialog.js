/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ComponentContainer","sap/ui/core/Lib","sap/m/Button","sap/m/Dialog","sap/m/DialogRenderer","sap/ui/rta/appVariant/manageApps/webapp/Component","sap/ui/rta/Utils"],function(t,e,n,s,a,i,o){"use strict";var p=s.extend("sap.ui.rta.appVariant.AppVariantOverviewDialog",{metadata:{library:"sap.ui.rta",properties:{idRunningApp:"string",isOverviewForKeyUser:{type:"boolean"},layer:"string"},events:{cancel:{}}},constructor:function(...n){s.prototype.constructor.apply(this,n);this._oTextResources=e.getResourceBundleFor("sap.ui.rta");this.oManageAppsComponent=new i("sap.ui.rta.appVariant.manageApps",{idRunningApp:this.getIdRunningApp(),isOverviewForKeyUser:this.getIsOverviewForKeyUser(),layer:this.getLayer()});this.oManageAppsComponentContainer=new t({component:this.oManageAppsComponent});this.addContent(this.oManageAppsComponentContainer);this._createButton();this.setContentWidth("1000px");this.setContentHeight("450px");this.setHorizontalScrolling(false);this.setTitle(this._oTextResources.getText("APP_VARIANT_OVERVIEW_DIALOG_TITLE"));this.addStyleClass(o.getRtaStyleClassName())},destroy(...t){s.prototype.destroy.apply(this,t)},renderer:a});p.prototype._createButton=function(){this.addButton(new n({text:this._oTextResources.getText("APP_VARIANT_DIALOG_CLOSE"),press:function(){this.close();this.fireCancel()}.bind(this)}))};return p});
//# sourceMappingURL=AppVariantOverviewDialog.js.map