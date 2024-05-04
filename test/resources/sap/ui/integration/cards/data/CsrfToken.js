/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],()=>{"use strict";const e=new Map;class t{#e;#t;#n;#s;value;constructor(e,t,n){this.#e=e;this.#t=t;this.#n=n;this.#s=t.data.request.url}load(){return this.#i()}setExpired(){e.delete(this.#s)}async#i(){const t=await this.#n.fetchValueByHost(this.#t);if(t){this.#n.onTokenFetched(this.#e,t);this.value=t;return}if(!e.has(this.#s)){e.set(this.#s,this.#n.fetchValue(this.#e,this.#t))}const n=await e.get(this.#s);this.#n.onTokenFetched(this.#e,n);this.value=n}}return t});
//# sourceMappingURL=CsrfToken.js.map