/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Lib","sap/ui/integration/library","sap/ui/core/library","sap/ui/dom/includeScript","sap/ui/integration/cards/BaseContent","sap/ui/integration/cards/adaptivecards/elements/hostConfig","sap/m/VBox","sap/ui/core/HTML","sap/ui/model/json/JSONModel","sap/base/Log"],function(t,e,n,i,a,r,o,s,d,p,u){"use strict";var l,c,g,h,f,C,m,y,v,_;var b=i.MessageType;var I=r.extend("sap.ui.integration.cards.AdaptiveContent",{metadata:{library:"sap.ui.integration"},renderer:{apiVersion:2,render:function(t,e){var n=r.getMetadata().getRenderer();return n.render.apply(this,arguments)}}});I.prototype.init=function(){r.prototype.init.apply(this,arguments);this.awaitEvent("_adaptiveCardElementsReady");this.fireEvent("_actionContentReady");this.setComponentsReady(false);this._setupCardContent()};I.prototype.onAfterRendering=function(){this._renderMSCardContent(this._oCardTemplate||this.getConfiguration())};I.prototype.loadDependencies=function(t){var e=[this._loadWebcomponents()];e.push(new Promise(function(t,e){sap.ui.require(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/thirdparty/adaptivecards-templating","sap/ui/integration/cards/adaptivecards/elements/UI5InputText","sap/ui/integration/cards/adaptivecards/elements/UI5InputNumber","sap/ui/integration/cards/adaptivecards/elements/UI5InputChoiceSet","sap/ui/integration/cards/adaptivecards/elements/UI5InputTime","sap/ui/integration/cards/adaptivecards/elements/UI5InputDate","sap/ui/integration/cards/adaptivecards/elements/UI5InputToggle","sap/ui/integration/cards/adaptivecards/overwrites/ActionRender"],function(e,n,i,a,r,o,s,d,p){l=e;c=n;h=i;f=a;C=r;m=o;y=s;v=d;_=p;this._setupAdaptiveCardDependency();t()}.bind(this),e)}.bind(this)));if(t.get("/sap.card/configuration/enableMarkdown")){e.push(new Promise(function(t,e){sap.ui.require(["sap/ui/integration/thirdparty/markdown-it"],function(e){g=e;t()},e)}))}return Promise.all(e)};I.prototype._setupCardContent=function(){var t=new d(this.getId()+"content",{preferDOM:false,content:"<div>&nbsp;</div>"});this.setAggregation("_content",new s({items:[t]}))};I.prototype.applyConfiguration=function(){var t=this.getConfiguration();if(t&&t.request&&t.request.url){this._loadManifestFromUrl(t.request.url);return}this._handleMarkDown();this._setupMSCardContent()};I.prototype.onThemeChanged=function(){if(this.getDomRef()&&l){this._adjustHostConfig();this.invalidate()}};I.prototype._handleMarkDown=function(){var t=this;l.AdaptiveCard.onProcessMarkdown=function(e,n){var i=t.getParent(),a=i&&i.getManifestEntry("/sap.card/configuration/enableMarkdown");if(a){n.outputHtml=(new g).render(e);n.didProcess=true;return n}}};I.prototype._loadManifestFromUrl=function(t){var e=new p,n=this;e.loadData(t).then(function(){n.setConfiguration(Object.assign(n.getConfiguration(),e.getData()))}).then(function(){n._handleMarkDown();n._setupMSCardContent()}).then(function(){e.destroy();e=null}).catch(function(){this.fireEvent("_dataReady");this.fireEvent("_adaptiveCardElementsReady");u.error("No JSON file found on this URL. Please provide a correct path to the JSON-serialized card object model file.")}.bind(this))};I.prototype._setupAdaptiveCardDependency=function(){this.adaptiveCardInstance=new l.AdaptiveCard;this._doMSCardsOverwrites();this._adjustHostConfig();this._handleActions();this._replaceElements();this._isRtl()};I.prototype._doMSCardsOverwrites=function(){l.Action.prototype.render=_};I.prototype._adjustHostConfig=function(){this.adaptiveCardInstance.hostConfig=new l.HostConfig(o())};I.prototype._isRtl=function(){this.adaptiveCardInstance.isRtl=function(){return t.getRTL()}};I.prototype._handleActions=function(){this.adaptiveCardInstance.onExecuteAction=function(t){var e,i,a;if(t instanceof l.OpenUrlAction){i={url:t.url};e=n.CardActionType.Navigation}else if(t instanceof l.SubmitAction){this.getModel("form").setProperty("/",t.data);e=n.CardActionType.Submit}else{return}a=this.getActions();if(a){a.fireAction(this,e,i)}}.bind(this)};I.prototype.onActionSubmitStart=function(t){this.getParent().setBusy(true)};I.prototype.onActionSubmitEnd=function(t,n){var i=e.getResourceBundleFor("sap.ui.integration"),a=n?i.getText("CARDS_ADAPTIVE_ACTION_SUBMIT_ERROR"):i.getText("CARDS_ADAPTIVE_ACTION_SUBMIT_SUCCESS"),r=n?b.Error:b.Success;this.showMessage(a,r);this.getParent().setBusy(false)};I.prototype._replaceElements=function(){l.GlobalRegistry.elements.unregister("Input.Text");l.GlobalRegistry.elements.register("Input.Text",h);l.GlobalRegistry.elements.unregister("Input.Number");l.GlobalRegistry.elements.register("Input.Number",f);l.GlobalRegistry.elements.unregister("Input.ChoiceSet");l.GlobalRegistry.elements.register("Input.ChoiceSet",C);l.GlobalRegistry.elements.unregister("Input.Time");l.GlobalRegistry.elements.register("Input.Time",m);l.GlobalRegistry.elements.unregister("Input.Date");l.GlobalRegistry.elements.register("Input.Date",y);l.GlobalRegistry.elements.unregister("Input.Toggle");l.GlobalRegistry.elements.register("Input.Toggle",v)};I.prototype.setCardDataProvider=function(t){this._oCardDataProvider=t};I.prototype._setupMSCardContent=function(){var t=this.getConfiguration(),e,n=this._oCardDataProvider;if(!this.adaptiveCardInstance||!t){return}e=t.$data||t.data;if(!e&&!n){this._oCardTemplate=null;this._renderMSCardContent(t);this.fireEvent("_dataReady");return}if(t.$data){e={json:e}}this.setDataConfiguration(e)};I.prototype.onDataChanged=function(){var t=this.getBindingContext().getPath(),e=this.getModel().getProperty(t);this._oCardTemplate=this._setTemplating(this.getConfiguration(),e);this.invalidate()};I.prototype._renderMSCardContent=function(t){var e=this.getAggregation("_content").getItems()[0].$(),n=!!this.isLoading();this.setBusy(n);this.getAggregation("_content").toggleStyleClass("sapFCardContentHidden",n);if(this.adaptiveCardInstance&&t&&e.length){this.adaptiveCardInstance.parse(t);e.html(this.adaptiveCardInstance.render());this.fireEvent("_adaptiveCardElementsReady");if(this.adaptiveCardInstance.renderedElement){this.adaptiveCardInstance.renderedElement.tabIndex=-1}}};I.prototype._setTemplating=function(t,e){var n=new c.Template(t);return n.expand({$root:e})};I.prototype._loadWebcomponents=function(){if(this.getComponentsReady()){u.debug("WebComponents were already loaded");return Promise.resolve()}return new Promise(function(t,e){setTimeout(function(){if(window.customElements.get("ui5-button")){t();return}a({id:"webcomponents-bundle",attributes:{type:"module"},url:sap.ui.require.toUrl("sap/ui/integration/thirdparty/webcomponents/bundle.esm.js")}).then(t)})}).then(function(){this.setComponentsReady(true)}.bind(this))};I.prototype.setComponentsReady=function(t){this._bComponentsReady=t;return this};I.prototype.getComponentsReady=function(){return!!this._bComponentsReady};return I});
//# sourceMappingURL=AdaptiveContent.js.map