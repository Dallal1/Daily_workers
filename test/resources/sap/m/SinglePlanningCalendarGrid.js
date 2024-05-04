/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SinglePlanningCalendarUtilities","./library","sap/base/i18n/Formatting","sap/base/i18n/Localization","sap/ui/core/Element","sap/ui/core/Lib","sap/ui/unified/DateRange","sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/Locale","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/format/TimezoneUtil","sap/ui/core/Core","sap/ui/core/date/UniversalDate","sap/ui/core/dnd/DragDropInfo","sap/ui/unified/library","sap/ui/unified/calendar/DatesRow","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/DateTypeRange","sap/ui/events/KeyCodes","./SinglePlanningCalendarGridRenderer","sap/ui/core/delegate/ItemNavigation","sap/ui/thirdparty/jquery","./PlanningCalendarLegend","sap/ui/core/InvisibleMessage","sap/ui/core/library","sap/ui/core/date/CalendarUtils","sap/ui/core/date/UI5Date"],function(e,t,a,i,n,r,o,s,l,g,p,d,u,c,h,f,m,D,_,y,C,S,v,A,jQuery,M,R,T,b,P){"use strict";var H=4.3125,I=3,w=2.125,E=1.5625,k=36e5/2,L=60*1e3,F=.4375,B=0,N=24,O=T.InvisibleMessageMode,W=T.CalendarType,x=t.SinglePlanningCalendarSelectionMode;var U=s.extend("sap.m.SinglePlanningCalendarGrid",{metadata:{library:"sap.m",properties:{startDate:{type:"object",group:"Data"},startHour:{type:"int",group:"Data",defaultValue:0},endHour:{type:"int",group:"Data",defaultValue:24},fullDay:{type:"boolean",group:"Data",defaultValue:true},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsResize:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsCreate:{type:"boolean",group:"Misc",defaultValue:false},scaleFactor:{type:"float",group:"Data",defaultValue:1},calendarWeekNumbering:{type:"sap.ui.core.date.CalendarWeekNumbering",group:"Appearance",defaultValue:null},dateSelectionMode:{type:"sap.m.SinglePlanningCalendarSelectionMode",group:"Behavior",defaultValue:x.SingleSelect}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment",dnd:{draggable:true}},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},_columnHeaders:{type:"sap.ui.unified.calendar.DatesRow",multiple:false,visibility:"hidden"},_intervalPlaceholders:{type:"sap.m.SinglePlanningCalendarGrid._internal.IntervalPlaceholder",multiple:true,visibility:"hidden",dnd:{droppable:true}},_blockersPlaceholders:{type:"sap.m.SinglePlanningCalendarGrid._internal.IntervalPlaceholder",multiple:true,visibility:"hidden",dnd:{droppable:true}},selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"}},dnd:true,associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.m.PlanningCalendarLegend",multiple:false}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"}}},appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},copy:{type:"boolean"}}},appointmentResize:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}},appointmentCreate:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},cellPress:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}}}},renderer:v});U.prototype.init=function(){var e=P.getInstance(),t=new D(this.getId()+"-columnHeaders",{showDayNamesLine:false,showWeekNumbers:false,singleSelection:false,startDate:e,calendarWeekNumbering:this.getCalendarWeekNumbering()}).addStyleClass("sapMSinglePCColumnHeader"),a=(60-e.getSeconds())*1e3,i=this._getCoreLocaleData().getTimePattern("medium");t._setAriaRole("columnheader");this.setAggregation("_columnHeaders",t);this.setStartDate(e);this._setColumns(7);this._configureBlockersDragAndDrop();this._configureAppointmentsDragAndDrop();this._configureAppointmentsResize();this._configureAppointmentsCreate();this._oUnifiedRB=r.getResourceBundleFor("sap.ui.unified");this._oFormatStartEndInfoAria=d.getDateTimeInstance({pattern:"EEEE, MMMM d, yyyy 'at' "+i});this._oFormatAriaFullDayCell=d.getDateTimeInstance({pattern:"EEEE, MMMM d, yyyy"});this._oFormatYyyymmdd=d.getInstance({pattern:"yyyyMMdd",calendarType:W.Gregorian});this._sLegendId=undefined;setTimeout(this._updateRowHeaderAndNowMarker.bind(this),a)};U.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};U.prototype.onBeforeRendering=function(){var e=this._createAppointmentsMap(this.getAppointments()),t=this.getStartDate(),a=_.fromLocalJSDate(t),i=this._getColumns();this._oVisibleAppointments=this._calculateVisibleAppointments(e.appointments,this.getStartDate(),i);this._oAppointmentsToRender=this._calculateAppointmentsLevelsAndWidth(this._oVisibleAppointments);this._aVisibleBlockers=this._calculateVisibleBlockers(e.blockers,a,i);this._oBlockersToRender=this._calculateBlockersLevelsAndWidth(this._aVisibleBlockers);if(this._iOldColumns!==i||this._oOldStartDate!==t){this._createBlockersDndPlaceholders(t,i);this._createAppointmentsDndPlaceholders(t,i)}this._oInvisibleMessage=R.getInstance()};U.prototype.setCalendarWeekNumbering=function(e){this.setProperty("calendarWeekNumbering",e);var t=this.getAggregation("_columnHeaders");t.setCalendarWeekNumbering(e);return this};U.prototype.onmousedown=function(e){var t=e.target.classList;this._isResizeHandleBottomMouseDownTarget=t.contains("sapMSinglePCAppResizeHandleBottom");this._isResizeHandleTopMouseDownTarget=t.contains("sapMSinglePCAppResizeHandleTop")};U.prototype._isResizingPerformed=function(){return this._isResizeHandleBottomMouseDownTarget||this._isResizeHandleTopMouseDownTarget};U.prototype._configureBlockersDragAndDrop=function(){this.addDragDropConfig(new f({sourceAggregation:"appointments",targetAggregation:"_blockersPlaceholders",dragStart:function(e){if(!this.getEnableAppointmentsDragAndDrop()){e.preventDefault();return false}var t=function(){var e=jQuery(".sapMSinglePCOverlay");setTimeout(function(){e.addClass("sapMSinglePCOverlayDragging")});jQuery(document).one("dragend",function(){e.removeClass("sapMSinglePCOverlayDragging")})};t()}.bind(this),dragEnter:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl(),i=t.getDropControl(),n=this.isAllDayAppointment(a.getStartDate(),a.getEndDate()),r=function(){var e=jQuery(t.getIndicator()),r=a.$().outerHeight(),o=a.$().outerWidth(),s=i.$().closest(".sapMSinglePCBlockersColumns").get(0).getBoundingClientRect(),l=i.getDomRef().getBoundingClientRect(),g=l.left+o-(s.left+s.width);if(n){e.css("min-height",r);e.css("min-width",Math.min(o,o-g))}else{e.css("min-height",t.getDropControl().$().outerHeight());e.css("min-width",t.getDropControl().$().outerWidth())}};if(!t.getIndicator()){setTimeout(r,0)}else{r()}}.bind(this),drop:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl(),i=t.getDropControl(),n=i.getDate().getJSDate(),r,o=e.getParameter("browserEvent"),s=o.metaKey||o.ctrlKey,l=this.isAllDayAppointment(a.getStartDate(),a.getEndDate());r=P.getInstance(n);if(l){r.setMilliseconds(a.getEndDate().getTime()-a.getStartDate().getTime())}this.$().find(".sapMSinglePCOverlay").removeClass("sapMSinglePCOverlayDragging");if(l&&a.getStartDate().getTime()===n.getTime()){return}this.fireAppointmentDrop({appointment:a,startDate:n,endDate:r,copy:s})}.bind(this)}))};U.prototype._configureAppointmentsDragAndDrop=function(){this.addDragDropConfig(new f({sourceAggregation:"appointments",targetAggregation:"_intervalPlaceholders",dragStart:function(e){if(!this.getEnableAppointmentsDragAndDrop()||this._isResizingPerformed()){e.preventDefault();return false}var t=function(){var e=jQuery(".sapMSinglePCOverlay");setTimeout(function(){e.addClass("sapMSinglePCOverlayDragging")});jQuery(document).one("dragend",function(){e.removeClass("sapMSinglePCOverlayDragging")})};t()}.bind(this),dragEnter:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl(),i=t.getDropControl(),n=this.isAllDayAppointment(a.getStartDate(),a.getEndDate()),r=function(){var e=jQuery(t.getIndicator()),a=document.querySelectorAll(".sapUiCalendarRowApps[id^='"+t.getDragControl().getId()+"']")[0].offsetHeight,r=i.$().closest(".sapMSinglePCColumn").get(0).getBoundingClientRect(),o=t.getDropControl().getDomRef().getBoundingClientRect(),s=o.top+a-(r.top+r.height);if(n){e.css("min-height",2*t.getDropControl().$().outerHeight())}else{e.css("min-height",Math.min(a,a-s))}};if(!t.getIndicator()){setTimeout(r,0)}else{r()}}.bind(this),drop:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl(),i=t.getDropControl(),n=i.getDate().getJSDate(),r,o=e.getParameter("browserEvent"),s=o.metaKey||o.ctrlKey,l=this.isAllDayAppointment(a.getStartDate(),a.getEndDate());r=P.getInstance(n);if(l){r.setHours(r.getHours()+1)}else{r.setMilliseconds(a.getEndDate().getTime()-a.getStartDate().getTime())}this.$().find(".sapMSinglePCOverlay").removeClass("sapMSinglePCOverlayDragging");if(!l&&a.getStartDate().getTime()===n.getTime()){return}this.fireAppointmentDrop({appointment:a,startDate:n,endDate:r,copy:s})}.bind(this)}))};U.prototype._configureAppointmentsResize=function(){var e=new f({sourceAggregation:"appointments",targetAggregation:"_intervalPlaceholders",dragStart:function(e){if(!this.getEnableAppointmentsResize()||!this._isResizingPerformed()){e.preventDefault();return}var t=e.getParameter("dragSession"),a=t.getDragControl(),i=e.getParameter("browserEvent")&&e.getParameter("browserEvent").target||null;a._sAppointmentPartSuffix=i&&i.id?i.id.replace(a.getId()+"-",""):"";var n=this.$().find(".sapMSinglePCOverlay"),r=jQuery(t.getIndicator()),o=a.$();if(this._isResizeHandleBottomMouseDownTarget){t.setComplexData("bottomHandle","true")}if(this._isResizeHandleTopMouseDownTarget){t.setComplexData("topHandle","true")}r.addClass("sapUiDnDIndicatorHide");setTimeout(function(){n.addClass("sapMSinglePCOverlayDragging")},0);jQuery(document).one("dragend",function(){var e=t.getComplexData("appointmentStartingBoundaries");n.removeClass("sapMSinglePCOverlayDragging");r.removeClass("sapUiDnDIndicatorHide");o.css({top:e.top,height:e.height,"z-index":"auto",opacity:1})});e.getParameter("browserEvent").dataTransfer.setDragImage(V(),0,0)}.bind(this),dragEnter:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl().$().get(0),i=t.getDropControl().getDomRef(),n=t.getComplexData("appointmentStartingBoundaries"),r=function(){var e=jQuery(t.getIndicator());e.addClass("sapUiDnDIndicatorHide")},o,s,l,g,p;if(!n){n={top:a.offsetTop,bottom:a.offsetTop+a.getBoundingClientRect().height,height:a.getBoundingClientRect().height};t.setComplexData("appointmentStartingBoundaries",n)}g=t.getData("bottomHandle")?n.top:n.bottom;o=Math.min(g,i.offsetTop);s=Math.max(g,i.offsetTop+i.getBoundingClientRect().height);l=s-o;p={top:o,height:l,"z-index":1,opacity:.8};t.getDragControl().$().css(p);if(!t.getIndicator()){setTimeout(r,0)}else{r()}},drop:function(e){var t=e.getParameter("dragSession"),a=t.getDragControl(),i=this.indexOfAggregation("_intervalPlaceholders",t.getDropControl()),n=t.getComplexData("appointmentStartingBoundaries"),r;r=this._calcResizeNewHoursAppPos(a.getStartDate(),a.getEndDate(),i,t.getComplexData("bottomHandle"));this.$().find(".sapMSinglePCOverlay").removeClass("sapMSinglePCOverlayDragging");jQuery(t.getIndicator()).removeClass("sapUiDnDIndicatorHide");a.$().css({top:n.top,height:n.height,"z-index":"auto",opacity:1});if(a.getEndDate().getTime()===r.endDate.getTime()&&a.getStartDate().getTime()===r.startDate.getTime()){return}this.fireAppointmentResize({appointment:a,startDate:r.startDate,endDate:r.endDate});setTimeout(function(){this.invalidate()}.bind(this),0)}.bind(this)});this.addDragDropConfig(e)};U.prototype._configureAppointmentsCreate=function(){this.addDragDropConfig(new f({targetAggregation:"_intervalPlaceholders",dragStart:function(e){if(!this.getEnableAppointmentsCreate()){e.preventDefault();return}var t=e.getParameter("browserEvent");var a=this.$().find(".sapMSinglePCOverlay");setTimeout(function(){a.addClass("sapMSinglePCOverlayDragging")});jQuery(document).one("dragend",function(){a.removeClass("sapMSinglePCOverlayDragging");jQuery(".sapUiAppCreate").remove();jQuery(".sapUiDnDDragging").removeClass("sapUiDnDDragging")});t.dataTransfer.setDragImage(V(),0,0);var n=e.getParameter("target"),r=i.getRTL(),o=n.getAggregation("_intervalPlaceholders"),s=o[0].getDomRef().getBoundingClientRect(),l=s.height,g=Math.floor((s.top-n.getDomRef().getBoundingClientRect().top)/l),p=e.getParameter("dragSession"),d=Math.floor(t.offsetY/l)-g,u,c;if(this._iColumns===1){u=d}else{var h=r?0:this.getDomRef().querySelector(".sapMSinglePCRowHeaders").getClientRects()[0].width,f=n._aGridCells[0].getClientRects()[0].width,m=Math.floor(Math.floor(t.offsetX-h)/f),D=o.length/this._iColumns;u=d+m*D}if(u<0){u=0}c=o[u].getDomRef().getBoundingClientRect();p.setComplexData("startingRectsDropArea",{top:Math.ceil(d*l),left:c.left});p.setComplexData("startingDropDate",o[u].getDate())}.bind(this),dragEnter:function(e){var t=e.getParameter("dragSession"),a=t.getDropControl(),i=a.getDomRef(),n=i.offsetHeight,r=i.offsetTop,o=r,s=i.getBoundingClientRect().left,l=s,g=a.$().parents(".sapMSinglePCColumn").get(0),p=jQuery(".sapUiAppCreate");if(!p.get(0)){p=jQuery("<div></div>").addClass("sapUiCalendarApp sapUiCalendarAppType01 sapUiAppCreate");p.appendTo(g)}jQuery(".sapUiDnDDragging").removeClass("sapUiDnDDragging");if(!t.getComplexData("startingRectsDropArea")){t.setComplexData("startingRectsDropArea",{top:r,left:s});t.setComplexData("startingDropDate",a.getDate())}else{o=t.getComplexData("startingRectsDropArea").top;l=t.getComplexData("startingRectsDropArea").left}if(s!==l){e.preventDefault();return false}a.$().closest(".sapMSinglePCColumn").find(".sapMSinglePCAppointments").addClass("sapUiDnDDragging");p.css({top:Math.min(o,r)+2,height:Math.abs(o-r)+n-4,left:3,right:3,"z-index":2});t.setIndicatorConfig({display:"none"})},drop:function(e){var t=e.getParameter("dragSession"),a=t.getDropControl(),i=60/(this.getScaleFactor()*2)*60*1e3,n=t.getComplexData("startingDropDate").getTime(),r=a.getDate().getJSDate().getTime(),o=Math.min(n,r),s=Math.max(n,r)+i;this.fireAppointmentCreate({startDate:P.getInstance(o),endDate:P.getInstance(s)});jQuery(".sapUiAppCreate").remove();jQuery(".sapUiDnDDragging").removeClass("sapUiDnDDragging")}.bind(this)}))};U.prototype._calcResizeNewHoursAppPos=function(e,t,a,i){var n=60/(this.getScaleFactor()*2)*60*1e3,r=this.getAggregation("_intervalPlaceholders")[a].getDate().getTime(),o=r+n,s=i?e.getTime():t.getTime(),l=Math.min(s,r),g=Math.max(s,o);return{startDate:P.getInstance(l),endDate:P.getInstance(g)}};U.prototype._adjustAppointmentsHeightforCompact=function(e,t,a,i){var n,r,o,s,l,g,p,d,u=this._getRowHeight(),c=0,h=.125,f=.125,m=.0625,D=this.getScaleFactor(),_=2*D;if(this._oAppointmentsToRender[e]){this._oAppointmentsToRender[e].oAppointmentsList.getIterator().forEach(function(e){n=e.getData();r=this.getDomRef().querySelector("#"+n.getId()+"-"+i+"_"+c);o=n.getStartDate();s=n.getEndDate();p=t.getTime()>o.getTime();d=a.getTime()<s.getTime();l=p?0:this._calculateTopPosition(o);g=d?0:this._calculateBottomPosition(s);r.style["top"]=l+"rem";r.style["bottom"]=g+"rem";r.querySelector(".sapUiCalendarApp").style["minHeight"]=(u-(h+f+m)*D)/_+"rem";++c}.bind(this))}};U.prototype._adjustBlockersHeightforCompact=function(){var e=this._getBlockersToRender().iMaxlevel,t=(e+1)*this._getBlockerRowHeight(),a=this._getColumns()===1?t+F:t,i=this._getBlockerRowHeight();if(e>0){a=a+.1875}this.$().find(".sapMSinglePCBlockersColumns").css("height",a+"rem");this._oBlockersToRender.oBlockersList.getIterator().forEach(function(e){e.getData().$().css("top",i*e.level+.0625+"rem")})};U.prototype._adjustBlockersHeightforCozy=function(){var e=this._getBlockersToRender()&&this._getBlockersToRender().iMaxlevel,t;if(this._getColumns()===1){t=(e+1)*this._getBlockerRowHeight();this.$().find(".sapMSinglePCBlockersColumns").css("height",t+F+"rem")}};U.prototype._adjustRowHigth=function(){this.$().find(".sapMSinglePCRow").css("height",this._getRowHeight()+"rem")};U.prototype.onAfterRendering=function(){var e=this._getColumns(),t=this.getStartDate(),a=this._getRowHeight();if(a===I){for(var i=0;i<e;i++){var n=new _(t.getFullYear(),t.getMonth(),t.getDate()+i),r=this._getDateFormatter().format(n.toLocalJSDate()),o=new h(n.getYear(),n.getMonth(),n.getDate(),this._getVisibleStartHour()),s=new h(n.getYear(),n.getMonth(),n.getDate(),this._getVisibleEndHour(),59,59);this._adjustAppointmentsHeightforCompact(r,o,s,i)}this._adjustBlockersHeightforCompact()}else{this._adjustBlockersHeightforCozy()}this._adjustRowHigth();this._updateRowHeaderAndNowMarker();Y.call(this)};U.prototype._appFocusHandler=function(e,t){var a=n.getElementById(e.target.id)||this._findSrcControl(e);if(a&&a.isA("sap.ui.unified.CalendarAppointment")){this.fireAppointmentSelect({appointment:undefined,appointments:this._toggleAppointmentSelection(undefined,true)});this._focusCellWithKeyboard(a,t);e.preventDefault()}};U.prototype._cellFocusHandler=function(e,t){var a=e.target,i=this._getDateFormatter(),n;if(a.classList.contains("sapMSinglePCRow")||a.classList.contains("sapMSinglePCBlockersColumn")){n=i.parse(a.getAttribute("data-sap-start-date"));if(this._isBorderReached(n,t)){this.fireEvent("borderReached",{startDate:n,next:t===S.ARROW_RIGHT,fullDay:a.classList.contains("sapMSinglePCBlockersColumn")})}}};U.prototype.onsapup=function(e){this._appFocusHandler(e,S.ARROW_UP)};U.prototype.onsapdown=function(e){this._appFocusHandler(e,S.ARROW_DOWN)};U.prototype.onsapright=function(e){this._appFocusHandler(e,S.ARROW_RIGHT);this._cellFocusHandler(e,S.ARROW_RIGHT)};U.prototype.onsapleft=function(e){this._appFocusHandler(e,S.ARROW_LEFT);this._cellFocusHandler(e,S.ARROW_LEFT)};U.prototype.setStartDate=function(e){this._oOldStartDate=this.getStartDate();this.getAggregation("_columnHeaders").setStartDate(e);return this.setProperty("startDate",e)};U.prototype.applyFocusInfo=function(e){var t=this._getVisibleBlockers(),a=this._getVisibleAppointments(),i=Object.keys(a),n,r,o;if(this._sSelectedAppointment){this._sSelectedAppointment.focus();return this}for(r=0;r<t.length;++r){if(t[r].getId()===e.id){t[r].focus();return this}}for(r=0;r<i.length;++r){n=a[i[r]];for(o=0;o<n.length;++o){if(n[o].getId()===e.id){n[o].focus();return this}}}return this};U.prototype.getSelectedAppointments=function(){return this.getAppointments().filter(function(e){return e.getSelected()})};U.prototype.setDateSelectionMode=function(e){this.setProperty("dateSelectionMode",e);return this};U.prototype._isMultiDatesSelectionHeaderAllowed=function(){return x.MultiSelect===this.getDateSelectionMode()};U.prototype._toggleAppointmentSelection=function(e,t){var a=[],i=e&&e.getDomRef(),n,r,o;if(t){n=this.getAppointments();for(o=0,r=n.length;o<r;o++){if((!e||n[o].getId()!==e.getId())&&n[o].getSelected()){n[o].setProperty("selected",false);a.push(n[o])}}}if(e){e.setProperty("selected",!e.getSelected());a.push(e);this._sSelectedAppointment=e.getSelected()&&i?e:undefined}else{this._sSelectedAppointment=undefined}return a};U.prototype._isBorderReached=function(e,t){var a=_.fromLocalJSDate(this.getStartDate()),i=new _(a.getYear(),a.getMonth(),a.getDate()+this._getColumns()-1),n=_.fromLocalJSDate(e),r=t===S.ARROW_LEFT&&n.isSame(a),o=t===S.ARROW_RIGHT&&n.isSame(i);return r||o};U.prototype._focusCellWithKeyboard=function(e,t){var a=this.isAllDayAppointment(e.getStartDate(),e.getEndDate()),i=this._getDateFormatter(),n=P.getInstance(e.getStartDate().getFullYear(),e.getStartDate().getMonth(),e.getStartDate().getDate(),e.getStartDate().getHours()),r=P.getInstance(this.getStartDate().getFullYear(),this.getStartDate().getMonth(),this.getStartDate().getDate(),this.getStartDate().getHours());if(n<r){n=r}if(this._isBorderReached(n,t)){this.fireEvent("borderReached",{startDate:n,next:t===S.ARROW_RIGHT,fullDay:a});return}switch(t){case S.ARROW_UP:if(!a){n.setHours(n.getHours()-1)}break;case S.ARROW_DOWN:if(!a){n.setHours(n.getHours()+1)}break;case S.ARROW_LEFT:n.setDate(n.getDate()-1);break;case S.ARROW_RIGHT:n.setDate(n.getDate()+1);break;default:}if(a&&t!==S.ARROW_DOWN){jQuery("[data-sap-start-date='"+i.format(n)+"'].sapMSinglePCBlockersColumn").trigger("focus")}else{jQuery("[data-sap-start-date='"+i.format(n)+"'].sapMSinglePCRow").trigger("focus")}};U.prototype.onmouseup=function(e){var t=x.MultiSelect===this.getDateSelectionMode();if(!t&&!(e.metaKey||e.ctrlKey)){this.removeAllSelectedDates()}this._bMultiDateSelect=true;this._fireSelectionEvent(e)};U.prototype.ontap=function(e){this._fireSelectionEvent(e)};U.prototype.removeAllSelectedDates=function(e){this.removeAllAggregation("selectedDates")};U.prototype.onkeyup=function(e){var t=x.MultiSelect===this.getDateSelectionMode();if((e.which===S.ARROW_LEFT||e.which===S.ARROW_RIGHT)&&e.shiftKey&&t){this._bMultiDateSelectWithArrow=true}else if(e.which===S.SPACE&&!e.shiftKey&&t){this._bMultiDateSelect=true}else if(e.which===S.SPACE&&!e.shiftKey){this.removeAllSelectedDates();this._bMultiDateSelect=true}this._fireSelectionEvent(e);e.preventDefault()};U.prototype.onkeydown=function(e){var t=x.MultiSelect===this.getDateSelectionMode();if(e.which===S.SPACE||e.which===S.ENTER||e.which===S.ARROW_LEFT||e.which===S.ARROW_RIGHT){if(e.which===S.SPACE&&e.shiftKey&&t){this._bCurrentWeekSelection=true}this._fireSelectionEvent(e);var a=this._findSrcControl(e);if(a&&a.isA("sap.ui.unified.CalendarAppointment")){var i=a.getSelected()?"APPOINTMENT_SELECTED":"APPOINTMENT_UNSELECTED";this._oInvisibleMessage.announce(this._oUnifiedRB.getText(i),O.Polite)}e.preventDefault()}};U.prototype._findSrcControl=function(e){var t=e.target,a=t.parentElement,i;if(!a){return e.srcControl}else if(a.classList.contains("sapUiCalendarRowApps")){i=a.getAttribute("data-sap-ui-related")||a.id}else{i=t.getAttribute("data-sap-ui-related")||t.id}return this.getAppointments().find(function(e){return e.sId===i})};U.prototype._fireSelectionEvent=function(e){var t=this._findSrcControl(e),a=e.target;if(e.target.classList.contains("sapMSinglePCRow")||e.target.classList.contains("sapMSinglePCBlockersColumn")){this.fireEvent("cellPress",{startDate:this._getDateFormatter().parse(a.getAttribute("data-sap-start-date")),endDate:this._getDateFormatter().parse(a.getAttribute("data-sap-end-date"))});this.fireAppointmentSelect({appointment:undefined,appointments:this._toggleAppointmentSelection(undefined,true)})}else if(t&&t.isA("sap.ui.unified.CalendarAppointment")){if(a.parentElement&&a.parentElement.getAttribute("id")){var i=a.parentElement.getAttribute("id");var n=a.parentElement.getAttribute("data-sap-ui-related");var r=i.replace(n+"-","");t._setAppointmentPartSuffix(r)}this.fireAppointmentSelect({appointment:t,appointments:this._toggleAppointmentSelection(t,!(e.ctrlKey||e.metaKey))})}else{var o;if(!a.classList.contains("sapUiCalItem")){o=a.parentElement}else{o=a}if(!o.getAttribute("data-sap-day")){return}var s=this._oFormatYyyymmdd.parse(o.getAttribute("data-sap-day"));var l=new _(s.getFullYear(),s.getMonth(),s.getDate());this._handelMultiDateSelection(l,o);this.fireEvent("selectDate",{startDate:l})}};U.prototype._handelMultiDateSelection=function(e,t){if(this._bMultiDateSelect||this._bMultiDateSelectWithArrow){this._bMultiDateSelect=false;this._bMultiDateSelectWithArrow=false;this._toggleMarkCell(e,t)}else if(this._bCurrentWeekSelection&&this.getAggregation("selectedDates")){this._bCurrentWeekSelection=false;this._rangeSelection()}};U.prototype._rangeSelection=function(){var e=this.getAggregation("_columnHeaders")._oItemNavigation.aItemDomRefs;var t;var a;var i;var n;var r=false;for(n=0;n<e.length;n++){t=e[n];a=this._oFormatYyyymmdd.parse(t.getAttribute("data-sap-day"));i=new _(a.getFullYear(),a.getMonth(),a.getDate());if(!this._checkDateSelected(i)){r=true;break}}for(n=0;n<e.length;n++){t=e[n];a=this._oFormatYyyymmdd.parse(t.getAttribute("data-sap-day"));i=new _(a.getFullYear(),a.getMonth(),a.getDate());if(r&&this._checkDateSelected(i)){continue}this._toggleMarkCell(i)}};U.prototype._toggleMarkCell=function(e,t){var a=e.toUTCJSDate();if(!this._checkDateSelected(e)){if(t&&!t.classList.contains("sapUiCalItemSel")){t.classList.add("sapUiCalItemSel")}this.addAggregation("selectedDates",new o({startDate:a}))}else{var i=this.getAggregation("selectedDates");t&&t.classList.remove("sapUiCalItemSel");if(!i){return}for(var n=0;n<i.length;n++){var r=P.getInstance(Date.UTC(0,0,1));var s=i[n].getStartDate();r.setUTCFullYear(s.getFullYear(),s.getMonth(),s.getDate());if(r.getTime()===a.getTime()){this.removeAggregation("selectedDates",n);break}}}};U.prototype._checkDateSelected=function(e){var t=this.getAggregation("selectedDates");if(!t||t&&t.length===0){return false}var a=e.toUTCJSDate().getTime();var i=P.getInstance(Date.UTC(0,0,1));for(var n=0;n<t.length;n++){var r=t[n];var o=r.getStartDate();var s=y.MAX_MILLISECONDS;if(o){i.setUTCFullYear(o.getFullYear(),o.getMonth(),o.getDate());s=i.getTime()}var l=r.getEndDate();var g=-y.MAX_MILLISECONDS;if(l){i.setUTCFullYear(l.getFullYear(),l.getMonth(),l.getDate());g=i.getTime()}if(a===s&&!l||a>=s&&a<=g){return true}}return false};U.prototype._getVisibleStartHour=function(){return this.getFullDay()||!this.getStartHour()?B:this.getStartHour()};U.prototype._getVisibleEndHour=function(){return(this.getFullDay()||!this.getEndHour()?N:this.getEndHour())-1};U.prototype._isVisibleHour=function(e){var t=this.getStartHour(),a=this.getEndHour();if(!this.getStartHour()){t=B}if(!this.getEndHour()){a=N}if(t>a){return t<=e||e<a}return t<=e&&e<a};U.prototype._shouldHideRowHeader=function(e){var t=P.getInstance().getHours(),a=y._areCurrentMinutesLessThan(15)&&t===e,i=y._areCurrentMinutesMoreThan(45)&&t===e-1;return a||i};U.prototype._parseDateStringAndHours=function(e,t){var a=this._getDateFormatter().parse(e);if(t){a.setHours(t)}return a};U.prototype._getDateFormatter=function(){if(!(this._oDateFormat instanceof d)){this._oDateFormat=d.getDateTimeInstance({pattern:"yyyyMMdd-HHmm"})}return this._oDateFormat};U.prototype._formatTimeAsString=function(e){var t=this._getHoursPattern()+":mm",a=d.getTimeInstance({pattern:t},new g(this._getCoreLocaleId()));return a.format(e)};U.prototype._addAMPM=function(e){var t=this._getAMPMFormat();return" "+t.format(e)};U.prototype._calculateTopPosition=function(e){var t=e.getHours()-this._getVisibleStartHour(),a=e.getMinutes(),i=this._getRowHeight();return i*t+i/60*a};U.prototype._calculateBottomPosition=function(e){var t=this._getVisibleEndHour()+1-e.getHours(),a=e.getMinutes(),i=this._getRowHeight();return i*t-i/60*a};U.prototype._updateRowHeaderAndNowMarker=function(){var e=P.getInstance();this._updateNowMarker(e);this._updateRowHeaders(e);setTimeout(this._updateRowHeaderAndNowMarker.bind(this),L)};U.prototype._updateNowMarker=function(e){var t=this.$("nowMarker"),a=this.$("nowMarkerText"),i=this.$("nowMarkerAMPM"),n=!this._isVisibleHour(e.getHours()),r=P.getInstance(e.getTime());t.toggleClass("sapMSinglePCNowMarkerHidden",n);t.css("top",this._calculateTopPosition(r)+"rem");a.text(this._formatTimeAsString(e));i.text(this._addAMPM(e));a.append(i)};U.prototype._updateRowHeaders=function(e){var t=this.$(),a=e.getHours(),i=a+1;t.find(".sapMSinglePCRowHeader").removeClass("sapMSinglePCRowHeaderHidden");if(this._shouldHideRowHeader(a)){t.find(".sapMSinglePCRowHeader"+a).addClass("sapMSinglePCRowHeaderHidden")}else if(this._shouldHideRowHeader(i)){t.find(".sapMSinglePCRowHeader"+i).addClass("sapMSinglePCRowHeaderHidden")}};U.prototype._createAppointmentsMap=function(e){var t=this;return e.reduce(function(e,a){var i=a.getStartDate(),n=a.getEndDate(),r,o,s;if(!i||!n){return e}if(!t.isAllDayAppointment(i,n)){r=_.fromLocalJSDate(i);o=_.fromLocalJSDate(n);while(r.isSameOrBefore(o)){s=t._getDateFormatter().format(r.toLocalJSDate());if(!e.appointments[s]){e.appointments[s]=[]}e.appointments[s].push(a);r.setDate(r.getDate()+1)}}else{e.blockers.push(a)}return e},{appointments:{},blockers:[]})};U.prototype._calculateVisibleAppointments=function(e,t,a){var i={},n,r,o;for(var s=0;s<a;s++){n=new _(t.getFullYear(),t.getMonth(),t.getDate()+s);r=this._getDateFormatter().format(n.toLocalJSDate());o=this._isAppointmentFitInVisibleHours(n);if(e[r]){i[r]=e[r].filter(o,this).sort(this._sortAppointmentsByStartHourCallBack)}}return i};U.prototype._isAppointmentFitInVisibleHours=function(e){return function(t){var a=t.getStartDate().getTime(),i=t.getEndDate().getTime(),n=new h(e.getYear(),e.getMonth(),e.getDate(),this._getVisibleStartHour()).getTime(),r=new h(e.getYear(),e.getMonth(),e.getDate(),this._getVisibleEndHour(),59,59).getTime();var o=a<n&&i>r,s=a>=n&&a<r,l=i>n&&i<=r;return o||s||l}};U.prototype._calculateAppointmentsLevelsAndWidth=function(t){var a=k-(this.getScaleFactor()-1)*5*60*1e3;var i=this;return Object.keys(t).reduce(function(n,r){var o=0,s=new e.list,l=t[r];l.forEach(function(t){var i=new e.node(t),n=t.getStartDate().getTime();if(s.getSize()===0){s.add(i);return}s.getIterator().forEach(function(e){var t=true,r=e.getData(),s=r.getStartDate().getTime(),l=r.getEndDate().getTime(),g=l-s;if(g<a){l=l+(a-g)}if(n>=s&&n<l){i.level++;o=Math.max(o,i.level)}if(e.next&&e.next.level===i.level){t=false}if(n>=l&&t){this.interrupt()}});s.insertAfterLevel(i.level,i)});n[r]={oAppointmentsList:i._calculateAppointmentsWidth(s),iMaxLevel:o};return n},{})};U.prototype._calculateAppointmentsWidth=function(t){t.getIterator().forEach(function(a){var i=a.getData(),n=a.level,r=a.level,o=i.getStartDate().getTime(),s=i.getEndDate().getTime(),l=s-o;if(l<k){s=s+(k-l)}new e.iterator(t).forEach(function(e){var t=e.getData(),i=e.level,l=t.getStartDate().getTime(),g=t.getEndDate().getTime(),p=g-l;if(p<k){g=g+(k-p)}if(r>=i){return}if(o>=l&&o<g||s>l&&s<g||o<=l&&s>=g){a.width=i-r;this.interrupt();return}if(n<i){n=i;a.width++}})});return t};U.prototype._calculateVisibleBlockers=function(e,t,a){var i=new _(t.getYear(),t.getMonth(),t.getDate()+a-1),n=this._isBlockerVisible(t,i);return e.filter(n).sort(this._sortAppointmentsByStartHourCallBack)};U.prototype._isBlockerVisible=function(e,t){return function(a){var i=_.fromLocalJSDate(a.getStartDate()),n=_.fromLocalJSDate(a.getEndDate());var r=i.isBefore(e)&&n.isAfter(t),o=y._isBetween(i,e,t,true),s=y._isBetween(n,e,t,true);return r||o||s}};U.prototype._calculateBlockersLevelsAndWidth=function(t){var a=0,i=new e.list;t.forEach(function(t){var n=new e.node(t),r=_.fromLocalJSDate(t.getStartDate()),o=_.fromLocalJSDate(t.getEndDate());n.width=y._daysBetween(o,r);if(i.getSize()===0){i.add(n);return}i.getIterator().forEach(function(e){var t=true,i=e.getData(),o=_.fromLocalJSDate(i.getStartDate()),s=_.fromLocalJSDate(i.getEndDate());if(r.isSameOrAfter(o)&&r.isSameOrBefore(s)){n.level++;a=Math.max(a,n.level)}if(e.next&&e.next.level===n.level){t=false}if(r.isSameOrAfter(s)&&t){this.interrupt()}});i.insertAfterLevel(n.level,n)},this);return{oBlockersList:i,iMaxlevel:a}};U.prototype._sortAppointmentsByStartHourCallBack=function(e,t){return e.getStartDate().getTime()-t.getStartDate().getTime()||t.getEndDate().getTime()-e.getEndDate().getTime()};U.prototype._getVisibleAppointments=function(){return this._oVisibleAppointments};U.prototype._getAppointmentsToRender=function(){return this._oAppointmentsToRender};U.prototype._getVisibleBlockers=function(){return this._aVisibleBlockers};U.prototype._getBlockersToRender=function(){return this._oBlockersToRender};U.prototype._setColumns=function(e){this._iOldColumns=this._iColumns;this._iColumns=e;this.getAggregation("_columnHeaders").setDays(e);this.invalidate();return this};U.prototype._getColumns=function(){return this._iColumns};U.prototype._getRowHeight=function(){return this._isCompact()?I*this.getScaleFactor():H*this.getScaleFactor()};U.prototype._getBlockerRowHeight=function(){return this._isCompact()?E:w};U.prototype._isCompact=function(){var e=this.getDomRef();while(e&&e.classList){if(e.classList.contains("sapUiSizeCompact")){return true}e=e.parentNode}return false};U.prototype._getCoreLocaleId=function(){if(!this._sLocale){this._sLocale=new g(a.getLanguageTag()).toString()}return this._sLocale};U.prototype._getCoreLocaleData=function(){var e,t;if(!this._oLocaleData){e=this._getCoreLocaleId();t=new g(e);this._oLocaleData=l.getInstance(t)}return this._oLocaleData};U.prototype._hasAMPM=function(){var e=this._getCoreLocaleData();return e.getTimePattern("short").search("a")>=0};U.prototype._getHoursFormat=function(){var e=this._getCoreLocaleId();if(!this._oHoursFormat||this._oHoursFormat.oLocale.toString()!==e){var t=new g(e),a=this._getHoursPattern();this._oHoursFormat=d.getTimeInstance({pattern:a},t)}return this._oHoursFormat};U.prototype._getHoursPattern=function(){return this._hasAMPM()?"h":"H"};U.prototype._getAMPMFormat=function(){var e=this._getCoreLocaleId(),t=new g(e);if(!this._oAMPMFormat||this._oAMPMFormat.oLocale.toString()!==e){this._oAMPMFormat=d.getTimeInstance({pattern:"a"},t)}return this._oAMPMFormat};U.prototype._getColumnHeaders=function(){return this.getAggregation("_columnHeaders")};U.prototype._getAppointmentAnnouncementInfo=function(e){var t=e.getStartDate(),a=e.getEndDate(),i=this.isAllDayAppointment(t,a),n=this._isSingleDayAppointment(t,a),r=M.findLegendItemForItem(c.byId(this._sLegendId),e),o;if(i&&n){o=this._oUnifiedRB.getText("CALENDAR_ALL_DAY_INFO",[this._oFormatAriaFullDayCell.format(t)])}else if(i){o=this._oUnifiedRB.getText("CALENDAR_APPOINTMENT_INFO",[this._oFormatAriaFullDayCell.format(t),this._oFormatAriaFullDayCell.format(a)])}else{o=this._oUnifiedRB.getText("CALENDAR_APPOINTMENT_INFO",[this._oFormatStartEndInfoAria.format(t),this._oFormatStartEndInfoAria.format(a)])}return o+", "+r};U.prototype.enhanceAccessibilityState=function(e,t){if(e.getId()===this._getColumnHeaders().getId()){t.labelledby=p.getStaticId("sap.m","PLANNINGCALENDAR_DAYS")}};U.prototype._getCellStartEndInfo=function(e,t){var a=this._oUnifiedRB.getText("CALENDAR_START_TIME"),i=this._oUnifiedRB.getText("CALENDAR_END_TIME"),n=!t;if(n){return a+": "+this._oFormatAriaFullDayCell.format(e)+"; "}return a+": "+this._oFormatStartEndInfoAria.format(e)+"; "+i+": "+this._oFormatStartEndInfoAria.format(t)};U.prototype.isAllDayAppointment=function(e,t){return y._isMidnight(e)&&y._isMidnight(t)};U.prototype._isSingleDayAppointment=function(e,t){return!t||e.getDate()===t.getDate()};U.prototype._createBlockersDndPlaceholders=function(e,t){this.destroyAggregation("_blockersPlaceholders");for(var a=0;a<t;a++){var i=new h(e.getFullYear(),e.getMonth(),e.getDate()+a);var n=new z({date:i});this.addAggregation("_blockersPlaceholders",n,true)}};U.prototype._createAppointmentsMatrix=function(e,t){var a=new _(e.getFullYear(),e.getMonth(),e.getDate()+t);var i=this._getVisibleStartHour(),n=this._getVisibleEndHour();if(!this._dndPlaceholdersMap[a]){this._dndPlaceholdersMap[a]=[]}for(var r=i;r<=n;r++){var o=this._dndPlaceholdersMap[a],s=a.getYear(),l=a.getMonth(),g=a.getDate(),p=this.getScaleFactor()*2,d=60/p*60;for(var u=0;u<p;u++){o.push(this._createAppointmentsDndPlaceHolder(new h(s,l,g,r,0,d*u)))}}};U.prototype._createAppointmentsDndPlaceholders=function(e,t){var a=i.getRTL(),n;this._dndPlaceholdersMap={};this.destroyAggregation("_intervalPlaceholders");if(a){for(n=t-1;n>=0;n--){this._createAppointmentsMatrix(e,n)}}else{for(n=0;n<t;n++){this._createAppointmentsMatrix(e,n)}}};U.prototype._createAppointmentsDndPlaceHolder=function(e){var t=new z({date:e});this.addAggregation("_intervalPlaceholders",t,true);return t};U.prototype._getSpecialDates=function(){var e=this.getSpecialDates();for(var t=0;t<e.length;t++){var a=e[t].getSecondaryType()===m.CalendarDayType.NonWorking&&e[t].getType()!==m.CalendarDayType.NonWorking;if(a){var i=new C;i.setType(m.CalendarDayType.NonWorking);i.setStartDate(e[t].getStartDate());if(e[t].getEndDate()){i.setEndDate(e[t].getEndDate())}e.push(i)}}return e};U.prototype._isNonWorkingDay=function(e){const t=this._getSpecialDates().filter(t=>t.getStartDate()&&_.fromLocalJSDate(t.getStartDate()).isSame(e));const a=t.length>0&&t[0].getType();const i=t.length>0&&t[0].getSecondaryType();const n=y._isWeekend(e,this._getCoreLocaleData())&&a!==m.CalendarDayType.Working&&i!==m.CalendarDayType.Working;return a===m.CalendarDayType.NonWorking||i===m.CalendarDayType.NonWorking||n};function V(){var e=jQuery("<span></span>").addClass("sapUiCalAppResizeGhost");e.appendTo(document.body);setTimeout(function(){e.remove()},0);return e.get(0)}var z=s.extend("sap.m.SinglePlanningCalendarGrid._internal.IntervalPlaceholder",{metadata:{library:"sap.m",properties:{date:{type:"object",group:"Data"}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t).class("sapMSinglePCPlaceholder").openEnd().close("div")}}});function Y(){var e=this.getDomRef(),t=this.$().find(".sapMSinglePCBlockersColumn").toArray();this._aGridCells=Array.prototype.concat(t);for(var a=0;a<=this._getVisibleEndHour();++a){t=this.$().find("div[data-sap-hour='"+a+"']").toArray();this._aGridCells=this._aGridCells.concat(t)}if(!this._oItemNavigation){this._oItemNavigation=new A(undefined,undefined,true);this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(e);this._oItemNavigation.setItemDomRefs(this._aGridCells);this._oItemNavigation.setCycling(false);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]});this._oItemNavigation.setTableMode(true,true).setColumns(this._getColumns());this._oItemNavigation.setPageSize(this._aGridCells.length)}return U});
//# sourceMappingURL=SinglePlanningCalendarGrid.js.map