/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/RenderManager","sap/ui/core/Supportability","sap/ui/core/support/Plugin","sap/ui/core/support/controls/InteractionSlider","sap/ui/core/support/controls/InteractionTree","sap/ui/core/support/controls/TimelineOverview","sap/m/MessageToast","sap/ui/thirdparty/jszip","sap/ui/core/util/File","sap/ui/performance/trace/Interaction","sap/ui/performance/Measurement","sap/ui/core/date/UI5Date"],function(t,e,r,i,n,s,o,a,p,c,d,u){"use strict";var h=r.extend("sap.ui.core.support.plugins.Interaction",{constructor:function(t){r.apply(this,["sapUiSupportInteraction","Interaction",t]);if(this.runsAsToolPlugin()){this._aEventIds=[this.getId()+"SetMeasurements",this.getId()+"SetActive",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"];var e=function(t,e){return("000"+String(t)).slice(-e)};this._fnFormatTime=function(t){var r=u.getInstance(t),i=Math.floor((t-Math.floor(t))*1e3);return e(r.getHours(),2)+":"+e(r.getMinutes(),2)+":"+e(r.getSeconds(),2)+"."+e(r.getMilliseconds(),3)+e(i,3)};this._oInteractionSlider=new i;this._oInteractionTree=new n({});this._oTimelineOverview=new s}else{this._aEventIds=[this.getId()+"Refresh",this.getId()+"Clear",this.getId()+"Start",this.getId()+"Stop",this.getId()+"Activate",this.getId()+"Export",this.getId()+"Import",this.getId()+"SetQueryString"]}}});h.prototype.init=function(t){r.prototype.init.apply(this,arguments);if(this.runsAsToolPlugin()){l.call(this,t)}else{S.call(this,t)}};h.prototype.exit=function(t){r.prototype.exit.apply(this,arguments)};function l(e){var r=(new t).getInterface();r.openStart("div").class("sapUiSupportToolbar").openEnd();r.openStart("button",this.getId()+"-record").class("sapUiSupportIntToggleRecordingBtn").openEnd().close("button");r.openStart("label").class("sapUiSupportIntODataLbl").openEnd();r.voidStart("input",this.getId()+"-odata").attr("type","checkbox").voidEnd();r.text("Enable OData Statistics");r.close("label");r.openStart("div").class("sapUiSupportIntFupInputMask").openEnd();r.voidStart("input",this.getId()+"-fileImport").attr("tabindex","-1").attr("size","1").attr("accept","application/zip").attr("type","file").voidEnd();r.close("div");r.openStart("button",this.getId()+"-import").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntImportBtn").class("sapUiSupportRoundedButton").openEnd().text("Import").close("button");r.openStart("button",this.getId()+"-export").class("sapUiSupportIntImportExportBtn").class("sapUiSupportIntExportBtn").class("sapUiSupportRoundedButton").class("sapUiSupportIntHidden").openEnd().text("Export").close("button");r.openStart("span",this.getId()+"-info").class("sapUiSupportIntRecordingInfo").openEnd().close("span");r.close("div");r.openStart("div").class("sapUiSupportInteractionCntnt").openEnd();r.close("div");r.openStart("div").class("sapUiPerformanceStatsDiv").class("sapUiSupportIntHidden").openEnd();r.openStart("div").class("sapUiPerformanceTimeline").openEnd().close("div");r.openStart("div").class("sapUiPerformanceTop").openEnd();r.close("div");r.openStart("div").class("sapUiPerformanceBottom").openEnd();r.close("div");r.close("div");r.flush(this.dom());r.destroy();r=(new t).getInterface();this._oTimelineOverview.render(r);r.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline"));r.destroy();r=(new t).getInterface();this._oInteractionSlider.render(r);r.flush(this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTop"));r.destroy();this._oInteractionSlider._registerEventListeners();this.$().find(".sapUiPerformanceTop").on("InteractionSliderChange",{},function(t,e,r){this._oInteractionTree.setRange(e,r)}.bind(this));this.dom("export").addEventListener("click",function(t){this.onsapUiSupportInteractionExport()}.bind(this));this.dom("fileImport").addEventListener("change",function(t){this.onsapUiSupportInteractionImport()}.bind(this));this.dom("odata").checked=this._bODATA_Stats_On;this.dom("odata").addEventListener("click",function(t){this._bODATA_Stats_On=!this._bODATA_Stats_On;this.confirmReload(function(){this._oStub.sendEvent(this._oStub.getMetadata().getClass().EventType.RELOAD_WITH_PARAMETER,{parameterName:"sap-statistics",parameterValue:this._bODATA_Stats_On})}.bind(this))}.bind(this));this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording";this.dom("record").addEventListener("click",function(t){var e=this.dom("record");if(e.dataset.state==="Stop recording"){this._oStub.sendEvent(this.getId()+"Refresh");this._oStub.sendEvent(this.getId()+"Activate",{active:false});e.dataset.state="Start recording";this._showPerfData()}else if(this.dom("record").dataset.state==="Start recording"){this._hidePerfData();this._oStub.sendEvent(this.getId()+"Clear");this._oStub.sendEvent(this.getId()+"Activate",{active:true});e.dataset.state="Stop recording"}}.bind(this))}function S(t){var r=/sap-ui-xx-fesr=(true|x|X)/.test(window.location.search);var i=e.isStatisticsEnabled();this._oStub.sendEvent(this.getId()+"SetQueryString",{queryString:{bFesrActive:r,bODATA_Stats_On:i}});f.call(this)}function f(t,e){var r=c.getActive()||this._bFesrActive;var i=[];if(r||e){i=e||c.getAll(true);var n=performance.getEntriesByType("navigation")?.[0]?.fetchStart;for(var s=0;s<i.length;s++){var o=i[s];for(var a=0;a<o.requests.length;a++){var p=o.requests[a];o.requests[a]={connectEnd:p.connectEnd,connectStart:p.connectStart,domainLookupEnd:p.domainLookupEnd,domainLookupStart:p.domainLookupStart,duration:p.duration,entryType:p.entryType,fetchStart:p.fetchStart,initiatorType:p.initiatorType,name:p.name,redirectEnd:p.redirectEnd,redirectStart:p.redirectStart,requestStart:p.requestStart,responseEnd:p.responseEnd,responseStart:p.responseStart,secureConnectionStart:p.secureConnectionStart,startTime:p.startTime,workerStart:p.workerStart,fetchStartOffset:n}}}}this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:i});this._oStub.sendEvent(this.getId()+"SetActive",{active:r})}h.prototype.onsapUiSupportInteractionSetQueryString=function(t){var e=t.getParameter("queryString");this._bFesrActive=e.bFesrActive;this._bODATA_Stats_On=e.bODATA_Stats_On;this.dom("odata").checked=this._bODATA_Stats_On;this.dom("record").dataset.state=!this._bFesrActive?"Start recording":"Stop recording"};h.prototype.onsapUiSupportInteractionSetMeasurements=function(t){this._setMeasurementsData(t.getParameter("measurements"))};h.prototype.onsapUiSupportInteractionSetActive=function(t){};h.prototype.onsapUiSupportInteractionRefresh=function(t){f.call(this)};h.prototype.onsapUiSupportInteractionClear=function(t){c.clear();this._oStub.sendEvent(this.getId()+"SetMeasurements",{measurements:[]})};h.prototype.onsapUiSupportInteractionStart=function(t){d.start(this.getId()+"-perf","Measurement by support tool")};h.prototype.onsapUiSupportInteractionEnd=function(t){h.end(true)};h.prototype.onsapUiSupportInteractionActivate=function(t){var e=t.getParameter("active");if(c.getActive()!=e){c.setActive(e)}};h.prototype.onsapUiSupportInteractionExport=function(t){var e=this.measurements||[];if(e.length>0){var r=new a;r.file("InteractionsSteps.json",JSON.stringify(e).replace(/,"isExpanded":true/g,""));var i=r.generate({type:"blob"});this._openGeneratedFile(i)}};h.prototype.onsapUiSupportInteractionImport=function(t){var e=this.dom("fileImport").files;if(e.length===0){o.show("Select a file for import first!",{autoClose:true,duration:3e3});return}if(!window.FileReader){o.show("Use a modern browser which supports FileReader!",{autoClose:true,duration:3e3});return}var r=new window.FileReader,i=e[0],n=this;r.onload=function(t){return function(t){var e=new a(t.target.result);var r=e.files["InteractionsSteps.json"]&&e.files["InteractionsSteps.json"].asText();if(r){n._setMeasurementsData(JSON.parse(r.replace(/,"isExpanded":true/g,"")))}else{o.show("Imported data does not contain interaction measures",{autoClose:true,duration:3e3})}}}(i);r.readAsArrayBuffer(i)};h.prototype._openGeneratedFile=function(t){p.save(t,"InteractionSteps","zip","application/zip")};h.prototype._setMeasurementsData=function(e){var r=0,i=100,n=function(t){var e=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].startTime<e.startTime){r=i+1;break}}return r},r=function(t,e){return t.filter(function(t){return t.timing.startTime===e})},n=function(t,e){var r=0;if(t.length===0){return r}for(var i=t.length-1;i>=0;i--){if(t[i].start<e.fetchStartOffset+e.startTime){r=i;break}}return r},s=0;t.forEach(function(t,o,a){var p=t.requests;for(var c=p.length-1;c>=0;c--){var d=p[c];if(o>0&&t.start-i>d.fetchStartOffset+d.startTime){var u=n(a,d);var h=a[u].requests;s=e(h,d);h.splice(s,0,d);p.splice(c,1);var l=r(t.sapStatistics,d.startTime);if(l.length>0){a[u].sapStatistics=a[u].sapStatistics.concat(l)}}}})};n(e);this.measurements=e;for(var s=0;s<e.length;s++){r+=e[s].requests.length}if(e.length>0){this._showPerfData();this.dom("info").textContent="Total "+r+" Requests in "+e.length+" Interactions"}else{this._hidePerfData();this.dom("info").textContent=""}var o=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceTimeline");var a=(new t).getInterface();this._oTimelineOverview.setInteractions(e);this._oTimelineOverview.render(a);a.flush(o);a.destroy();this._oInteractionSlider._initSlider();this._oInteractionSlider.setDuration(e);var p=this.dom(".sapUiPerformanceStatsDiv .sapUiPerformanceBottom");this._oInteractionTree.setInteractions(e);this._oInteractionTree.renderAt(p)};h.prototype._showPerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.remove("sapUiSupportIntHidden");this.dom("export").classList.remove("sapUiSupportIntHidden")};h.prototype._hidePerfData=function(){this.dom(".sapUiPerformanceStatsDiv").classList.add("sapUiSupportIntHidden");this.dom("export").classList.add("sapUiSupportIntHidden")};return h});
//# sourceMappingURL=Interaction.js.map