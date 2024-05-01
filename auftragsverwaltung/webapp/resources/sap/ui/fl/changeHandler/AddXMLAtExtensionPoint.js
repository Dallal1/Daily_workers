/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/api/ExtensionPointRegistryAPI","sap/ui/fl/changeHandler/BaseAddXml"],function(e,n){"use strict";var t={};function i(e){var n=e.index;if(e.referencedExtensionPoint){n+=i(e.referencedExtensionPoint)}return n}t.applyChange=function(t,r,o){var a=o.view;var s=o.modifier;var d=o.viewId||s.getId(a);var u=t.getSelector();var f;return Promise.resolve().then(function(){var e=t.getExtensionPointInfo&&t.getExtensionPointInfo();if(!e){return s.getExtensionPointInfo(u.name,a)}return e}).then(function(e){f=e;if(!f){throw new Error(`AddXMLAtExtensionPoint-Error: Either no Extension-Point found by name '${u&&u.name}' or multiple Extension-Points available with the given name in the view (view.id='${d}'). Multiple Extension-points with the same name in one view are not supported!`)}(f.defaultContent||[]).forEach(function(e){if(e){s.destroy(e)}});f.defaultContent=[];f.index=i(f);if(s.targets==="xmlTree"){f.skipAdjustIndex=true}return n.applyChange(t,r,o,f)}).then(function(n){if(f.ready){f.ready(n)}e.addCreatedControlsToExtensionPointInfo({name:u.name,viewId:d,createdControlsIds:n.map(e=>s.getId(e))});return true})};t.revertChange=n.revertChange;t.completeChangeContent=function(e,t){n.completeChangeContent(e,t)};return t},true);
//# sourceMappingURL=AddXMLAtExtensionPoint.js.map