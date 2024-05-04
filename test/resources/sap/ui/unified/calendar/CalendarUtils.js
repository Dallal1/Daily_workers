/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Formatting","sap/base/i18n/Localization","sap/ui/core/date/UniversalDate","./CalendarDate","sap/ui/core/CalendarType","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/date/UI5Date"],function(e,t,a,n,r,i,s,g){"use strict";var u={};u.MAX_MILLISECONDS=864e13;u.HOURS24=1e3*3600*24;u._createLocalDate=function(e,t){var n;if(e){var r;if(e instanceof a){r=e.getJSDate()}else{r=e}n=g.getInstance(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate());if(r.getFullYear()<1e3){n.setFullYear(r.getFullYear())}if(t){n.setHours(r.getUTCHours());n.setMinutes(r.getUTCMinutes());n.setSeconds(r.getUTCSeconds());n.setMilliseconds(r.getUTCMilliseconds())}}return n};u._createUTCDate=function(e,t){var n;if(e){var r;if(e instanceof a){r=e.getJSDate()}else{r=e}n=g.getInstance(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()));if(r.getFullYear()<1e3){n.setUTCFullYear(r.getFullYear())}if(t){n.setUTCHours(r.getHours());n.setUTCMinutes(r.getMinutes());n.setUTCSeconds(r.getSeconds());n.setUTCMilliseconds(r.getMilliseconds())}}return n};u._createUniversalUTCDate=function(e,t,n){var r;if(t){r=a.getInstance(this._createUTCDate(e,n),t)}else{r=new a(this._createUTCDate(e,n).getTime())}return r};u.calculateWeekNumber=function(e,t,n,r){var i=0;var s=0;var g=r.getFirstDayOfWeek();var u=r.firstDayStartsFirstWeek();if(u){var l=new a(e.getTime());l.setUTCFullYear(t,0,1);s=l.getUTCDay();var o=new a(e.getTime());o.setUTCDate(o.getUTCDate()-o.getUTCDay()+s);i=Math.round((o.getTime()-l.getTime())/864e5/7)+1}else{var T=new a(e.getTime());T.setUTCDate(T.getUTCDate()-g);s=T.getUTCDay();T.setUTCDate(T.getUTCDate()-s+4);var c=new a(T.getTime());c.setUTCMonth(0,1);s=c.getUTCDay();var C=0;if(s>4){C=7}var f=new a(c.getTime());f.setUTCDate(1-s+4+C);i=Math.round((T.getTime()-f.getTime())/864e5/7)+1}return i};u.getFirstDateOfWeek=function(n,r){var g=new a(n.getTime()),u,l,o=s.getInstance(new i(e.getLanguageTag())),T=new i(t.getLanguageTag()),c=o.getFirstDayOfWeek(),C;if(!r||(r.firstDayOfWeek===-1||r.firstDayOfWeek===undefined)){r={firstDayOfWeek:o.getFirstDayOfWeek(),minimalDaysInFirstWeek:o.getMinimalDaysInFirstWeek()}}C=a.getWeekByDate(g.getCalendarType(),g.getUTCFullYear(),g.getUTCMonth(),g.getUTCDate(),T,r);u=a.getFirstDateOfWeek(g.getCalendarType(),C.year,C.week,T,r);l=new a(a.UTC(u.year,u.month,u.day));if(r&&(r.firstDayOfWeek===-1||r.firstDayOfWeek===undefined)){while(l.getUTCDay()!==c){l.setUTCDate(l.getUTCDate()-1)}}return new a(a.UTC(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds())).getJSDate()};u.getFirstDateOfMonth=function(e){var t=new a(e.getTime());t.setUTCDate(1);return t};u._getNumberOfWeeksForYear=function(t){var a=e.getLanguageTag().toString(),n=s.getInstance(new i(a)),r=g.getInstance(Date.UTC(t,0,1)),u=r.getUTCDay(),l=52;if(n.getFirstDayOfWeek()===0){if(u===5||u===6){l=53}}else{if(u===3||u===4){l=53}}return l};u.monthsDiffer=function(e,t){return e.getMonth()!==t.getMonth()||e.getFullYear()!==t.getFullYear()};u.isDateLastInMonth=function(e){var t=g.getInstance(e.getTime()+24*60*60*1e3);return t.getUTCDate()<e.getUTCDate()};u._updateUTCDate=function(e,t,a,n,r,i,s,g){if(t!=null){e.setUTCFullYear(t)}if(a!=null){e.setUTCMonth(a)}if(n!=null){e.setUTCDate(n)}if(r!=null){e.setUTCHours(r)}if(i!=null){e.setUTCMinutes(i)}if(s!=null){e.setUTCSeconds(s)}if(g!=null){e.setUTCMilliseconds(g)}};u._checkJSDateObject=function(e){if(!e||Object.prototype.toString.call(e)!=="[object Date]"||isNaN(e)){throw new Error("Date must be a JavaScript or UI5Date date object.")}};u._checkYearInValidRange=function(t,a){var i=e.getCalendarType(),s=new n(this._minDate(r.Gregorian),a||i),g=new n(this._maxDate(r.Gregorian),a||i);if(typeof t!=="number"||t<s.getYear()||t>g.getYear()){throw new Error("Year must be in valid range (between year 0001 and year 9999 in Gregorian calendar type).")}};u._isNextMonth=function(e,t){return e.getMonth()>t.getMonth()&&e.getFullYear()===t.getFullYear()||e.getFullYear()>t.getFullYear()};u._minutesBetween=function(e,t){var a=(t.getTime()-e.getTime())/1e3;a=a/60;return Math.abs(Math.round(a))};u._areCurrentMinutesLessThan=function(e){var t=g.getInstance().getMinutes();return e>=t};u._areCurrentMinutesMoreThan=function(e){var t=g.getInstance().getMinutes();return e<=t};u._monthsBetween=function(e,t,a){var n=g.getInstance(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())),r=g.getInstance(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())),i;n.setUTCFullYear(e.getUTCFullYear());r.setUTCFullYear(t.getUTCFullYear());i=r.getUTCFullYear()*12+r.getUTCMonth()-(n.getUTCFullYear()*12+n.getUTCMonth());if(!a){i=Math.abs(i)}return i};u._hoursBetween=function(e,t){var a=g.getInstance(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours()));var n=g.getInstance(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours()));a.setUTCFullYear(e.getUTCFullYear());n.setUTCFullYear(t.getUTCFullYear());return Math.abs((a.getTime()-n.getTime())/(1e3*60*60))};u._isMidnight=function(e){return e.getHours()===0&&e.getMinutes()===0&&e.getSeconds()===0&&e.getMilliseconds()===0};u._daysInMonth=function(e){this._checkCalendarDate(e);e=new n(e);e.setDate(1);e.setMonth(e.getMonth()+1);e.setDate(0);return e.getDate()};u._isLastDateInMonth=function(e){return e.getDate()===u._daysInMonth(e)};u._getFirstDateOfWeek=function(t,a){var r=s.getInstance(new i(e.getLanguageTag()));this._checkCalendarDate(t);if(!a||(a.firstDayOfWeek===-1||a.firstDayOfWeek===undefined)){a={firstDayOfWeek:r.getFirstDayOfWeek(),minimalDaysInFirstWeek:r.getMinimalDaysInFirstWeek()}}if(t.getDay()!==a.firstDayOfWeek){var g=u.getFirstDateOfWeek(t.toUTCJSDate(),a);g.setFullYear(g.getUTCFullYear(),g.getUTCMonth(),g.getUTCDate());return n.fromLocalJSDate(g,t.getCalendarType())}return t};u._getFirstDateOfMonth=function(e){this._checkCalendarDate(e);var t=new n(e,e.getCalendarType());t.setDate(1);return t};u._minDate=function(e){var t=new n(1,0,1,e);t.setYear(1);t.setMonth(0);t.setDate(1);return t};u._maxDate=function(e){var t=new n(9999,11,1,e);t.setYear(9999);t.setMonth(11);t.setDate(this._daysInMonth(t));return new n(t)};u._isBetween=function(e,t,a,n){this._checkCalendarDate(e);this._checkCalendarDate(t);this._checkCalendarDate(a);if(n){return e.isSameOrAfter(t)&&e.isSameOrBefore(a)}else{return e.isAfter(t)&&e.isBefore(a)}};u._daysBetween=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return Math.ceil((e.valueOf()-t.valueOf())/this.HOURS24)};u._isOutside=function(e,t,a){return!this._isBetween(e,t,a,true)};u._isSameMonthAndYear=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return e.getEra()===t.getEra()&&e.getYear()===t.getYear()&&e.getMonth()===t.getMonth()};u._checkCalendarDate=function(e){if(!e||!(e instanceof n)){throw"Invalid calendar date: ["+e+"]. Expected: sap.ui.unified.calendar.CalendarDate"}};u._getWeek=function(e){this._checkCalendarDate(e);return a.getWeekByDate(e.getCalendarType(),e.getYear(),e.getMonth(),e.getDate())};u._isWeekend=function(e,t){var a=e.getDay();return a===t.getWeekendStart()||a===t.getWeekendEnd()};return u},true);
//# sourceMappingURL=CalendarUtils.js.map