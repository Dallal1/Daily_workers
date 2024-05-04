/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/VersionInfo"],function(e,t,n,r){"use strict";var a="sap/ui/fl/write/_internal/connectors/";function i(){return n.getConnectors(a,false)}function o(e,t){var n=t.filter(function(t){return t.layers.indexOf("ALL")!==-1||t.layers.indexOf(e)!==-1});if(n.length===1){return n[0]}if(n.length===0){throw new Error(`No Connector configuration could be found to write into layer: ${e}`)}if(n.length>1){throw new Error(`sap.ui.core.Configuration 'flexibilityServices' has a misconfiguration: Multiple `+`Connector configurations were found to write into layer: ${e}`)}return undefined}function s(e){if(!e){return Promise.reject("No layer was provided")}return i().then(o.bind(this,e))}function c(e){if(e.draft){return new Promise(function(t,n){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(r){r.isVersioningEnabled(e.layer).then(function(r){if(r){t()}else{n(`Draft is not supported for the given layer: ${e.layer}`)}})})})}return Promise.resolve()}function u(e,n){var r=n.filter(function(n){return n.getState()===t.LifecycleState.NEW&&n.getFileType()===e.getFileType()});var a=r.findIndex(function(t){return t.getId()===e.getId()});return a}async function d(e){var n;if(e.allChanges&&e.allChanges.length&&e.condensedChanges){await l(e.condensedChanges);n={namespace:e.allChanges[0].convertToFileContent().namespace,layer:e.layer};var r=0;var a=false;e.reference||=e.allChanges[0].convertToFileContent().reference;e.allChanges.forEach(function(i,o){var s=i.getFileType();var c=u(i,e.condensedChanges);if(i.condenserState){var d=false;if(i.condenserState==="delete"){if(i.getState()===t.LifecycleState.PERSISTED||i.getState()===t.LifecycleState.DELETED){n.delete||={};n.delete[s]||=[];n.delete[s].push(i.getId())}r++}else if(e.condensedChanges.length){d=e.allChanges[o].getId()!==e.condensedChanges[o-r].getId()}if((i.condenserState==="select"&&i.getState()!==t.LifecycleState.NEW||i.condenserState==="update")&&d&&!a){var l=e.condensedChanges.slice(o-r).map(function(e){return e.getId()});n.reorder||={};n.reorder[s]||=[];n.reorder[s]=l;a=true}if(i.condenserState==="select"&&i.getState()===t.LifecycleState.NEW){n.create||={};n.create[s]||=[];n.create[s][c]={};n.create[s][c][i.getId()]=i.convertToFileContent()}else if(i.condenserState==="update"){n.update||={};n.update[s]||=[];var f=n.update[s].length;n.update[s][f]={};n.update[s][f][i.getId()]={content:i.getContent()}}delete i.condenserState}else if(i.getState()===t.LifecycleState.NEW){n.create||={};n.create[s]||=[];n.create[s][c]={};n.create[s][c][i.getId()]=i.convertToFileContent()}})}return n}async function l(e){const t=await r.load();const n=t.version;e.forEach(e=>{if(e.isA&&e.isA("sap.ui.fl.apply._internal.flexObjects.FlexObject")){const t=e.getSupportInformation();t.sapui5Version||=n;e.setSupportInformation(t)}else{e.support||={};e.support.sapui5Version||=n}})}function f(t,n){return c(n).then(s.bind(undefined,n.layer)).then(function(r){n.url=r.url;var a=e.get(t,r.writeConnectorModule);return a.call(r.writeConnectorModule,n)})}var p={};p.write=async function(e){await l(e.flexObjects);return f("write",e)};p.condense=async function(e){const t=Object.assign({},e);const n=await d(t);if(!n){return Promise.reject("No changes were provided")}if(n.create||n.reorder||n.update||n.delete){var r=[];if(n.create){r=(n.create.change?n.create.change:[]).concat(n.create.ctrl_variant?n.create.ctrl_variant:[])}t.flexObjects=n;const e=await f("condense",t);if(e&&e.status&&e.status===205&&r.length){var a=r.map(function(e){return Object.values(e).pop()});e.response=a}return e}return undefined};p.remove=function(e){return f("remove",e)};p.update=function(e){return f("update",e)};p.reset=function(e){return f("reset",e)};p.getFlexInfo=function(e){return f("getFlexInfo",e)};p.getContexts=function(e){return f("getContexts",e)};p.loadContextDescriptions=function(e){return f("loadContextDescriptions",e)};p.isContextSharingEnabled=function(e){return f("isContextSharingEnabled",e)};p.publish=function(e){return f("publish",e)};p.contextBasedAdaptation={create(e){return i().then(f.bind(undefined,"contextBasedAdaptation.create",e))},reorder(e){return i().then(f.bind(undefined,"contextBasedAdaptation.reorder",e))},update(e){return i().then(f.bind(undefined,"contextBasedAdaptation.update",e))},load(e){return i().then(f.bind(undefined,"contextBasedAdaptation.load",e))},remove(e){return i().then(f.bind(undefined,"contextBasedAdaptation.remove",e))}};p.versions={load(e){return i().then(f.bind(undefined,"versions.load",e))},activate(e){return i().then(f.bind(undefined,"versions.activate",e))},discardDraft(e){return i().then(f.bind(undefined,"versions.discardDraft",e))},publish(e){return i().then(f.bind(undefined,"versions.publish",e))}};p.translation={getSourceLanguages(e){return i().then(f.bind(undefined,"translation.getSourceLanguages",e))},getTexts(e){return i().then(f.bind(undefined,"translation.getTexts",e))},postTranslationTexts(e){return i().then(f.bind(undefined,"translation.postTranslationTexts",e))}};return p});
//# sourceMappingURL=Storage.js.map