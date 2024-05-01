/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/util/changePropertyValueByPath","sap/ui/fl/util/DescriptorChangeCheck"],function(n,t){"use strict";var e=["UPDATE","UPSERT"];var a=["semanticObject","action","title","subTitle","icon","signature/parameters/*"];var i={semanticObject:"^[\\w\\*]{0,30}$",action:"^[\\w\\*]{0,60}$"};var r={applyChange(r,o){var s=r["sap.app"].crossNavigation;var p=o.getContent();t.checkEntityPropertyChange(p,a,e,i);if(s&&s.inbounds){var u=s.inbounds[p.inboundId];if(u){n(p.entityPropertyChange,u)}else{throw new Error(`Nothing to update. Inbound with ID "${p.inboundId}" does not exist.`)}}else{throw new Error("sap.app/crossNavigation or sap.app/crossNavigation/inbounds sections have not been found in manifest.json")}return r}};return r});
//# sourceMappingURL=ChangeInbound.js.map