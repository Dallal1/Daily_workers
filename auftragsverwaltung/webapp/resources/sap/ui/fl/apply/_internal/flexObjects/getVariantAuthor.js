/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/fl/Layer","sap/ui/fl/registry/Settings"],function(e,t,r){"use strict";return(n,s)=>{const u=n.getSupportInformation().user||"";const i=r.getInstanceOrUndef();if(n.getLayer()===t.USER||u===i?.getUserId()){return e.getResourceBundleFor("sap.ui.fl").getText("VARIANT_SELF_OWNER_NAME")}if(![t.PUBLIC,t.CUSTOMER].includes(n.getLayer())){return u}return s?.[u]||u}});
//# sourceMappingURL=getVariantAuthor.js.map