/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CalendarContentRenderer","sap/base/i18n/Formatting","sap/ui/core/Element","sap/ui/core/ResizeHandler","sap/ui/integration/library","sap/ui/integration/cards/BaseContent","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/f/cards/loading/CalendarPlaceholder","sap/f/CalendarAppointmentInCard","sap/f/CalendarInCard","sap/f/PlanningCalendarInCardLegend","sap/m/library","sap/m/Button","sap/m/FlexBox","sap/ui/core/format/DateFormat","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/DateTypeRange","sap/ui/core/date/UniversalDate","sap/ui/unified/CalendarLegendItem","sap/ui/core/date/UI5Date","sap/ui/unified/DateRange"],function(t,e,a,i,n,s,o,r,l,p,d,g,m,h,c,u,f,D,_,I,C,y,S,A,v,T,b){"use strict";var L=n.CardActionArea;var M=s.extend("sap.ui.integration.cards.CalendarContent",{renderer:t,metadata:{library:"sap.ui.integration",properties:{visibleAppointmentsCount:{type:"int",group:"Data",defaultValue:2},noAppointmentsText:{type:"string",group:"Misc",defaultValue:null}},aggregations:{appointments:{type:"sap.f.CalendarAppointmentInCard",multiple:true,singularName:"appointment"}}}});M.prototype.changeMonth=function(t){var e=this._oCalendar,a=this._oCalendar.getSelectedDates()[0],i,n;i=a.getStartDate().getFullYear();n=new Date(i,t,1);e.focusDate(n);this.invalidate();this.getCardInstance().scheduleFireStateChanged()};M.prototype.changeDate=function(t){var e=this.getActions(),a=new b,i=this._oCalendar;a.setStartDate(t);i.destroySelectedDates();i.addAggregation("selectedDates",a);this._oFocusedDate=i.getSelectedDates()[0]?i.getSelectedDates()[0]:null;this.changeMonth(t.getMonth());e.fireAction(this,"DateChange",{selectedDate:t})};M.prototype._createCardContent=function(){this._oCalendar=new d(this.getId()+"-navigation",{startDateChange:function(t){var e=t.getSource()._getFocusedDate().toLocalJSDate();this._handleStartDateChange(e)}.bind(this),select:function(t){var e=t.getSource().getSelectedDates()[0].getStartDate();this._setParameters(t,t.getParameter("startDate"));this._refreshVisibleAppointments(e);this.invalidate();this._handleSelect(e)}.bind(this)});this._oLegend=new g(this.getId()+"-legend",{columnWidth:"7.5rem",standardItems:[]});this._oCalendar.setLegend(this._oLegend);this._oContent=new c(this.getId()+"-wrapper",{items:[this._oCalendar,this._oLegend]});this.setAggregation("_content",this._oContent);this._oFormatAria=u.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+x.call(this).getTimePattern("medium")})};M.prototype.init=function(){this._aVisibleAppointments=[];s.prototype.init.apply(this,arguments);this._createCardContent()};M.prototype.exit=function(){if(this._sTwoColumnsResizeListener){i.deregister(this._sTwoColumnsResizeListener);this._sTwoColumnsResizeListener=undefined}s.prototype.exit.apply(this,arguments);if(this._oAppointmentTemplate){this._oAppointmentTemplate.destroy();this._oAppointmentTemplate=null}if(this._oSpecialDateTemplate){this._oSpecialDateTemplate.destroy();this._oSpecialDateTemplate=null}if(this._oCalendarLegendItemTemplate){this._oCalendarLegendItemTemplate.destroy();this._oCalendarLegendItemTemplate=null}if(this._oAppointmentLegendItemTemplate){this._oAppointmentLegendItemTemplate.destroy();this._oAppointmentLegendItemTemplate=null}if(this._bDataInitiallyLoaded){this._bDataInitiallyLoaded=null}};M.prototype.onDataChanged=function(){var t=this._oCalendar.getSelectedDates()[0]&&this._oCalendar.getSelectedDates()[0].getStartDate();if(!t){return}if(!this._bDataInitiallyLoaded){this._handleSelect(t);this._handleStartDateChange(t);this._bDataInitiallyLoaded=true}this._setParameters();this._refreshVisibleAppointments(t);this.invalidate()};M.prototype.onBeforeRendering=function(){s.prototype.onBeforeRendering.apply(this,arguments);var t=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();this._setParameters();this._refreshVisibleAppointments(t);this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)};M.prototype.onAfterRendering=function(){s.prototype.onAfterRendering.call(this,arguments);if(!this._sTwoColumnsResizeListener){this._sTwoColumnsResizeListener=i.register(this,this.resizeHandler);this.resizeHandler({control:this,target:this.getDomRef()})}};M.prototype.resizeHandler=function(t){t.control.toggleStyleClass("sapMPCInCardTwoColumns",t.target.getBoundingClientRect().width>576)};M.prototype.createLoadingPlaceholder=function(t){var e=this.getCardInstance(),a=e.getContentMinItems(t);return new l({minItems:a!==null?a:2,maxLegendItems:t.maxLegendItems?parseInt(t.maxLegendItems):2,item:t.item?t.item.template:{},legendItem:t.legendItem?t.legendItem.template:{}})};M.prototype.applyConfiguration=function(){var t=this.getParsedConfiguration();this.fireEvent("_actionContentReady");if(!t){return}if(t.item){this._addItem(t.item)}if(t.specialDate){this._addSpecialDate(t.specialDate)}if(t.legendItem){this._addLegendItem(t.legendItem)}if(t.date){this._addDate(t.date)}if(t.maxItems){this._addMaxItems(t.maxItems)}if(t.maxLegendItems){this._addMaxLegendItems(t.maxLegendItems)}if(t.noItemsText){this._addNoItemsText(t.noItemsText)}if(t.moreItems&&t.moreItems.actions){this._oActions.attach({area:L.Content,actions:t.moreItems.actions,control:this._getMoreButton()})}};M.prototype._getStaticConfigurationLegendItems=function(t,e,a,i){var n=[];t.forEach(function(t,e){var s=Object.keys(a.legendItem.template),l={};s.forEach(function(t){var n=o.prependRelativePaths(a.legendItem.template[t],i.getBindingPath("items")+"/"+e);l[t]=r.resolveValue(n,this)}.bind(this));n.push(l)}.bind(this));e.forEach(function(t,e){var s=Object.keys(a.legendItem.template),l={};s.forEach(function(t){var n=o.prependRelativePaths(a.legendItem.template[t],i.getBindingPath("items")+"/"+e);l[t]=r.resolveValue(n,this)}.bind(this));n.push(l)}.bind(this));return n};M.prototype._getStaticConfigurationSpecialDates=function(t,e){var a=[];t.forEach(function(t,i){var n=this._oCalendar,s=t.getStartDate(),l=t.getEndDate(),p=n._getMonthPicker().getMonth()?n._getMonthPicker().getMonth():n._getFocusedDate().getMonth(),d=Number(n._getYearString()),g=s.getMonth()===p,m=l?l.getMonth()===p:false,h=s.getFullYear()===d,c=t.getEndDate()?t.getEndDate().getFullYear()===d:h,u=(g||m)&&(h||c),f,D;if(u){f=Object.keys(e.specialDate.template);var _={};f.forEach(function(t){_[t]=o.prependRelativePaths(e.specialDate.template[t],this._oCalendar.getBindingPath("specialDates")+"/"+i)}.bind(this));D=r.resolveValue(_,this);D.startDate=new Date(D.startDate).toISOString();if(D.endDate){D.endDate=new Date(D.endDate).toISOString()}a.push(D)}}.bind(this));return a};M.prototype._getStaticConfigurationAppointments=function(t,e,a,i){var n=[],s=false;t.forEach(function(t,l){var p=t.getStartDate(),d=t.getEndDate(),g,m,h=p>=e&&p<=a,c=d>=e&&d<=a,u=p<=e&&d>a,f=h||c||u;if(f){g=Object.keys(i.item.template);m={};g.forEach(function(t){var e=o.prependRelativePaths(i.item.template[t],this.getBindingPath("appointments")+"/"+l);m[t]=r.resolveValue(e,this)}.bind(this));m.startDate=new Date(m.startDate).toISOString();if(m.endDate){m.endDate=new Date(m.endDate).toISOString()}n.push(m);if(n.length>i.maxItems){s=true}}}.bind(this));return{resolvedItems:n,moreItems:s}};M.prototype.getStaticConfiguration=function(){var t=this.getParsedConfiguration(),e=this.getAppointments(),i=this._oCalendar.getSpecialDates(),n=this._oCalendar.getLegend(),s=a.getElementById(n),o=s.getItems(),l=s.getAppointmentItems(),p=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0].getStartDate():null,d=864e5,g=this._oCalendar.getSelectedDates()[0]?this._oCalendar.getSelectedDates()[0]:null,m=g.getStartDate?g.getStartDate().getTime()+d:null,h=g.getStartDate(),c=t.maxItems,u=t.maxLegendItems,f=t.noItemsText,D=false,_={},I,C,y,S,A;A=p?p.toISOString():null;A=A?A:t.date;I=this._getStaticConfigurationAppointments(e,h,m,t);S=I.resolvedItems;D=I.moreItems;C=this._getStaticConfigurationSpecialDates(i,t);y=this._getStaticConfigurationLegendItems(o,l,t,s);_.items=S;_.specialDates=C;_.legendItems=y;_.date=A;_.maxItems=c;_.maxLegendItems=u;_.noItemsText=f;if(D){_.moreItems=r.resolveValue(t.moreItems,this)}return _};M.prototype._setParameters=function(t,e){var a,i,n,s,o;if(e){a=e}else if(this._oCalendar.getSelectedDates().length){a=this._oCalendar.getSelectedDates()[0].getStartDate()}else{a=this._oCalendar.getStartDate()}i=T.getInstance(a.getFullYear(),a.getMonth(),a.getDate()).getTime();n=T.getInstance(a.getFullYear(),a.getMonth(),a.getDate()+1).getTime();s=this.getAppointments();if(s){o=s.filter(function(t){var e=t.getStartDate().getTime(),a=t.getEndDate().getTime();if(e>=i&&e<n||a>i&&a<=n||e<i&&a>n){return t}})}else{o=[]}this._iAllItems=o.length;this._iMaxItems=this.getVisibleAppointmentsCount();this._iVisibleItems=Math.min(this._iMaxItems,this._iAllItems);if(this.getModel("parameters")){this.getModel("parameters").setProperty("/visibleItems",this._iVisibleItems);this.getModel("parameters").setProperty("/allItems",this._iAllItems)}};M.prototype._refreshVisibleAppointments=function(t){this._aVisibleAppointments=this._calculateVisibleAppointments(this.getAppointments(),t)};M.prototype._calculateVisibleAppointments=function(t,e){var a=this._isAppointmentInSelectedDate(e);var i=function(t,a){var i=t.getEndDate(),n=T.getInstance();if(e.getDate()===n.getDate()&&e.getMonth()===n.getMonth()&&e.getFullYear()===n.getFullYear()){return this._iAllItems-a<this._iVisibleItems||i.getTime()>n.getTime()}return true};var n=t.filter(a,this).sort(this._sortByStartHourCB).filter(i,this).slice(0,this._iVisibleItems);return n};M.prototype._sortByStartHourCB=function(t,e){return t.getStartDate().getTime()-e.getStartDate().getTime()||e.getEndDate().getTime()-t.getEndDate().getTime()};M.prototype._isAppointmentInSelectedDate=function(t){return function(e){var a=e.getStartDate().getTime(),i=e.getEndDate().getTime(),n=t.getTime(),s=A.getInstance(T.getInstance(t.getTime())),o,r,l,p;s.setDate(s.getDate()+1);o=s.getTime()-1e3;r=a<n&&i>o;l=a>=n&&a<o;p=i>n&&i<=o;return r||l||p}};M.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};M.prototype.formatDate=function(t){var e=u.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}).parse(t);if(!e){e=u.getInstance({pattern:"yyyy-MM-dd"}).parse(t)}return e};M.prototype._addItem=function(t){var e={title:t.template.title,text:t.template.text,type:t.template.type},a;if(t.template.startDate){e.startDate=o.formattedProperty(t.template.startDate,this.formatDate)}if(t.template.endDate){e.endDate=o.formattedProperty(t.template.endDate,this.formatDate)}if(t.template.icon&&t.template.icon.src){e.icon=o.formattedProperty(t.template.icon.src,function(t){return this._oIconFormatter.formatSrc(t)}.bind(this))}this._oAppointmentTemplate=new p(e);var i=this.getActions();i.attach({area:L.ContentItem,actions:t.template.actions,control:this,actionControl:this._oAppointmentTemplate,enabledPropertyName:"clickable",enabledPropertyValue:true,disabledPropertyValue:false});a={path:t.path,template:this._oAppointmentTemplate};this._bindAggregationToControl("appointments",this,a)};M.prototype._addSpecialDate=function(t){var e=t.template,a;if(e.startDate){e.startDate=o.formattedProperty(e.startDate,this.formatDate)}if(e.endDate){e.endDate=o.formattedProperty(e.endDate,this.formatDate)}this._oSpecialDateTemplate=new S(e);a={path:t.path,template:this._oSpecialDateTemplate};this._bindAggregationToControl("specialDates",this._oCalendar,a)};M.prototype._addLegendItem=function(t){var e={text:t.template.text,type:t.template.type},a={text:t.template.text,type:t.template.type},i,n;this._oCalendarLegendItemTemplate=new v(e);i={path:t.path,template:this._oCalendarLegendItemTemplate,filters:new _({path:"category",operator:I.Contains,value1:"calendar"})};this._bindAggregationToControl("items",this._oLegend,i);this._oAppointmentLegendItemTemplate=new v(a);n={path:t.path,template:this._oAppointmentLegendItemTemplate,filters:new _({path:"category",operator:I.Contains,value1:"appointment"})};this._bindAggregationToControl("appointmentItems",this._oLegend,n)};M.prototype._addDate=function(t){if(o.isBindingInfo(t)){if(!t){return}var e=new S;e.bindProperty("startDate",o.formattedProperty(t,this.formatDate));this._oCalendar.addSelectedDate(e)}else{this._oCalendar.addSelectedDate(new S({startDate:this.formatDate(t)}));var a=this.formatDate(t);this._handleSelect(a);this._handleStartDateChange(a);this._bDataInitiallyLoaded=true}};M.prototype._addMaxItems=function(t){if(o.isBindingInfo(t)){t&&this.bindProperty("visibleAppointmentsCount",t)}else{this.setVisibleAppointmentsCount(t)}};M.prototype._addMaxLegendItems=function(t){if(o.isBindingInfo(t)){t&&this._oLegend.bindProperty("visibleLegendItemsCount",t)}else{this._oLegend.setVisibleLegendItemsCount(t)}};M.prototype._addNoItemsText=function(t){if(o.isBindingInfo(t)){t&&this.bindProperty("noAppointmentsText",t)}else{this.setNoAppointmentsText(t)}};M.prototype._getMoreButton=function(){if(!this._oMoreAppsButton){this._oMoreAppsButton=new h({text:"More"})}return this._oMoreAppsButton};M.prototype._bNeedForMoreButton=function(){return this._iAllItems>this.getVisibleAppointmentsCount()};M.prototype._getCurrentAppointment=function(){var t=this._getVisibleAppointments(),e=T.getInstance(),a,i,n,s,o=this._oCalendar.getSelectedDates().length?this._oCalendar.getSelectedDates()[0].getStartDate():this._oCalendar.getStartDate();if(o.getDate()===e.getDate()&&o.getMonth()===e.getMonth()&&o.getFullYear()===e.getFullYear()){for(s=t.length-1;s>=0;s--){a=t[s];i=a.getStartDate().getTime();n=a.getEndDate().getTime();if(e.getTime()>i&&e.getTime()<n){return a}}}};M.prototype._handleStartDateChange=function(t){var e=this.getActions(),a=C.fromLocalJSDate(t),i=y._getFirstDateOfWeek(y._getFirstDateOfMonth(a)),n=new C(t.getFullYear(),t.getMonth()+1,1),s;n.setDate(n.getDate()-1);s=y._getFirstDateOfWeek(n);s.setDate(s.getDate()+6);e.fireAction(this,"MonthChange",{firstDate:i.toLocalJSDate(),lastDate:s.toLocalJSDate()})};M.prototype._handleSelect=function(t){var e=this.getActions();e.fireAction(this,"DateChange",{selectedDate:t})};function x(){if(!this._oLocaleData){var t=P.call(this);var e=new f(t);this._oLocaleData=D.getInstance(e)}return this._oLocaleData}function P(){if(!this._sLocale){this._sLocale=new f(e.getLanguageTag()).toString()}return this._sLocale}return M});
//# sourceMappingURL=CalendarContent.js.map