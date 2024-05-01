/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/support/supportRules/ui/controllers/BaseController","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/ui/models/SharedModel","sap/ui/support/supportRules/ui/external/ElementTree","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/ui/models/formatter","sap/ui/support/supportRules/Constants","sap/m/OverflowToolbarAssociativePopoverControls","sap/base/util/deepExtend"],function(e,t,s,i,o,r,l,n,u,a){"use strict";var d={severityIcons:{High:"sap-icon://message-error",Medium:"sap-icon://message-warning",Low:"sap-icon://message-information",All:"sap-icon://multiselect-all"}};return t.extend("sap.ui.support.supportRules.ui.controllers.Issues",{ISSUES_LIMIT:1e3,formatter:l,onInit:function(){this.model=i;this.setCommunicationSubscriptions();this.getView().setModel(this.model);this.clearFilters();this._initElementTree();this.treeTable=this.byId("issuesList");this.issueTable=this.byId("issueTable");this.toolHeader=this.byId("toolHeader");this.toolHeader.removeStyleClass("sapTntToolHeader sapContrast sapContrastPlus");this.model.setProperty("/bEnabledFilterButton",false);var e=this.toolHeader._getPopover();e.removeStyleClass("sapTntToolHeaderPopover sapContrast sapContrastPlus");u._mSupportedControls["sap.ui.layout.VerticalLayout"]={canOverflow:true,listenForEvents:[],noInvalidationProps:[]}},setCommunicationSubscriptions:function(){s.subscribe(r.ON_ANALYZE_FINISH,function(e){var t=this;var s={};t.data=e;e.issues.forEach(function(e){if(!e.context||!e.context.id){return}if(!s[e.context.id]){s[e.context.id]=[e.name]}else{s[e.context.id].push(e.name)}});this.model.setSizeLimit(this.ISSUES_LIMIT);this.model.setProperty("/issues",e.issues);this.model.setProperty("/analyzePressed",true);this.model.setProperty("/issuesCount",this.data.issues.length);this.model.setProperty("/selectedIssue",null);this.elementTree.setData({controls:e.elementTree,issuesIds:s});this.clearFilters()},this);s.subscribe(r.GET_ISSUES,function(e){this.structuredIssuesModel=e.groupedIssues;this.model.setProperty("/issues",e.issuesModel);if(e.issuesModel[0]){this._setSelectedRule(e.issuesModel[0][0]);this.treeTable.setSelectedIndex(1);this.issueTable.setSelectedIndex(0)}},this)},_initElementTree:function(){var e=this;this.elementTree=new o(null,{onIssueCountClicked:function(t){e.clearFilters();e.model.setProperty("/elementFilter",t);e.updateIssuesVisibility()},onHoverChanged:function(e){s.publish(r.TREE_ELEMENT_MOUSE_ENTER,e)},onMouseOut:function(){s.publish(r.TREE_ELEMENT_MOUSE_OUT)}})},onAfterRendering:function(){this.elementTree.setContainerId(this.byId("elementTreeContainer").getId())},clearFilters:function(){this.model.setProperty("/severityFilter",n.FILTER_VALUE_ALL);this.model.setProperty("/categoryFilter",n.FILTER_VALUE_ALL);this.model.setProperty("/elementFilter",n.FILTER_VALUE_ALL);this.model.setProperty("/audienceFilter",n.FILTER_VALUE_ALL);if(this.data){this.model.setProperty("/issues",this.data.issues);this.setToolbarHeight()}this.model.setProperty("/bEnabledFilterButton",false);this.updateIssuesVisibility()},clearFiltersAndElementSelection:function(){this.clearFilters();this.elementTree.clearSelection()},onIssuePressed:function(e){var t=this.model.getProperty("/selectedIssue");this.elementTree.setSelectedElement(t.context.id,false)},onRowSelectionChanged:function(e){if(e.getParameter("rowContext")){var t=e.getParameter("rowContext").getObject(),s=n.MAX_VISIBLE_ISSUES_FOR_RULE;if(t.type==="rule"){this._setSelectedRule(t)}else{this.model.setProperty("/selectedIssue",null)}if(t.issueCount<s){s=t.issueCount}this.model.setProperty("/visibleRowCount",s)}},openDocumentation:function(t){var i=e.getElementById(t.mParameters.id),o=i.getBindingContext().getProperty("href");s.publish(r.OPEN_URL,o)},updateIssuesVisibility:function(){if(this.data){var e=this.data.issues.filter(this.filterIssueListItems,this);s.publish(r.REQUEST_ISSUES,e);this.model.setProperty("/visibleIssuesCount",e.length)}this.setToolbarHeight()},filterIssueListItems:function(e){var t=this.model.getProperty("/severityFilter"),s=e.severity===t||t===n.FILTER_VALUE_ALL,i=this.model.getProperty("/categoryFilter"),o=e.categories&&e.categories.indexOf(i)>-1||i===n.FILTER_VALUE_ALL,r=this.model.getProperty("/elementFilter"),l=r===e.context.id||r===n.FILTER_VALUE_ALL,u=this.model.getProperty("/audienceFilter"),a=e.audiences&&e.audiences.indexOf(u)>-1||u===n.FILTER_VALUE_ALL,d=t===n.FILTER_VALUE_ALL&&i===n.FILTER_VALUE_ALL&&u===n.FILTER_VALUE_ALL&&r===n.FILTER_VALUE_ALL;this.model.setProperty("/bEnabledFilterButton",!d);return s&&o&&l&&a},setToolbarHeight:function(){this.model.setProperty("/filterBarHeight","4rem")},onReportPress:function(e){var t=e.getParameter("item"),i=t.getText(),o=this._getReportData();if(i==="View"){s.publish(r.ON_SHOW_REPORT_REQUEST,o)}else{s.publish(r.ON_DOWNLOAD_REPORT_REQUEST,o)}},_getReportData:function(){return{executionScopes:this.model.getProperty("/executionScopes"),executionScopeTitle:this.model.getProperty("/executionScopeTitle"),analysisDurationTitle:this.model.getProperty("/analysisDurationTitle")}},onRowSelection:function(e){if(e.getParameter("rowContext")){var t=e.getParameter("rowContext").getObject();this.elementTree.setSelectedElement(t.context.id,false);this.model.setProperty("/selectedIssue/details",t.details)}},_setSelectedRule:function(e){var t,s;if(this.model.getProperty("/visibleIssuesCount")>0){t=this.structuredIssuesModel[e.ruleLibName][e.ruleId];s=a({},e);s.issues=t;s.resolutionUrls=t[0].resolutionUrls;this.issueTable.setSelectedIndex(0);this.model.setProperty("/selectedIssue/details",s.details);this.model.setProperty("/selectedIssue",s);this._setIconAndColorToIssue(s.issues)}else{this.model.setProperty("/selectedIssue",null)}},_setIconAndColorToIssue:function(e){e.forEach(function(e){switch(e.severity){case n.SUPPORT_ASSISTANT_ISSUE_SEVERITY_LOW:e.severityIcon=d.severityIcons.Low;e.severityColor=n.SUPPORT_ASSISTANT_SEVERITY_LOW_COLOR;break;case n.SUPPORT_ASSISTANT_ISSUE_SEVERITY_MEDIUM:e.severityIcon=d.severityIcons.Medium;e.severityColor=n.SUPPORT_ASSISTANT_SEVERITY_MEDIUM_COLOR;break;case n.SUPPORT_ASSISTANT_ISSUE_SEVERITY_HIGH:e.severityIcon=d.severityIcons.High;e.severityColor=n.SUPPORT_ASSISTANT_SEVERITY_HIGH_COLOR;break}})}})});
//# sourceMappingURL=Issues.controller.js.map