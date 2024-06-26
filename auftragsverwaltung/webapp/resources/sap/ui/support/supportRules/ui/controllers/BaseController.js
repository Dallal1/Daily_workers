/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/ui/models/SelectionUtils"],function(e,t,s,o){"use strict";return e.extend("sap.ui.support.supportRules.ui.controllers.BaseController",{persistExecutionScope:function(){var e={analyzeContext:this.model.getProperty("/analyzeContext"),subtreeExecutionContextId:this.model.getProperty("/subtreeExecutionContextId")},s=this.model.getProperty("/executionScopeComponents");t.setSelectedScopeComponents(s);t.setSelectedContext(e)},persistVisibleColumns:function(){var e=[],s=o.treeTable.getColumns();s.forEach(function(t){if(t.getVisible()){e.push(t.sId)}});t.setVisibleColumns(e)},deletePersistedData:function(){t.deletePersistenceCookie(s.COOKIE_NAME);this.getView().getModel().setProperty("/persistingSettings",false);t.removeAllData()}})});
//# sourceMappingURL=BaseController.js.map