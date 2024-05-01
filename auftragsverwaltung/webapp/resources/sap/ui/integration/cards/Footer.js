/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/base/util/merge","sap/ui/core/Element","sap/ui/integration/controls/ActionsStrip","sap/ui/integration/controls/Paginator","sap/ui/integration/util/BindingHelper"],function(t,i,n,e,a,r){"use strict";var o=t.extend("sap.ui.integration.cards.Footer",{metadata:{properties:{configuration:{type:"object"}},aggregations:{actionsStrip:{type:"sap.ui.integration.controls.ActionsStrip",multiple:false},paginator:{type:"sap.ui.integration.controls.Paginator",multiple:false}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(t,i){var n=i.getActionsStrip(),e=i.getPaginator();t.openStart("div",i).class("sapFCardFooter");if(n){t.class("sapFCardFooterWithActionsStrip")}if(i.getCardInstance().isLoading()&&i._hasBinding()){t.class("sapFCardFooterLoading")}t.openEnd();if(e){t.renderControl(e)}if(n){t.renderControl(n)}t.close("div")}}});o.prototype.onDataChanged=function(){if(this.getActionsStrip()){this.getActionsStrip().onDataChanged()}};o.prototype._hasBinding=function(){var t=r.createBindingInfos(this.getConfiguration(),this.getCardInstance().getBindingNamespaces());return(t.actionsStrip||[]).some(function(t){for(var i in t){if(r.isBindingInfo(t[i])){return true}}return false})};o.prototype.getCardInstance=function(){return n.getElementById(this.getCard())};o.prototype.setEnabled=function(t){var i=this.getActionsStrip();if(!i){return}if(t){i.enableItems()}else{i.disableItems()}};o.prototype.getStaticConfiguration=function(){var t=i({},this.getConfiguration()),n=this.getPaginator();if(n){t.paginator=n.getStaticConfiguration()}return t};o.create=function(t,i){return new o({configuration:r.createBindingInfos(i,t.getBindingNamespaces()),card:t,actionsStrip:e.create(i.actionsStrip,t,true),paginator:a.create(t,i.paginator),visible:i.visible})};return o});
//# sourceMappingURL=Footer.js.map