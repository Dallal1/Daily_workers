/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;class i{language;script;region;variant;variantSubtags;extension;extensionSubtags;privateUse;privateUseSubtags;constructor(i){var e=t.exec(i.replace(/_/g,"-"));if(e===null){throw new TypeError("The given language tag '"+i+"' does not adhere to BCP-47.")}this.language=e[1]||null;this.script=e[2]||null;this.region=e[3]||null;this.variant=e[4]&&e[4].slice(1)||null;this.variantSubtags=this.variant?this.variant.split("-"):[];this.extension=e[5]&&e[5].slice(1)||null;this.extensionSubtags=this.variant?this.variant.split("-"):[];this.privateUse=e[6]||null;this.privateUseSubtags=this.privateUse?this.privateUse.slice(2).split("-"):[];if(this.language){this.language=this.language.toLowerCase()}if(this.script){this.script=this.script.toLowerCase().replace(/^[a-z]/,function(t){return t.toUpperCase()})}if(this.region){this.region=this.region.toUpperCase()}Object.freeze(this)}toString(){return this.#t(this.language,this.script,this.region,this.variant,this.extension,this.privateUse)}#t(){return Array.prototype.filter.call(arguments,Boolean).join("-")}}return i});
//# sourceMappingURL=LanguageTag.js.map