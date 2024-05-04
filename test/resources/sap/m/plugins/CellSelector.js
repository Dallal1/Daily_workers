/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/base/i18n/Localization","sap/base/util/deepEqual","sap/ui/events/KeyCodes","sap/ui/core/Element","sap/base/Log"],function(e,t,o,i,n,s){"use strict";var r={ROW:"row",COL:"col"};var l=e.extend("sap.m.plugins.CellSelector",{metadata:{library:"sap.m",properties:{rangeLimit:{type:"int",group:"Behavior",defaultValue:200},enabled:{type:"boolean",defaultValue:true}},events:{}}});l.findOn=e.findOn;const a={onkeydown:function(e){if(!this._bSelecting){return}if(f(e,i.A,true,true)||f(e,i.A,false,true)&&e.isMarked(this.getConfig("eventClearedAll"))){if(h(e.target,this.getConfig("tableCell"))){this.removeSelection();e.preventDefault()}}}};const c={onBeforeRendering:function(){this._iRtl=t.getRTL()?-1:1;if(this._oResizer){this._oResizer.remove();this._oResizer=null}if(this._bSelecting){this.removeSelection()}},onAfterRendering:function(){this._deregisterEvents();this._registerEvents()},onsapspace:function(e){if(!this._isSelectableCell(e.target)){return}this._startSelection(e,false)},onsapupmodifiers:function(e){this._onsaparrowmodifiers(e,r.ROW,-1,0)},onsapdownmodifiers:function(e){this._onsaparrowmodifiers(e,r.ROW,1,0)},onsapleftmodifiers:function(e){this._onsaparrowmodifiers(e,r.COL,0,-1)},onsaprightmodifiers:function(e){this._onsaparrowmodifiers(e,r.COL,0,1)},onsapescape:function(e){if(e.isMarked()){return}if(this._bSelecting&&h(e.target,this.getConfig("tableCell"))){this.removeSelection();e.preventDefault();e.stopPropagation()}},onkeyup:function(e){if(e.isMarked()){return}var t=this._bSelecting?this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget):undefined;if(f(e,i.SPACE,true,false)){if(this._inSelection(e.target)){var o=this.getConfig("getCellInfo",this.getControl(),e.target);this.getConfig("selectRows",this.getControl(),t.from.rowIndex,t.to.rowIndex,o.rowIndex);e.setMarked()}e.preventDefault()}else if(this._bSelecting&&f(e,i.SPACE,false,true)){if(!this._inSelection(e.target)){var o=this.getConfig("getCellInfo",this.getControl(),e.target);t.from.colIndex=t.to.colIndex=o.colIndex}t.from.rowIndex=0;t.to.rowIndex=Infinity;this._selectCells(t.from,t.to);e.preventDefault()}},onmousedown:function(e){if(e.isMarked?.()||e.button!=0){return}if(e.ctrlKey||e.metaKey){this._startSelection(e)}var t=this._getSelectableCell(e.target);if(t){this._bMouseDown=true;this._mClickedCell=this._oPreviousCell=this.getConfig("getCellInfo",this.getControl(),t)}},onmouseup:function(e){this._bMouseDown=false;this._bBorderDown=false;this._mClickedCell=undefined;this._bScrolling=false;this._oPreviousCell=undefined;this._clearScroller()}};l.prototype.onActivate=function(e){e.addDelegate(c,true,this);e.addDelegate(a,false,this);this._oSession={cellRefs:[]};this._mTimeouts={};this._fnControlUpdate=function(e){if(this._bScrolling){this._scrollSelect(this._oSession.scrollForward,this._oSession.isVertical,e)}else{if(!this._oSession.mSource||!this._oSession.mTarget){return}const e=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);this._drawSelection(e)}}.bind(this);this._fnOnMouseEnter=this._onmouseenter.bind(this);this._fnOnMouseOut=this._onmouseout.bind(this);this._fnOnMouseMove=this._onmousemove.bind(this);this._fnOnMouseUp=c.onmouseup.bind(this);this._fnRemoveSelection=this.removeSelection.bind(this);this._registerEvents();this._onSelectableChange()};l.prototype.onDeactivate=function(e){e.removeDelegate(c,this);e.removeDelegate(a,this);if(this._oSession){this.removeSelection();this._oSession=null;this._mTimeouts=null}this._deregisterEvents();this._onSelectableChange()};l.prototype.exit=function(){if(this.getControl()&&!this.getControl().isDestroyed()&&this._oSession){this.removeSelection()}this._deregisterEvents();this._oSession=null;this._mTimeouts=null;e.prototype.exit.call(this)};l.prototype.isSelectable=function(){return this.isActive()?this.getConfig("isSupported",this.getControl()):false};l.prototype.hasSelection=function(){return Boolean(this._bSelecting&&this._oSession?.mSource)};l.prototype._onSelectableChange=function(){this.getPlugin("sap.m.plugins.CopyProvider")?.onCellSelectorSelectableChange(this)};l.prototype._onSelectionChange=function(){this.fireEvent("selectionChange")};l.prototype._registerEvents=function(){var e=this.getControl();if(e){e.attachEvent(this.getConfig("scrollEvent"),this._fnControlUpdate);this.getConfig("attachSelectionChange",e,this._fnRemoveSelection);var t=e.getDomRef(this.getConfig("scrollArea"));if(t){t.addEventListener("mouseleave",this._fnOnMouseOut);t.addEventListener("mouseenter",this._fnOnMouseEnter)}}document.addEventListener("mousemove",this._fnOnMouseMove);document.addEventListener("mouseup",this._fnOnMouseUp)};l.prototype._deregisterEvents=function(){var e=this.getControl();if(e){e.detachEvent(this.getConfig("scrollEvent"),this._fnControlUpdate);this.getConfig("detachSelectionChange",e,this._fnRemoveSelection);var t=e.getDomRef(this.getConfig("scrollArea"));if(t){t.removeEventListener("mouseleave",this._fnOnMouseOut);t.removeEventListener("mouseenter",this._fnOnMouseEnter)}}document.removeEventListener("mousemove",this._fnOnMouseMove);document.removeEventListener("mouseup",this._fnOnMouseUp)};l.prototype.getSelectionRange=function(e){if(!this._bSelecting){return null}var t=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget,true);if(isNaN(t.from.rowIndex)||isNaN(t.to.rowIndex)){return null}var o=this.getConfig("getVisibleColumns",this.getControl()).length-1;t.from.colIndex=Math.max(t.from.colIndex,0);t.to.colIndex=Math.min(t.to.colIndex,o);t.from.rowIndex=Math.max(t.from.rowIndex,0);if(e){t.ignoredRows=[];const e=this.getSelectedRowContexts();e.forEach((e,o)=>{const i=t.from.rowIndex+o;if(g(this._getBinding(),e,i)){t.ignoredRows.push(i)}})}return t};l.prototype.getSelectedRowContexts=function(){var e=this.getSelectionRange();if(!e){return[]}return this.getConfig("getSelectedRowContexts",this.getControl(),e.from.rowIndex,e.to.rowIndex,this.getRangeLimit())};l.prototype.getSelection=function(e){var t=this.getSelectionRange();if(!t){return{rows:[],columns:[]}}var o=this.getConfig("getSelectedRowContexts",this.getControl(),t.from.rowIndex,t.to.rowIndex,this.getRangeLimit());if(e){o=o.filter((e,o)=>!g(this._getBinding(),e,o+t.from.rowIndex))}var i=this.getConfig("getVisibleColumns",this.getControl()).slice(t.from.colIndex,t.to.colIndex+1);if(this.getControl().getParent().isA("sap.ui.mdc.Table")){i=i.map(function(e){return n.getElementById(e.getId().replace(/\-innerColumn$/,""))})}return{rows:o,columns:i}};l.prototype._onsaparrowmodifiers=function(e,t,o,i){if(!this._shouldBeHandled(e)||!e.shiftKey||!this._isSelectableCell(e.target)){return}var n=this._getSelectableCell(e.target);if(!n){return}var s=this.getConfig("getCellInfo",this.getControl(),n);if(!this._inSelection(e.target)||!this._oSession.mSource||!this._oSession.mTarget){if(this.getConfig("isRowSelected",this.getControl(),s.rowIndex)){return}this._oSession.mSource=this._oSession.mTarget=s}var l=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);const{from:a,to:c,focus:h}=this._getUpdatedBounds(o,i*this._iRtl,s);if(h[t+"Index"]<0||h.colIndex>=this.getConfig("getVisibleColumns",this.getControl()).length){return}this.getConfig("focusCell",this.getControl(),h,o>0);if(t==r.ROW&&(s.rowIndex==l.from.rowIndex||s.rowIndex==l.to.rowIndex)||t==r.COL&&(s.colIndex==l.from.colIndex||s.colIndex==l.to.colIndex)){this._bSelecting=true;this._selectCells(a,c)}e.setMarked();e.preventDefault();e.stopPropagation()};l.prototype._onmousemove=function(e){if(this._bSelecting&&!this._bMouseDown){var t=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);this._updateResizers(t,e.clientX,e.clientY)}var o=this._getSelectableCell(e.target);if(!o||!this._bMouseDown){return}var i=this.getConfig("getCellInfo",this.getControl(),o);if(i.rowIndex==this._oPreviousCell?.rowIndex&&i.colIndex==this._oPreviousCell?.colIndex){return}this._oPreviousCell=i;window.getSelection().removeAllRanges();if(this._bBorderDown&&!this._bScrolling){var n=this._oSession.border;var s={colIndex:isNaN(n.colIndex)?0:i.colIndex-n.colIndex,rowIndex:isNaN(n.rowIndex)?0:i.rowIndex-n.rowIndex};if(s.rowIndex!=0||s.colIndex!=0){const{from:e,to:t}=this._getUpdatedBounds(s.rowIndex,s.colIndex,n);this._selectCells(e,t)}}else{this._startSelection(e,true)}};l.prototype._onmouseout=function(e){var t=this.getControl().getDomRef(this.getConfig("scrollArea"));if(!t||!this._bMouseDown){return}var o=t.getBoundingClientRect();var i,n;this._bScrolling=false;if(e.clientY>o.bottom||e.clientY<o.top){this._oSession.scrollForward=i=e.clientY>o.bottom;this._oSession.isVertical=n=true;this._bScrolling=true}if(e.clientX>o.right||e.clientX<o.left){this._oSession.scrollForward=i=e.clientX>o.right;this._oSession.isVertical=n=false;this._bScrolling=true}if(this._bScrolling){this._doScroll(i,n,e)}};l.prototype._onmouseenter=function(e){this._bScrolling=false;this._clearScroller()};l.prototype._doScroll=function(e,t,o){this._clearScroller();if(this._bScrolling){this.getConfig("scroll",this.getControl(),e,t);this._mTimeouts.scrollTimerId=setTimeout(this._doScroll.bind(this,e,t),500);if(!t){this._scrollSelect(e,t,o)}}};l.prototype._scrollSelect=function(e,t,o){if(!this._bSelecting){return}var i=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);if(this._bScrolling){var n=t?r.ROW:r.COL;var s={row:0,col:0};var l=e?"to":"from";s[n]=e?1:-1;let o=i[l];if(this._bBorderDown){o=this._oSession.border}const{from:a,to:c}=this._getUpdatedBounds(s[r.ROW],s[r.COL],o);this._selectCells(a,c)}};l.prototype._clearScroller=function(){if(this._mTimeouts.scrollTimerId){window.clearTimeout(this._mTimeouts.scrollTimerId);this._mTimeouts.scrollTimerId=null}};l.prototype._onborderdown=function(e){this._oSession.border=Object.assign({},this._oCurrentBorder);this._bBorderDown=true;this._bMouseDown=true};l.prototype._getSelectableCell=function(e){return e?.closest(`.${this.getConfig("selectableCells")}`)};l.prototype._isSelectableCell=function(e){return e?.classList.contains(this.getConfig("selectableCells"))};l.prototype._inSelection=function(e){var t=this.getConfig("getCellInfo",this.getControl(),e);if(!t||!this._oSession.mSource||!this._oSession.mTarget){return false}var o=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);return!(t.rowIndex<o.from.rowIndex||t.rowIndex>o.to.rowIndex||t.colIndex<o.from.colIndex||t.colIndex>o.to.colIndex)};l.prototype._startSelection=function(e,t){if(!this._shouldBeHandled(e)){return}var o=this._getSelectableCell(e.target);if(!o){return}if(this._inSelection(o)&&!t){this.removeSelection()}else{var i=this.getConfig("getCellInfo",this.getControl(),o);var n=this._mClickedCell?this._mClickedCell:i;this._bSelecting=true;this._oSession.mSource=i;this._selectCells(n,i);this.getConfig("focusCell",this.getControl(),i)}e.preventDefault();e.setMarked&&e.setMarked()};l.prototype._getUpdatedBounds=function(e,t,o){var i=this._getNormalizedBounds(this._oSession.mSource,this._oSession.mTarget);var n=Object.assign({},o);var s=n.rowIndex==i.from.rowIndex?"from":"to";var r=n.colIndex==i.from.colIndex?"from":"to";i[s].rowIndex+=e;i[r].colIndex+=t;if(!this._bBorderDown){n.rowIndex=Math.max(0,n.rowIndex+e);n.colIndex=Math.max(0,n.colIndex+t)}else{this._oSession.border.rowIndex+=e;this._oSession.border.colIndex+=t}return{from:i.from,to:i.to,focus:n}};l.prototype._selectCells=function(e,t){if(!this._bSelecting){return}e=e?e:this._oSession.mSource;t=t?t:this._oSession.mTarget;var i=this._getNormalizedBounds(e,t);if(t.rowIndex==Infinity||e.rowIndex==Infinity){this.getConfig("loadContexts",this.getControl(),i.from.rowIndex,this.getRangeLimit())}this._drawSelection(i);if(!o(this._oSession.mSource,e)||!o(this._oSession.mTarget,t)){this._oSession.mSource=e;this._oSession.mTarget=t;this._onSelectionChange()}};l.prototype._drawSelection=function(e){if(!e.from||!e.to){return}this._clearSelection();this._oSession.cellRefs=[];for(var t=e.from.rowIndex;t<=e.to.rowIndex;t++){for(var o=e.from.colIndex;o<=e.to.colIndex;o++){var i=this.getConfig("getCellRef",this.getControl(),{rowIndex:t,colIndex:o});if(i){i.classList.toggle("sapMPluginsCellSelectorTop",t==e.from.rowIndex);i.classList.toggle("sapMPluginsCellSelectorBottom",t==e.to.rowIndex);i.classList.toggle("sapMPluginsCellSelectorRight",o==e.to.colIndex);i.classList.toggle("sapMPluginsCellSelectorSelected",true);i.setAttribute("aria-selected","true");this._oSession.cellRefs.push(i);if(o==e.from.colIndex){const n=this.getConfig("getCellRef",this.getControl(),{rowIndex:t,colIndex:o-1});let s="sapMPluginsCellSelectorLeft";if(n){i=n;s="sapMPluginsCellSelectorRight";this._oSession.cellRefs.push(i)}i.classList.toggle(s,o==e.from.colIndex)}}}}};l.prototype._updateResizers=function(e,t,o){var i=this._getResizer();if(this._iRtl==-1){const t=e.from.colIndex;e.from.colIndex=e.to.colIndex;e.to.colIndex=t}var n=this.getConfig("getCellRef",this.getControl(),e.from,false),s=this.getConfig("getCellRef",this.getControl(),e.to,false);var l={0:false,1:false};if(!n){l[0]=true;n=this.getConfig("getCellRef",this.getControl(),e.from,true)}if(!s){l[1]=true;s=this.getConfig("getCellRef",this.getControl(),e.to,true)}if(!n||!s){return}var a=n.getBoundingClientRect(),c=s.getBoundingClientRect(),h=this.getControl().getDomRef().getBoundingClientRect();var g={x:{0:a.left-h.left,1:c.left+c.width-h.left},y:{0:a.top-h.top,1:c.top+c.height-h.top}};var f={x:{0:t-a.left,1:t-c.right},y:{0:o-a.top,1:o-c.bottom}};var u=0;u|=Math.abs(f.x[0])<Math.abs(f.x[1])?0:1;u|=Math.abs(f.y[0])<Math.abs(f.y[1])?0:2;var d=Math.abs(f.x[u&1]),_=Math.abs(f.y[u>>1&1]);if(d>10&&_>10||d>10&&l[u>>1&1]){return}i.style.left=d<=10?g.x[u&1]+"px":g.x[0]+"px";i.style.top=_<=10?g.y[u>>1&1]+"px":g.y[0]+"px";i.style.width=d<=10?"":c.right-a.left+"px";i.style.height=d<=10?c.bottom-a.top+"px":"";const C=d<=10,m=_<=10;i.classList.toggle("sapMPluginsVerticalBorder",C);i.classList.toggle("sapMPluginsHorizontalBorder",m);i.classList.toggle("sapMPluginsEdge",C&&m);i.classList.toggle("sapMPluginsNESW",C&&m&&(u==2||u==1));i.classList.toggle("sapMPluginsNWSE",C&&m&&(u==3||u==0));this._oCurrentBorder={};if(C){this._oCurrentBorder.colIndex=u&1?e.to.colIndex:e.from.colIndex;this._oCurrentBorder.type=r.COL}if(m){this._oCurrentBorder.rowIndex=u>>1&1?e.to.rowIndex:e.from.rowIndex;this._oCurrentBorder.type=r.ROW}};l.prototype._getResizer=function(){if(!this._oResizer){this._oResizer=document.createElement("div");this._oResizer.setAttribute("id","cs-rsz");this._oResizer.classList.add("sapMPluginsCellSelectorRsz");this._oResizer.addEventListener("mousedown",this._onborderdown.bind(this));if(this.getControl().getDomRef()){this.getControl().getDomRef().appendChild(this._oResizer)}}return this._oResizer};l.prototype._clearSelection=function(){this._oSession?.cellRefs?.forEach(function(e){e.classList.remove("sapMPluginsCellSelectorSelected","sapMPluginsCellSelectorTop","sapMPluginsCellSelectorBottom","sapMPluginsCellSelectorLeft","sapMPluginsCellSelectorRight");e.removeAttribute("aria-selected")});var e=this._getResizer();e.style.left="-10000px";e.style.top="-10000px"};l.prototype.removeSelection=function(){this._clearSelection();const e=this._oSession?.mSource||this._oSession?.mTarget;this._bSelecting=false;this._oSession={cellRefs:[]};if(e){this._onSelectionChange()}};l.prototype._getNormalizedBounds=function(e,t,o){const i=this.getConfig("getVisibleColumns",this.getControl()).length;const n=this.getRangeLimit()==0?this.getConfig("getRowCount",this.getControl()):this.getRangeLimit();let s=Math.max(e.rowIndex,t.rowIndex),r=Math.max(e.colIndex,t.colIndex);if(!o){s=Math.min(n-1,s);r=Math.min(i,r)}return{from:{rowIndex:Math.max(0,Math.min(e.rowIndex,t.rowIndex)),colIndex:Math.max(0,Math.min(e.colIndex,t.colIndex))},to:{rowIndex:s,colIndex:r}}};l.prototype._shouldBeHandled=function(e){return!e.isMarked?.()&&this.getConfig("isSupported",this.getControl())};l.prototype._getBinding=function(){return this.getConfig("getBinding",this.getControl())};function h(e,t){return e.classList.contains(t)}function g(e,t,o){const i=e?.getNodeByIndex?.(o)??t;if(e?.nodeHasChildren){return e.nodeHasChildren(i)}return!(i.getProperty("@ui5.node.isExpanded")===undefined)}function f(e,t,o,i){return e.keyCode==t&&e.shiftKey==o&&(e.ctrlKey==i||e.metaKey==i)}e.setConfigs({"sap.ui.table.Table":{tableCell:"sapUiTableCell",selectableCells:"sapUiTableDataCell",scrollArea:"sapUiTableCtrlScr",scrollEvent:"_rowsUpdated",eventClearedAll:"sapUiTableClearAll",onActivate:function(e,t){e.attachEvent("_change",t,this._onPropertyChange);e.attachEvent("EventHandlerChange",t,this._onEventHandlerChange)},onDeactivate:function(e,t){e.detachEvent("_change",this._onPropertyChange);e.detachEvent("EventHandlerChange",this._onEventHandlerChange)},_onPropertyChange:function(e,t){e.getParameter("name")=="selectionBehavior"&&t._onSelectableChange()},_onEventHandlerChange:function(e,t){e.getParameter("EventId")=="cellClick"&&t._onSelectableChange()},isSupported:function(e){return!e.hasListeners("cellClick")&&e.getSelectionBehavior()=="RowSelector"&&!e.getDragDropConfig().some(e=>e.getSourceAggregation?.()=="rows"&&e.getEnabled())},getVisibleColumns:function(e){return e.getColumns().filter(function(e){return e.getDomRef()})},getRowCount:function(e){return e._getTotalRowCount()},getCellRef:function(e,t,o){var i=e.getRows();var n=i.find(function(e){return e.getIndex()==t.rowIndex});if(n){var s=this.getVisibleColumns(e)[t.colIndex];var r=s&&n.getCells()[s.getIndex()];if(r){return r.$().closest(`.${this.selectableCells}`)[0]}}else if(o){if(i[0].getIndex()>t.rowIndex){n=i[0];var s=this.getVisibleColumns(e)[t.colIndex];var r=s&&n.getCells()[t.colIndex];if(r){return r.$().closest(`.${this.selectableCells}`)[0]}}else if(i[i.length-1].getIndex()<t.rowIndex){n=i[i.length-1];var s=this.getVisibleColumns(e)[t.colIndex];var r=s&&n.getCells()[t.colIndex];if(r){return r.$().closest(`.${this.selectableCells}`)[0]}}}},getCellInfo:function(e,t){return{rowIndex:n.closestTo(t,true).getIndex(),colIndex:this.getVisibleColumns(e).indexOf(n.getElementById(t.getAttribute("data-sap-ui-colid")))}},loadContexts:function(e,t,o){var i=e.getBinding("rows");if(!i||i.isA("sap.ui.model.ClientListBinding")){return}i.getContexts(Math.max(0,t),Math.max(1,o),0,true)},getSelectedRowContexts:function(e,t,o,i){if(o==Infinity){var n=e.getBinding("rows").getAllCurrentContexts().length-1;o=Math.min(o,t+i-1,n)}var s=[];for(var r=t;r<=o;r++){s.push(e.getContextByIndex(r))}return s},selectRows:function(e,t,o,i){var n=this._getSelectionOwner(e);var s=e.getSelectionMode();if(s=="None"){return false}else if(s=="Single"){t=o=i}if(n.addSelectionInterval){n.addSelectionInterval(t,o);return true}var r=e.getRows().filter(function(e){return e.getIndex()>=t&&e.getIndex()<=o});r.forEach(function(e){n.setSelected(e,true)});return true},isRowSelected:function(e,t){var o=this._getSelectionOwner(e);var i=e.getRows().find(function(e){return e.getIndex()==t});if(i){return o.isSelected?o.isSelected(i):o.isIndexSelected(t)}return false},focusCell:function(e,t,o){var i=this.getCellRef(e,t);if(!i){this.scroll(e,o,true);return}i.focus()},scroll:function(e,t,o){if(o){var i=e.getFirstVisibleRow();var n=t?i+1:i-1;if(n>=0&&n!=i){e.setFirstVisibleRow(n);return Promise.resolve()}}else{var s=e._getScrollExtension().getHorizontalScrollbar();var r=Math.pow(-1,+!t)*10;s.scrollLeft=Math.max(0,s.scrollLeft+r);return Promise.resolve()}return false},attachSelectionChange:function(e,t){var o=this._getSelectionOwner(e);if(o.attachSelectionChange){o.attachSelectionChange(t);return}o.attachRowSelectionChange(t)},detachSelectionChange:function(e,t){var o=this._getSelectionOwner(e);if(o.detachSelectionChange){o.detachSelectionChange(t);return}o.detachRowSelectionChange(t)},_getSelectionOwner:function(t){return e.getPlugin(t,"sap.ui.table.plugins.SelectionPlugin")||t},getBinding:function(e){return e.getBinding("rows")}}},l);return l});
//# sourceMappingURL=CellSelector.js.map