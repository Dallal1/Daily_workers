/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.loader.config({shim:{"sap/ui/codeeditor/js/ace/ace":{exports:"ace"},"sap/ui/codeeditor/js/ace/ext-language_tools":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/ext-beautify":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/mode-javascript":{deps:["sap/ui/codeeditor/js/ace/ace"]},"sap/ui/codeeditor/js/ace/mode-json":{deps:["sap/ui/codeeditor/js/ace/ace"]}}});sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Lib","sap/ui/core/RenderManager","sap/ui/core/ResizeHandler","sap/ui/core/Theming","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery","sap/ui/codeeditor/js/ace/ace","sap/ui/codeeditor/js/ace/ext-language_tools","sap/ui/codeeditor/js/ace/ext-beautify","sap/ui/codeeditor/js/ace/mode-javascript","sap/ui/codeeditor/js/ace/mode-json"],function(e,t,i,o,r,s,a,jQuery,n){"use strict";var d=t.extend("sap.ui.codeeditor.CodeEditor",{metadata:{library:"sap.ui.codeeditor",properties:{value:{type:"string",group:"Misc",defaultValue:""},type:{type:"string",group:"Appearance",defaultValue:"javascript"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},editable:{type:"boolean",group:"Behavior",defaultValue:true},lineNumbers:{type:"boolean",group:"Behavior",defaultValue:true},valueSelection:{type:"boolean",group:"Behavior",defaultValue:false},maxLines:{type:"int",group:"Behavior",defaultValue:0},colorTheme:{type:"string",group:"Behavior",defaultValue:"default"},syntaxHints:{type:"boolean",group:"Behavior",defaultValue:true}},events:{liveChange:{parameters:{value:{type:"string"},editorEvent:{type:"object"}}},change:{parameters:{value:{type:"string"},oldValue:{type:"string"}}}},defaultProperty:"content"},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t).class("sapCEd").style("width",t.getWidth()).style("height",t.getHeight()).attr("data-sap-ui-syntaxhints",t.getSyntaxHints()).attr("role","application").attr("aria-roledescription",i.getResourceBundleFor("sap.ui.codeeditor").getText("CODEEDITOR_ROLE_DESCRIPTION"));var o=t.getTooltip_AsString();if(o){e.attr("title",o)}e.openEnd();e.close("div")}}});var u=sap.ui.require.toUrl("sap/ui/codeeditor/js/ace");n.config.set("basePath",u);n.config.set("loadWorkerFromBlob",false);n.config.set("useStrictCSP",true);var p=n.require("ace/ext/language_tools");d.prototype.init=function(){this._bIsRenderingPhase=false;this._oEditorDomRef=document.createElement("div");this._oEditorDomRef.id=this.getId()+"-editor";this._oEditorDomRef.style.height="100%";this._oEditorDomRef.style.width="100%";this._oEditor=n.edit(this._oEditorDomRef);var e=this._oEditor.getSession();e.setUseWorker(false);e.setValue("");e.setUseWrapMode(true);e.setMode("ace/mode/javascript");a(sap.ui.require.toUrl("sap/ui/codeeditor/js/ace/css/ace.css"),"sap-ui-codeeditor-ace");this._applyTheme();this._oEditor.setOptions({enableBasicAutocompletion:true,enableSnippets:true,enableLiveAutocompletion:true,enableKeyboardAccessibility:true});this._oEditor.textInput.getElement().id=this.getId()+"-editor-textarea";this._oEditor.renderer.setShowGutter(true);this._oEditor.addEventListener("change",function(e){if(!this.getEditable()){return}var t=this.getCurrentValue();this.fireLiveChange({value:t,editorEvent:e})}.bind(this));this._oEditor.addEventListener("blur",function(){if(this._bIsRenderingPhase){return}var e=this.getCurrentValue(),t=this.getValue();this.setProperty("value",e,true);if(e!=t&&this.getEditable()){this.fireChange({value:e,oldValue:t})}}.bind(this));this._oEditor.addEventListener("showGutterTooltip",function(e){var t=jQuery(e.$element),i=t.parents(".sapMDialog");if(i&&i.css("transform")){var o=i.position();t.css("transform","translate(-"+o.left+"px, -"+o.top+"px)")}})};d.prototype.exit=function(){this._deregisterResizeListener();this._oEditor.destroy();this._oEditor.getSession().setUseWorker(false);jQuery(this._oEditorDomRef).remove();this._oEditorDomRef=null;this._oEditor=null};d.prototype.onThemeChanged=function(){this._applyTheme()};d.prototype._applyTheme=function(){var e=s.getTheme().toLowerCase();var t="tomorrow";if(e.indexOf("hcb")>-1){t="chaos"}else if(e.indexOf("hcw")>-1){t="github"}else if(e==="sap_fiori_3"){t="crimson_editor"}else if(e==="sap_fiori_3_dark"){t="clouds_midnight"}else if(e==="sap_horizon_dark"){t="nord_dark"}this.setColorTheme(t)};d.prototype.onBeforeRendering=function(){this._bIsRenderingPhase=true;var e=this.getDomRef();if(e&&!o.isPreservedContent(e)){o.preserveContent(e)}this._deregisterResizeListener()};d.prototype.onAfterRendering=function(){this._bIsRenderingPhase=false;var e=this.getDomRef(),t=this.getMetadata().getPropertyDefaults();setTimeout(function(){if(this.getMaxLines()===t.maxLines&&this.getHeight()===t.height&&e.height<20){e.style.height="3rem"}}.bind(this),0);e.appendChild(this._oEditorDomRef);this._oEditor.setReadOnly(!this.getEditable());this._oEditor.getSession().setMode("ace/mode/"+this.getType());this._oEditor.setOption("maxLines",this.getMaxLines());this._oEditor.renderer.setShowGutter(this.getLineNumbers());this._oEditor.getSession().setValue(this.getValue());if(!this.getValueSelection()){this._oEditor.selection.clearSelection()}this._oEditor.renderer.updateText();this._oEditor.resize();this._registerResizeListener()};d.prototype.getIdForLabel=function(){return this.getId()+"-editor-textarea"};d.prototype._registerResizeListener=function(){if(!this._iResizeListenerId){this._iResizeListenerId=r.register(this._oEditorDomRef,function(){this._oEditor.resize()}.bind(this))}};d.prototype._deregisterResizeListener=function(){if(this._iResizeListenerId){r.deregister(this._iResizeListenerId);this._iResizeListenerId=null}};d.prototype.setColorTheme=function(e){this.setProperty("colorTheme",e,true);if(e==="default"){e="tomorrow"}else if(e==="hcb"){e="tomorrow_night"}else if(e==="hcb_bright"){e="tomorrow_night_bright"}else if(e==="hcb_blue"){e="tomorrow_night_blue"}this._oEditor.setTheme("ace/theme/"+e);a(sap.ui.require.toUrl("sap/ui/codeeditor/js/ace/css/theme/"+e+".css"),"sap-ui-codeeditor-theme-"+e);return this};d.prototype.getCurrentValue=function(){return this._oEditor.getValue()};d.prototype.addCustomCompleter=function(e){p.addCompleter({getCompletions:function(t,i,o,r,s){e.getCompletions(s,{oPos:o,sPrefix:r})}})};d.prototype.getInternalEditorInstance=function(){return this._oEditor};d.prototype.getAceEditor=function(){return this._oEditor};d.prototype.prettyPrint=function(){n.require("ace/ext/beautify").beautify(this._oEditor.session)};d.prototype.onfocusout=function(){this._oEditor.getSession().setUseWorker(false)};d.prototype.onfocusin=function(){this._oEditor.getSession().setUseWorker(true)};d.prototype.getFocusDomRef=function(){const e=this.getDomRef();if(!e){return null}if(document.activeElement===e.querySelector(".ace_text-input")){return e.querySelector(".ace_text-input")}return e.querySelector(".ace_scroller.ace_keyboard-focus")};return d});
//# sourceMappingURL=CodeEditor.js.map