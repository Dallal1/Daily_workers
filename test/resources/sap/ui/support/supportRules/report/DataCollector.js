/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/VersionInfo","sap/base/util/LoaderExtensions","sap/base/security/encodeXML","sap/ui/core/ComponentRegistry","sap/ui/core/Lib","sap/ui/core/Theming","sap/ui/core/theming/ThemeManager","sap/ui/core/support/ToolsAPI","sap/ui/thirdparty/URI"],function(o,t,n,i,e,s,r,a,u){"use strict";var p=function(){this._oSupportAssistantInfo={location:"",version:{},versionAsString:""}};p.prototype.setSupportAssistantLocation=function(o){this._oSupportAssistantInfo.location=o};p.prototype.setSupportAssistantVersion=function(o){this._oSupportAssistantInfo.version=o;this._oSupportAssistantInfo.versionAsString="not available";if(o){this._oSupportAssistantInfo.versionAsString=n(o.version||"");this._oSupportAssistantInfo.versionAsString+=" (built at "+n(o.buildTimestamp||"");this._oSupportAssistantInfo.versionAsString+=", last change "+n(o.scmRevision||"")+")"}};p.prototype.getSupportAssistantInfo=function(){return this._oSupportAssistantInfo};p.prototype.getAppInfo=function(){var o=[];i.forEach(function(t){var n=t.getManifestEntry("sap.app"),i=t.getManifestEntry("sap.fiori");if(n){o.push(n)}if(i){o.push(i)}});return o};p.prototype.getTechInfoJSON=function(){var n=a.getFrameworkInformation();var i={sapUi5Version:null,version:n.commonInformation.version,build:n.commonInformation.buildTime,change:n.commonInformation.lastChange,jquery:n.commonInformation.jquery,useragent:n.commonInformation.userAgent,docmode:n.commonInformation.documentMode,debug:n.commonInformation.debugMode,bootconfig:n.configurationBootstrap,config:n.configurationComputed,libraries:n.libraries,loadedLibraries:n.loadedLibraries,modules:n.loadedModules,uriparams:n.URLParameters,appurl:n.commonInformation.applicationHREF,title:n.commonInformation.documentTitle,statistics:n.commonInformation.statistics,resourcePaths:[],themePaths:[],locationsearch:document.location.search,locationhash:document.location.hash,supportAssistant:this._oSupportAssistantInfo};var p=t.getAllRequiredModules();var c=[];for(var m=0;m<p.length;m++){c.push({moduleName:p[m],relativePath:sap.ui.require.toUrl(p[m]),absolutePath:u(sap.ui.require.toUrl(p[m])).absoluteTo(document.location.origin+document.location.pathname).toString()})}i.resourcePaths=c;var l=e.all();c=[];for(var f in l){if(f===""){continue}var h=r._getThemePath(f,s.getTheme());c.push({theme:s.getTheme(),library:f,relativePath:h,absolutePath:u(h).absoluteTo(document.location.origin+document.location.pathname).toString()})}i.themePaths=c;return o.load().then(function(o){i.sapUi5Version={version:o,path:sap.ui.require.toUrl("sap-ui-version.json")};return i})};return p},true);
//# sourceMappingURL=DataCollector.js.map