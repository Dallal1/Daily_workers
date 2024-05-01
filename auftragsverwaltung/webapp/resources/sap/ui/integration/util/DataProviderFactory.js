/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/base/Log","sap/ui/integration/library","sap/ui/integration/util/ServiceDataProvider","sap/ui/integration/util/RequestDataProvider","sap/ui/integration/util/CacheAndRequestDataProvider","sap/ui/integration/util/DataProvider","sap/ui/integration/util/ExtensionDataProvider","sap/ui/integration/util/JSONBindingHelper","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/CsrfTokenHandler","sap/ui/model/json/JSONModel"],function(e,t,i,s,o,n,r,a,d,l,u,f){"use strict";var c=i.CardPreviewMode;var h=e.extend("sap.ui.integration.util.DataProviderFactory",{constructor:function(t){e.call(this);t=t||{};this._oDestinations=t.destinations;this._oExtension=t.extension;this._oCard=t.card;this._oEditor=t.editor;this._oHost=t.host;if(t.csrfTokensConfig){this._oCsrfTokensModel=new f;this._oCsrfTokenHandler=new u({host:t.host,configuration:t.csrfTokensConfig,model:this._oCsrfTokensModel,dataProviderFactory:this})}this._aDataProviders=[];this._aFiltersProviders=[]}});h.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this._aDataProviders){this._aDataProviders.forEach(function(e){if(!e.bIsDestroyed){e.destroy()}});this._aDataProviders=null;this._aFiltersProviders=null}if(this._oCsrfTokenHandler){this._oCsrfTokenHandler.destroy();this._oCsrfTokenHandler=null}this._oCard=null;this._oExtension=null;this._bIsDestroyed=true};h.prototype.isDestroyed=function(){return this._bIsDestroyed};h.prototype.create=function(e,t,i,d){var u=this._oCard;if(!h.isProvidingConfiguration(e)||u&&u.getPreviewMode()===c.Abstract){return null}if(u&&u.getPreviewMode()===c.MockData){e=this._applyMockDataConfiguration(e)}var f=this._oEditor,g=this._oHost||u&&u.getHostInstance()||f&&f.getHostInstance(),p=g&&g.bUseExperimentalCaching,v=this._createDataProviderSettings(e,d),_;if(e.request&&p){_=new n(v);_.setHost(g)}else if(e.request){_=new o(v);if(g){_.setHost(g)}}else if(e.service){_=new s(v)}else if(e.json){_=new r(v)}else if(e.extension){_=new a(v,this._oExtension)}_.setConfiguration(e);if(u){_.setCard(u);l.propagateModels(u,_)}else if(f){l.propagateModels(f,_)}_.bindObject("/");_.setDestinations(this._oDestinations);if(_.isA("sap.ui.integration.util.IServiceDataProvider")){_.createServiceInstances(t)}this._aDataProviders.push(_);if(this._oCsrfTokenHandler){const t=this._oCsrfTokenHandler.getUsedToken(e);if(t){_.setCsrfTokenHandler(this._oCsrfTokenHandler);_.addDependency(t);_.setModel(this._oCsrfTokensModel,"csrfTokens")}}if(i){this._aFiltersProviders.push(_)}else{this._aFiltersProviders.forEach(e=>{_.addDependency(e)})}return _};h.prototype.remove=function(e){var t=this._aDataProviders.indexOf(e);if(t>-1){this._aDataProviders.splice(t,1)}if(e&&!e.bDestroyed&&e._bIsDestroyed){e.destroy()}};h.prototype.setHost=function(e){this._oHost=e;if(this._oCsrfTokenHandler){this._oCsrfTokenHandler.setHost(e)}};h.prototype._createDataProviderSettings=function(e,t){var i=this._oCard;var s=this._oEditor;var o={};if(i){o.baseRuntimeUrl=i.getRuntimeUrl("/");if(t){o.settings=e}else{o.settingsJson=d.createJsonWithBindingInfos(e,i.getBindingNamespaces())}}else if(s){o.baseRuntimeUrl=s.getRuntimeUrl("/");o.settingsJson=d.createJsonWithBindingInfos(e,s.getBindingNamespaces())}else{o.settingsJson=d.createJsonWithBindingInfos(e,{})}return o};h.prototype._applyMockDataConfiguration=function(e){if(!e.mockData||!h.isProvidingConfiguration(e.mockData)){t.error("There is no mock data configured.","sap.ui.integration.widgets.Card");return null}var i=Object.assign({},e);delete i.request;delete i.service;delete i.json;delete i.extension;return Object.assign(i,e.mockData)};h.isProvidingConfiguration=function(e){return e&&(e.request||e.service||e.json||e.extension)};return h});
//# sourceMappingURL=DataProviderFactory.js.map