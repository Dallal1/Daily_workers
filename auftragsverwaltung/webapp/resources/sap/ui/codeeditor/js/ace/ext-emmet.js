ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],function(e,t,n){"use strict";var r=e("./lib/dom");var i=e("./lib/oop");var a=e("./lib/event_emitter").EventEmitter;var s=e("./lib/lang");var o=e("./range").Range;var c=e("./range_list").RangeList;var f=e("./keyboard/hash_handler").HashHandler;var u=e("./tokenizer").Tokenizer;var p=e("./clipboard");var l={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,n){var r=e.session.getTextRange();if(n)return r.replace(/\n\r?([ \t]*\S)/g,"\n"+n+"$1");return r},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return p.getText&&p.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.start||""},BLOCK_COMMENT_END:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.end||""},LINE_COMMENT:function(e){var t=e.session.$mode||{};return t.lineCommentStart||""},CURRENT_YEAR:h.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:h.bind(null,{year:"2-digit"}),CURRENT_MONTH:h.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:h.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:h.bind(null,{month:"short"}),CURRENT_DATE:h.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:h.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:h.bind(null,{weekday:"short"}),CURRENT_HOUR:h.bind(null,{hour:"2-digit",hour12:false}),CURRENT_MINUTE:h.bind(null,{minute:"2-digit"}),CURRENT_SECOND:h.bind(null,{second:"2-digit"})};l.SELECTED_TEXT=l.SELECTION;function h(e){var t=(new Date).toLocaleString("en-us",e);return t.length==1?"0"+t:t}var d=function(){function e(){this.snippetMap={};this.snippetNameMap={};this.variables=l}e.prototype.getTokenizer=function(){return e.$tokenizer||this.createTokenizer()};e.prototype.createTokenizer=function(){function t(e){e=e.substr(1);if(/^\d+$/.test(e))return[{tabstopId:parseInt(e,10)}];return[{text:e}]}function n(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var r={regex:"/("+n("/")+"+)/",onMatch:function(e,t,n){var r=n[0];r.fmtString=true;r.guard=e.slice(1,-1);r.flag="";return""},next:"formatString"};e.$tokenizer=new u({start:[{regex:/\\./,onMatch:function(e,t,n){var r=e[1];if(r=="}"&&n.length){e=r}else if("`$\\".indexOf(r)!=-1){e=r}return[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:t},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,n,r){var i=t(e.substr(1));r.unshift(i[0]);return i},next:"snippetVar"},{regex:/\n/,token:"newline",merge:false}],snippetVar:[{regex:"\\|"+n("\\|")+"*\\|",onMatch:function(e,t,n){var r=e.slice(1,-1).replace(/\\[,|\\]|,/g,function(e){return e.length==2?e[1]:"\0"}).split("\0").map(function(e){return{value:e}});n[0].choices=r;return[r[0]]},next:"start"},r,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,n){if(n.length&&n[0].expectElse){n[0].expectElse=false;n[0].ifEnd={elseEnd:n[0]};return[n[0].ifEnd]}return":"}},{regex:/\\./,onMatch:function(e,t,n){var r=e[1];if(r=="}"&&n.length)e=r;else if("`$\\".indexOf(r)!=-1)e=r;else if(r=="n")e="\n";else if(r=="t")e="\t";else if("ulULE".indexOf(r)!=-1)e={changeCase:r,local:r>"a"};return[e]}},{regex:"/\\w*}",onMatch:function(e,t,n){var r=n.shift();if(r)r.flag=e.slice(1,-1);this.next=r&&r.tabstopId?"start":"";return[r||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,n){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,n){var r={text:e.slice(2)};n.unshift(r);return[r]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:false},{regex:/}/,onMatch:function(e,t,n){var r=n.shift();this.next=r&&r.tabstopId?"start":"";return[r||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,n){var r=n[0];r.formatFunction=e.slice(2,-1);return[n.shift()]},next:"formatString"},r,{regex:/:[\?\-+]?/,onMatch:function(e,t,n){if(e[1]=="+")n[0].ifEnd=n[0];if(e[1]=="?")n[0].expectElse=true},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]});return e.$tokenizer};e.prototype.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})};e.prototype.getVariableValue=function(e,t,n){if(/^\d+$/.test(t))return(this.variables.__||{})[t]||"";if(/^[A-Z]\d+$/.test(t))return(this.variables[t[0]+"__"]||{})[t.substr(1)]||"";t=t.replace(/^TM_/,"");if(!this.variables.hasOwnProperty(t))return"";var r=this.variables[t];if(typeof r=="function")r=this.variables[t](e,t,n);return r==null?"":r};e.prototype.tmStrFormat=function(e,t,n){if(!t.fmt)return e;var r=t.flag||"";var i=t.guard;i=new RegExp(i,r.replace(/[^gim]/g,""));var a=typeof t.fmt=="string"?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt;var s=this;var o=e.replace(i,function(){var e=s.variables.__;s.variables.__=[].slice.call(arguments);var t=s.resolveVariables(a,n);var r="E";for(var i=0;i<t.length;i++){var o=t[i];if(typeof o=="object"){t[i]="";if(o.changeCase&&o.local){var c=t[i+1];if(c&&typeof c=="string"){if(o.changeCase=="u")t[i]=c[0].toUpperCase();else t[i]=c[0].toLowerCase();t[i+1]=c.substr(1)}}else if(o.changeCase){r=o.changeCase}}else if(r=="U"){t[i]=o.toUpperCase()}else if(r=="L"){t[i]=o.toLowerCase()}}s.variables.__=e;return t.join("")});return o};e.prototype.tmFormatFunction=function(e,t,n){if(t.formatFunction=="upcase")return e.toUpperCase();if(t.formatFunction=="downcase")return e.toLowerCase();return e};e.prototype.resolveVariables=function(e,t){var n=[];var r="";var i=true;for(var a=0;a<e.length;a++){var s=e[a];if(typeof s=="string"){n.push(s);if(s=="\n"){i=true;r=""}else if(i){r=/^\t*/.exec(s)[0];i=/\S/.test(s)}continue}if(!s)continue;i=false;if(s.fmtString){var o=e.indexOf(s,a+1);if(o==-1)o=e.length;s.fmt=e.slice(a+1,o);a=o}if(s.text){var c=this.getVariableValue(t,s.text,r)+"";if(s.fmtString)c=this.tmStrFormat(c,s,t);if(s.formatFunction)c=this.tmFormatFunction(c,s,t);if(c&&!s.ifEnd){n.push(c);f(s)}else if(!c&&s.ifEnd){f(s.ifEnd)}}else if(s.elseEnd){f(s.elseEnd)}else if(s.tabstopId!=null){n.push(s)}else if(s.changeCase!=null){n.push(s)}}function f(t){var n=e.indexOf(t,a+1);if(n!=-1)a=n}return n};e.prototype.getDisplayTextForSnippet=function(e,t){var n=g.call(this,e,t);return n.text};e.prototype.insertSnippetForSelection=function(e,t,n){if(n===void 0){n={}}var r=g.call(this,e,t,n);var i=e.getSelectionRange();var a=e.session.replace(i,r.text);var s=new m(e);var o=e.inVirtualSelectionMode&&e.selection.index;s.addTabstops(r.tabstops,i.start,a,o)};e.prototype.insertSnippet=function(e,t,n){if(n===void 0){n={}}var r=this;if(e.inVirtualSelectionMode)return r.insertSnippetForSelection(e,t,n);e.forEachSelection(function(){r.insertSnippetForSelection(e,t,n)},null,{keepOrder:true});if(e.tabstopManager)e.tabstopManager.tabNext()};e.prototype.$getScope=function(e){var t=e.session.$mode.$id||"";t=t.split("/").pop();if(t==="html"||t==="php"){if(t==="php"&&!e.session.$mode.inlinePhp)t="html";var n=e.getCursorPosition();var r=e.session.getState(n.row);if(typeof r==="object"){r=r[0]}if(r.substring){if(r.substring(0,3)=="js-")t="javascript";else if(r.substring(0,4)=="css-")t="css";else if(r.substring(0,4)=="php-")t="php"}}return t};e.prototype.getActiveScopes=function(e){var t=this.$getScope(e);var n=[t];var r=this.snippetMap;if(r[t]&&r[t].includeScopes){n.push.apply(n,r[t].includeScopes)}n.push("_");return n};e.prototype.expandWithTab=function(e,t){var n=this;var r=e.forEachSelection(function(){return n.expandSnippetForSelection(e,t)},null,{keepOrder:true});if(r&&e.tabstopManager)e.tabstopManager.tabNext();return r};e.prototype.expandSnippetForSelection=function(e,t){var n=e.getCursorPosition();var r=e.session.getLine(n.row);var i=r.substring(0,n.column);var a=r.substr(n.column);var s=this.snippetMap;var o;this.getActiveScopes(e).some(function(e){var t=s[e];if(t)o=this.findMatchingSnippet(t,i,a);return!!o},this);if(!o)return false;if(t&&t.dryRun)return true;e.session.doc.removeInLine(n.row,n.column-o.replaceBefore.length,n.column+o.replaceAfter.length);this.variables.M__=o.matchBefore;this.variables.T__=o.matchAfter;this.insertSnippetForSelection(e,o.content);this.variables.M__=this.variables.T__=null;return true};e.prototype.findMatchingSnippet=function(e,t,n){for(var r=e.length;r--;){var i=e[r];if(i.startRe&&!i.startRe.test(t))continue;if(i.endRe&&!i.endRe.test(n))continue;if(!i.startRe&&!i.endRe)continue;i.matchBefore=i.startRe?i.startRe.exec(t):[""];i.matchAfter=i.endRe?i.endRe.exec(n):[""];i.replaceBefore=i.triggerRe?i.triggerRe.exec(t)[0]:"";i.replaceAfter=i.endTriggerRe?i.endTriggerRe.exec(n)[0]:"";return i}};e.prototype.register=function(e,t){var n=this.snippetMap;var r=this.snippetNameMap;var i=this;if(!e)e=[];function a(e){if(e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e))e="(?:"+e+")";return e||""}function o(e,t,n){e=a(e);t=a(t);if(n){e=t+e;if(e&&e[e.length-1]!="$")e=e+"$"}else{e=e+t;if(e&&e[0]!="^")e="^"+e}return new RegExp(e)}function c(e){if(!e.scope)e.scope=t||"_";t=e.scope;if(!n[t]){n[t]=[];r[t]={}}var a=r[t];if(e.name){var c=a[e.name];if(c)i.unregister(c);a[e.name]=e}n[t].push(e);if(e.prefix)e.tabTrigger=e.prefix;if(!e.content&&e.body)e.content=Array.isArray(e.body)?e.body.join("\n"):e.body;if(e.tabTrigger&&!e.trigger){if(!e.guard&&/^\w/.test(e.tabTrigger))e.guard="\\b";e.trigger=s.escapeRegExp(e.tabTrigger)}if(!e.trigger&&!e.guard&&!e.endTrigger&&!e.endGuard)return;e.startRe=o(e.trigger,e.guard,true);e.triggerRe=new RegExp(e.trigger);e.endRe=o(e.endTrigger,e.endGuard,true);e.endTriggerRe=new RegExp(e.endTrigger)}if(Array.isArray(e)){e.forEach(c)}else{Object.keys(e).forEach(function(t){c(e[t])})}this._signal("registerSnippets",{scope:t})};e.prototype.unregister=function(e,t){var n=this.snippetMap;var r=this.snippetNameMap;function i(e){var i=r[e.scope||t];if(i&&i[e.name]){delete i[e.name];var a=n[e.scope||t];var s=a&&a.indexOf(e);if(s>=0)a.splice(s,1)}}if(e.content)i(e);else if(Array.isArray(e))e.forEach(i)};e.prototype.parseSnippetFile=function(e){e=e.replace(/\r/g,"");var t=[],n={};var r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;var i;while(i=r.exec(e)){if(i[1]){try{n=JSON.parse(i[1]);t.push(n)}catch(e){}}if(i[4]){n.content=i[4].replace(/^\t/gm,"");t.push(n);n={}}else{var a=i[2],s=i[3];if(a=="regex"){var o=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=o.exec(s)[1];n.trigger=o.exec(s)[1];n.endTrigger=o.exec(s)[1];n.endGuard=o.exec(s)[1]}else if(a=="snippet"){n.tabTrigger=s.match(/^\S*/)[0];if(!n.name)n.name=s}else if(a){n[a]=s}}}return t};e.prototype.getSnippetByName=function(e,t){var n=this.snippetNameMap;var r;this.getActiveScopes(t).some(function(t){var i=n[t];if(i)r=i[e];return!!r},this);return r};return e}();i.implement(d.prototype,a);var g=function(e,t,n){if(n===void 0){n={}}var r=e.getCursorPosition();var i=e.session.getLine(r.row);var a=e.session.getTabString();var s=i.match(/^\s*/)[0];if(r.column<s.length)s=s.slice(0,r.column);t=t.replace(/\r/g,"");var o=this.tokenizeTmSnippet(t);o=this.resolveVariables(o,e);o=o.map(function(e){if(e=="\n"&&!n.excludeExtraIndent)return e+s;if(typeof e=="string")return e.replace(/\t/g,a);return e});var c=[];o.forEach(function(e,t){if(typeof e!="object")return;var n=e.tabstopId;var r=c[n];if(!r){r=c[n]=[];r.index=n;r.value="";r.parents={}}if(r.indexOf(e)!==-1)return;if(e.choices&&!r.choices)r.choices=e.choices;r.push(e);var i=o.indexOf(e,t+1);if(i===-1)return;var a=o.slice(t+1,i);var s=a.some(function(e){return typeof e==="object"});if(s&&!r.value){r.value=a}else if(a.length&&(!r.value||typeof r.value!=="string")){r.value=a.join("")}});c.forEach(function(e){e.length=0});var f={};function u(e){var t=[];for(var n=0;n<e.length;n++){var r=e[n];if(typeof r=="object"){if(f[r.tabstopId])continue;var i=e.lastIndexOf(r,n-1);r=t[i]||{tabstopId:r.tabstopId}}t[n]=r}return t}for(var p=0;p<o.length;p++){var l=o[p];if(typeof l!="object")continue;var h=l.tabstopId;var d=c[h];var g=o.indexOf(l,p+1);if(f[h]){if(f[h]===l){delete f[h];Object.keys(f).forEach(function(e){d.parents[e]=true})}continue}f[h]=l;var m=d.value;if(typeof m!=="string")m=u(m);else if(l.fmt)m=this.tmStrFormat(m,l,e);o.splice.apply(o,[p+1,Math.max(0,g-p)].concat(m,l));if(d.indexOf(l)===-1)d.push(l)}var v=0,b=0;var x="";o.forEach(function(e){if(typeof e==="string"){var t=e.split("\n");if(t.length>1){b=t[t.length-1].length;v+=t.length-1}else b+=e.length;x+=e}else if(e){if(!e.start)e.start={row:v,column:b};else e.end={row:v,column:b}}});return{text:x,tabstops:c,tokens:o}};var m=function(){function e(e){this.index=0;this.ranges=[];this.tabstops=[];if(e.tabstopManager)return e.tabstopManager;e.tabstopManager=this;this.$onChange=this.onChange.bind(this);this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule;this.$onChangeSession=this.onChangeSession.bind(this);this.$onAfterExec=this.onAfterExec.bind(this);this.attach(e)}e.prototype.attach=function(e){this.$openTabstops=null;this.selectedTabstop=null;this.editor=e;this.session=e.session;this.editor.on("change",this.$onChange);this.editor.on("changeSelection",this.$onChangeSelection);this.editor.on("changeSession",this.$onChangeSession);this.editor.commands.on("afterExec",this.$onAfterExec);this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)};e.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this);this.ranges.length=0;this.tabstops.length=0;this.selectedTabstop=null;this.editor.off("change",this.$onChange);this.editor.off("changeSelection",this.$onChangeSelection);this.editor.off("changeSession",this.$onChangeSession);this.editor.commands.off("afterExec",this.$onAfterExec);this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor.tabstopManager=null;this.session=null;this.editor=null};e.prototype.onChange=function(e){var t=e.action[0]=="r";var n=this.selectedTabstop||{};var r=n.parents||{};var i=this.tabstops.slice();for(var a=0;a<i.length;a++){var s=i[a];var o=s==n||r[s.index];s.rangeList.$bias=o?0:1;if(e.action=="remove"&&s!==n){var c=s.parents&&s.parents[n.index];var f=s.rangeList.pointIndex(e.start,c);f=f<0?-f-1:f+1;var u=s.rangeList.pointIndex(e.end,c);u=u<0?-u-1:u-1;var p=s.rangeList.ranges.slice(f,u);for(var l=0;l<p.length;l++)this.removeRange(p[l])}s.rangeList.$onChange(e)}var h=this.session;if(!this.$inChange&&t&&h.getLength()==1&&!h.getValue())this.detach()};e.prototype.updateLinkedFields=function(){var e=this.selectedTabstop;if(!e||!e.hasLinkedRanges||!e.firstNonLinked)return;this.$inChange=true;var n=this.session;var r=n.getTextRange(e.firstNonLinked);for(var i=0;i<e.length;i++){var a=e[i];if(!a.linked)continue;var s=a.original;var o=t.snippetManager.tmStrFormat(r,s,this.editor);n.replace(a,o)}this.$inChange=false};e.prototype.onAfterExec=function(e){if(e.command&&!e.command.readOnly)this.updateLinkedFields()};e.prototype.onChangeSelection=function(){if(!this.editor)return;var e=this.editor.selection.lead;var t=this.editor.selection.anchor;var n=this.editor.selection.isEmpty();for(var r=0;r<this.ranges.length;r++){if(this.ranges[r].linked)continue;var i=this.ranges[r].contains(e.row,e.column);var a=n||this.ranges[r].contains(t.row,t.column);if(i&&a)return}this.detach()};e.prototype.onChangeSession=function(){this.detach()};e.prototype.tabNext=function(e){var t=this.tabstops.length;var n=this.index+(e||1);n=Math.min(Math.max(n,1),t);if(n==t)n=0;this.selectTabstop(n);if(n===0)this.detach()};e.prototype.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t)this.addTabstopMarkers(t);this.index=e;t=this.tabstops[this.index];if(!t||!t.length)return;this.selectedTabstop=t;var n=t.firstNonLinked||t;if(t.choices)n.cursor=n.start;if(!this.editor.inVirtualSelectionMode){var r=this.editor.multiSelect;r.toSingleRange(n);for(var i=0;i<t.length;i++){if(t.hasLinkedRanges&&t[i].linked)continue;r.addRange(t[i].clone(),true)}}else{this.editor.selection.fromOrientedRange(n)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);if(this.selectedTabstop&&this.selectedTabstop.choices)this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})};e.prototype.addTabstops=function(e,t,n){var r=this.useLink||!this.editor.getOption("enableMultiselect");if(!this.$openTabstops)this.$openTabstops=[];if(!e[0]){var i=o.fromPoints(n,n);b(i.start,t);b(i.end,t);e[0]=[i];e[0].index=0}var a=this.index;var s=[a+1,0];var f=this.ranges;e.forEach(function(e,n){var i=this.$openTabstops[n]||e;for(var a=0;a<e.length;a++){var u=e[a];var p=o.fromPoints(u.start,u.end||u.start);v(p.start,t);v(p.end,t);p.original=u;p.tabstop=i;f.push(p);if(i!=e)i.unshift(p);else i[a]=p;if(u.fmtString||i.firstNonLinked&&r){p.linked=true;i.hasLinkedRanges=true}else if(!i.firstNonLinked)i.firstNonLinked=p}if(!i.firstNonLinked)i.hasLinkedRanges=false;if(i===e){s.push(i);this.$openTabstops[n]=i}this.addTabstopMarkers(i);i.rangeList=i.rangeList||new c;i.rangeList.$bias=0;i.rangeList.addList(i)},this);if(s.length>2){if(this.tabstops.length)s.push(s.splice(2,1)[0]);this.tabstops.splice.apply(this.tabstops,s)}};e.prototype.addTabstopMarkers=function(e){var t=this.session;e.forEach(function(e){if(!e.markerId)e.markerId=t.addMarker(e,"ace_snippet-marker","text")})};e.prototype.removeTabstopMarkers=function(e){var t=this.session;e.forEach(function(e){t.removeMarker(e.markerId);e.markerId=null})};e.prototype.removeRange=function(e){var t=e.tabstop.indexOf(e);if(t!=-1)e.tabstop.splice(t,1);t=this.ranges.indexOf(e);if(t!=-1)this.ranges.splice(t,1);t=e.tabstop.rangeList.ranges.indexOf(e);if(t!=-1)e.tabstop.splice(t,1);this.session.removeMarker(e.markerId);if(!e.tabstop.length){t=this.tabstops.indexOf(e.tabstop);if(t!=-1)this.tabstops.splice(t,1);if(!this.tabstops.length)this.detach()}};return e}();m.prototype.keyboardHandler=new f;m.prototype.keyboardHandler.bindKeys({Tab:function(e){if(t.snippetManager&&t.snippetManager.expandWithTab(e))return;e.tabstopManager.tabNext(1);e.renderer.scrollCursorIntoView()},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1);e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}});var v=function(e,t){if(e.row==0)e.column+=t.column;e.row+=t.row};var b=function(e,t){if(e.row==t.row)e.column-=t.column;e.row-=t.row};r.importCssString("\n.ace_snippet-marker {\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    background: rgba(194, 193, 208, 0.09);\n    border: 1px dotted rgba(211, 208, 235, 0.62);\n    position: absolute;\n}","snippets.css",false);t.snippetManager=new d;var x=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)};this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(x.prototype)});ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],function(e,t,n){"use strict";var r=e("../keyboard/hash_handler").HashHandler;var i=e("../editor").Editor;var a=e("../snippets").snippetManager;var s=e("../range").Range;var o=e("../config");var c,f;var u=function(){function e(){}e.prototype.setupContext=function(e){this.ace=e;this.indentation=e.session.getTabString();if(!c)c=window.emmet;var t=c.resources||c.require("resources");t.setVariable("indentation",this.indentation);this.$syntax=null;this.$syntax=this.getSyntax()};e.prototype.getSelectionRange=function(){var e=this.ace.getSelectionRange();var t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}};e.prototype.createSelection=function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})};e.prototype.getCurrentLineRange=function(){var e=this.ace;var t=e.getCursorPosition().row;var n=e.session.getLine(t).length;var r=e.session.doc.positionToIndex({row:t,column:0});return{start:r,end:r+n}};e.prototype.getCaretPos=function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)};e.prototype.setCaretPos=function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)};e.prototype.getCurrentLine=function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)};e.prototype.replaceContent=function(e,t,n,r){if(n==null)n=t==null?this.getContent().length:t;if(t==null)t=0;var i=this.ace;var o=i.session.doc;var c=s.fromPoints(o.indexToPosition(t),o.indexToPosition(n));i.session.remove(c);c.end=c.start;e=this.$updateTabstops(e);a.insertSnippet(i,e)};e.prototype.getContent=function(){return this.ace.getValue()};e.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if(e=="html"||e=="php"){var t=this.ace.getCursorPosition();var n=this.ace.session.getState(t.row);if(typeof n!="string")n=n[0];if(n){n=n.split("-");if(n.length>1)e=n[0];else if(e=="php")e="html"}}return e};e.prototype.getProfileName=function(){var e=c.resources||c.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var t=e.getVariable("profile");if(!t)t=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html";return t;default:var n=this.ace.session.$mode;return n.emmetConfig&&n.emmetConfig.profile||"xhtml"}};e.prototype.prompt=function(e){return prompt(e)};e.prototype.getSelection=function(){return this.ace.session.getTextRange()};e.prototype.getFilePath=function(){return""};e.prototype.$updateTabstops=function(e){var t=1e3;var n=0;var r=null;var i=c.tabStops||c.require("tabStops");var a=c.resources||c.require("resources");var s=a.getVocabulary("user");var o={tabstop:function(e){var a=parseInt(e.group,10);var s=a===0;if(s)a=++n;else a+=t;var c=e.placeholder;if(c){c=i.processText(c,o)}var f="${"+a+(c?":"+c:"")+"}";if(s){r=[e.start,f]}return f},escape:function(e){if(e=="$")return"\\$";if(e=="\\")return"\\\\";return e}};e=i.processText(e,o);if(s.variables["insert_final_tabstop"]&&!/\$\{0\}$/.test(e)){e+="${0}"}else if(r){var f=c.utils?c.utils.common:c.require("utils");e=f.replaceSubstring(e,"${0}",r[0],r[1])}return e};return e}();var p={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}};var l=new u;t.commands=new r;t.runEmmetCommand=function e(n){if(this.action=="expand_abbreviation_with_tab"){if(!n.selection.isEmpty())return false;var r=n.selection.lead;var i=n.session.getTokenAt(r.row,r.column);if(i&&/\btag\b/.test(i.type))return false}try{l.setupContext(n);var a=c.actions||c.require("actions");if(this.action=="wrap_with_abbreviation"){return setTimeout(function(){a.run("wrap_with_abbreviation",l)},0)}var s=a.run(this.action,l)}catch(r){if(!c){var f=t.load(e.bind(this,n));if(this.action=="expand_abbreviation_with_tab")return false;return f}n._signal("changeStatus",typeof r=="string"?r:r.message);o.warn(r);s=false}return s};for(var h in p){t.commands.addCommand({name:"emmet:"+h,action:h,bindKey:p[h],exec:t.runEmmetCommand,multiSelectAction:"forEach"})}t.updateCommands=function(e,n){if(n){e.keyBinding.addKeyboardHandler(t.commands)}else{e.keyBinding.removeKeyboardHandler(t.commands)}};t.isSupportedMode=function(e){if(!e)return false;if(e.emmetConfig)return true;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)};t.isAvailable=function(e,n){if(/(evaluate_math_expression|expand_abbreviation)$/.test(n))return true;var r=e.session.$mode;var i=t.isSupportedMode(r);if(i&&r.$modes){try{l.setupContext(e);if(/js|php/.test(l.getSyntax()))i=false}catch(e){}}return i};var d=function(e,n){var r=n;if(!r)return;var i=t.isSupportedMode(r.session.$mode);if(e.enableEmmet===false)i=false;if(i)t.load();t.updateCommands(r,i)};t.load=function(e){if(typeof f!=="string"){o.warn("script for emmet-core is not loaded");return false}o.loadModule(f,function(){f=null;e&&e()});return true};t.AceEmmetEditor=u;o.defineOptions(i.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",d);d({enableEmmet:!!e},this)},value:true}});t.setCore=function(e){if(typeof e=="string")f=e;else c=e}});(function(){ace.require(["ace/ext/emmet"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=ext-emmet.js.map