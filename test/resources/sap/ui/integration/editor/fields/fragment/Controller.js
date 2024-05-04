/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/mvc/Controller"],function(t,e){"use strict";var i=e.extend("sap.ui.integration.editor.fields.fragment.Controller",{});i.prototype.init=function(){};i.prototype.setField=function(t){this._oField=t};i.prototype.saveValue=function(e){var i=t.getLanguage().replaceAll("_","-");var n=this._oField.getConfiguration();if(n.type==="string"&&n.translatable){this._oField.setTranslationValueInTexts(i,n.manifestpath,e)}else{this._oField._settingsModel.setProperty(n.manifestpath,e)}};return i});
//# sourceMappingURL=Controller.js.map