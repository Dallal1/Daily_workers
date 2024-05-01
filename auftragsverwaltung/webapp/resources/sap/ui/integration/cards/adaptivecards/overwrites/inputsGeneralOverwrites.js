/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Lib"],function(e,t){"use strict";var r={};r.overwriteRequired=function(r){var n=r._renderedInputControlElement.getAttribute("role");if(n==="radiogroup"){return}r.renderedInputControlElement.removeAttribute("aria-required");if(!n){r.renderedInputControlElement.required=r.isRequired;return}if(n==="group"&&r.isRequired){var i=new e({id:r._renderedInputControlElement.id+"-InvisibleText",text:t.getResourceBundleFor("sap.ui.integration").getText("ADAPTIVE_CARDS_REQUIRED_FIELD")}).toStatic().getId();r.renderedInputControlElement.setAttribute("aria-describedby",i)}};r.overwriteLabel=function(e){if(!e._renderedLabelElement){return}var t=document.createElement("ui5-label");t.id=e._renderedLabelElement.id;t.innerText=e.label;t.for=e._renderedInputControlElement.id;t.required=e.isRequired;t.style.marginBottom=e.hostConfig.getEffectiveSpacing(e.hostConfig.inputs.label.inputSpacing)+"px";e._renderedLabelElement.remove();e._renderedLabelElement=t;e._outerContainerElement.insertBefore(e._renderedLabelElement,e.inputControlContainerElement)};r.overwriteAriaLabelling=function(e,t){if(!e._renderedInputControlElement){return}if(e._renderedLabelElement){e._renderedInputControlElement.setAttribute(t,e._renderedLabelElement.id)}else{e._renderedInputControlElement.removeAttribute(t)}};r.createValueStateElement=function(e,t){if(!e.errorMessage){return}var r=document.createElement("div");r.setAttribute("slot","valueStateMessage");r.innerText=e.errorMessage;t.appendChild(r)};return r});
//# sourceMappingURL=inputsGeneralOverwrites.js.map