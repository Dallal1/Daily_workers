/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isPlainObject","sap/ui/base/ManagedObject","sap/ui/dt/Util","sap/ui/rta/service/index","sap/ui/rta/util/ServiceEventBus"],function(e,t,i,r,s){"use strict";const n="SERVICE_STARTING";const c="SERVICE_STARTED";const a="SERVICE_FAILED";const o=t.extend("sap.ui.rta.util.ServiceManager",{metadata:{properties:{services:{type:"any",defaultValue:{}}}},constructor:function(...e){t.apply(this,e)}});function u(e){if(r.hasOwnProperty(e)){return r[e].replace(/\./g,"/")}return undefined}async function v(){const e=[];Object.values(this.getServices()).forEach(t=>{e.push(t.initPromise.then(()=>{if(typeof t.service.destroy==="function"){t.service.destroy()}}))});await Promise.all(e);this.setServices({})}o.prototype.getServices=function(){return Object.assign({},this.getProperty("services"))};o.prototype.startService=function(t,r){const o=u(t);const v=this.getServices();let h;if(!o){return Promise.reject(Error(`sap.ui.rta, ServiceManager#startService: Unknown service. Can't find any registered service by name '${t}'`))}h=v[t];if(h){switch(h.status){case c:{return Promise.resolve(h.exports)}case n:{return h.initPromise}case a:{return h.initPromise}default:{return Promise.reject(Error(`sap.ui.rta, ServiceManager#startService: Unknown service status. Service name = '${t}'`))}}}else{h={};h.status=n;h.location=o;h.initPromise=new Promise(function(n,u){sap.ui.require([o],async function(a){try{h.factory=a;this._oServiceEventBus||=new s;const o=await a(r,this._oServiceEventBus.publish.bind(this._oServiceEventBus,t));if(r.bIsDestroyed){throw Error(`sap.ui.rta, ServiceManager#startService: RuntimeAuthoring instance is destroyed while initializing the service '${t}'`)}if(!e(o)){throw Error(`sap.ui.rta, ServiceManager#startService: Invalid service format. Service should return simple javascript object after initialization. Service name = '${t}'`)}h.service=o;h.exports={};if(Array.isArray(o.events)&&o.events.length>0){Object.assign(h.exports,{attachEvent:this._oServiceEventBus.subscribe.bind(this._oServiceEventBus,t),detachEvent:this._oServiceEventBus.unsubscribe.bind(this._oServiceEventBus,t),attachEventOnce:this._oServiceEventBus.subscribeOnce.bind(this._oServiceEventBus,t)})}const u=o.exports||{};Object.assign(h.exports,Object.keys(u).reduce(function(e,t){const s=u[t];e[t]=typeof s==="function"?i.waitForSynced(r._oDesignTime,s):s;return e},{}));h.status=c;n(Object.freeze(h.exports))}catch(e){u(e)}}.bind(this),function(e){h.status=a;u(e)})}.bind(this)).catch(function(e){h.status=a;return Promise.reject(e)});v[t]=h;this.setServices(v);return h.initPromise}};o.prototype.destroy=function(){v.call(this);if(this._oServiceEventBus){this._oServiceEventBus.destroy()}};return o});
//# sourceMappingURL=ServiceManager.js.map