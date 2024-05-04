ace.define("ace/occur",["require","exports","module","ace/lib/oop","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"],function(e,n,t){"use strict";var r=this&&this.__extends||function(){var e=function(n,t){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t))e[t]=n[t]};return e(n,t)};return function(n,t){if(typeof t!=="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");e(n,t);function r(){this.constructor=n}n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}}();var o=e("./lib/oop");var a=e("./search").Search;var i=e("./edit_session").EditSession;var s=e("./search_highlight").SearchHighlight;var c=function(e){r(n,e);function n(){return e!==null&&e.apply(this,arguments)||this}n.prototype.enter=function(e,n){if(!n.needle)return false;var t=e.getCursorPosition();this.displayOccurContent(e,n);var r=this.originalToOccurPosition(e.session,t);e.moveCursorToPosition(r);return true};n.prototype.exit=function(e,n){var t=n.translatePosition&&e.getCursorPosition();var r=t&&this.occurToOriginalPosition(e.session,t);this.displayOriginalContent(e);if(r)e.moveCursorToPosition(r);return true};n.prototype.highlight=function(e,n){var t=e.$occurHighlight=e.$occurHighlight||e.addDynamicMarker(new s(null,"ace_occur-highlight","text"));t.setRegexp(n);e._emit("changeBackMarker")};n.prototype.displayOccurContent=function(e,n){this.$originalSession=e.session;var t=this.matchingLines(e.session,n);var r=t.map(function(e){return e.content});var o=new i(r.join("\n"));o.$occur=this;o.$occurMatchingLines=t;e.setSession(o);this.$useEmacsStyleLineStart=this.$originalSession.$useEmacsStyleLineStart;o.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart;this.highlight(o,n.re);o._emit("changeBackMarker")};n.prototype.displayOriginalContent=function(e){e.setSession(this.$originalSession);this.$originalSession.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart};n.prototype.originalToOccurPosition=function(e,n){var t=e.$occurMatchingLines;var r={row:0,column:0};if(!t)return r;for(var o=0;o<t.length;o++){if(t[o].row===n.row)return{row:o,column:n.column}}return r};n.prototype.occurToOriginalPosition=function(e,n){var t=e.$occurMatchingLines;if(!t||!t[n.row])return n;return{row:t[n.row].row,column:n.column}};n.prototype.matchingLines=function(e,n){n=o.mixin({},n);if(!e||!n.needle)return[];var t=new a;t.set(n);return t.findAll(e).reduce(function(n,t){var r=t.start.row;var o=n[n.length-1];return o&&o.row===r?n:n.concat({row:r,content:e.getLine(r)})},[])};return n}(a);var l=e("./lib/dom");l.importCssString(".ace_occur-highlight {\n    border-radius: 4px;\n    background-color: rgba(87, 255, 8, 0.25);\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n    box-shadow: 0 0 4px rgb(91, 255, 50);\n}\n.ace_dark .ace_occur-highlight {\n    background-color: rgb(80, 140, 85);\n    box-shadow: 0 0 4px rgb(60, 120, 70);\n}\n","incremental-occur-highlighting",false);n.Occur=c});ace.define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"],function(e,n,t){var r=e("../config"),o=e("../occur").Occur;var a={name:"occur",exec:function(e,n){var t=!!e.session.$occur;var r=(new o).enter(e,n);if(r&&!t)l.installIn(e)},readOnly:true};var i=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(e){var n=e.session.$occur;if(!n)return;n.exit(e,{});if(!e.session.$occur)l.uninstallFrom(e)},readOnly:true},{name:"occuraccept",bindKey:"enter",exec:function(e){var n=e.session.$occur;if(!n)return;n.exit(e,{translatePosition:true});if(!e.session.$occur)l.uninstallFrom(e)},readOnly:true}];var s=e("../keyboard/hash_handler").HashHandler;var c=e("../lib/oop");function l(){}c.inherits(l,s);(function(){this.isOccurHandler=true;this.attach=function(e){s.call(this,i,e.commands.platform);this.$editor=e};var e=this.handleKeyboard;this.handleKeyboard=function(n,t,r,o){var a=e.call(this,n,t,r,o);return a&&a.command?a:undefined}}).call(l.prototype);l.installIn=function(e){var n=new this;e.keyBinding.addKeyboardHandler(n);e.commands.addCommands(i)};l.uninstallFrom=function(e){e.commands.removeCommands(i);var n=e.getKeyboardHandler();if(n.isOccurHandler)e.keyBinding.removeKeyboardHandler(n)};n.occurStartCommand=a});ace.define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"],function(e,n,t){var r=e("../config");var o=e("../lib/oop");var a=e("../keyboard/hash_handler").HashHandler;var i=e("./occur_commands").occurStartCommand;n.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e,n){r.loadModule(["core","ace/incremental_search"],function(t){var r=t.iSearch=t.iSearch||new t.IncrementalSearch;r.activate(e,n.backwards);if(n.jumpToFirstMatch)r.next(n)})},readOnly:true},{name:"iSearchBackwards",exec:function(e,n){e.execCommand("iSearch",{backwards:true})},readOnly:true},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(e,n){e.execCommand("iSearch",{jumpToFirstMatch:true,useCurrentOrPrevSearch:true})},readOnly:true},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:true,backwards:true,useCurrentOrPrevSearch:true})},readOnly:true}];n.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e){e.cancelSearch(true)}},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(e,n){n.useCurrentOrPrevSearch=true;e.next(n)}},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(e,n){n.useCurrentOrPrevSearch=true;n.backwards=true;e.next(n)}},{name:"extendSearchTerm",exec:function(e,n){e.addString(n)}},{name:"extendSearchTermSpace",bindKey:"space",exec:function(e){e.addString(" ")}},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(e){e.removeChar()}},{name:"confirmSearch",bindKey:"return",exec:function(e){e.deactivate()}},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(e){e.deactivate(true)}},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(e){var n=o.mixin({},e.$options);e.deactivate();i.exec(e.$editor,n)}},{name:"yankNextWord",bindKey:"Ctrl-w",exec:function(e){var n=e.$editor,t=n.selection.getRangeOfMovements(function(e){e.moveCursorWordRight()}),r=n.session.getTextRange(t);e.addString(r)}},{name:"yankNextChar",bindKey:"Ctrl-Alt-y",exec:function(e){var n=e.$editor,t=n.selection.getRangeOfMovements(function(e){e.moveCursorRight()}),r=n.session.getTextRange(t);e.addString(r)}},{name:"recenterTopBottom",bindKey:"Ctrl-l",exec:function(e){e.$editor.execCommand("recenterTopBottom")}},{name:"selectAllMatches",bindKey:"Ctrl-space",exec:function(e){var n=e.$editor,t=n.session.$isearchHighlight,r=t&&t.cache?t.cache.reduce(function(e,n){return e.concat(n?n:[])},[]):[];e.deactivate(false);r.forEach(n.selection.addRange.bind(n.selection))}},{name:"searchAsRegExp",bindKey:"Alt-r",exec:function(e){e.convertNeedleToRegExp()}}].map(function(e){e.readOnly=true;e.isIncrementalSearchCommand=true;e.scrollIntoView="animate-cursor";return e});function s(e){this.$iSearch=e}o.inherits(s,a);(function(){this.attach=function(e){var t=this.$iSearch;a.call(this,n.iSearchCommands,e.commands.platform);this.$commandExecHandler=e.commands.on("exec",function(n){if(!n.command.isIncrementalSearchCommand)return t.deactivate();n.stopPropagation();n.preventDefault();var r=e.session.getScrollTop();var o=n.command.exec(t,n.args||{});e.renderer.scrollCursorIntoView(null,.5);e.renderer.animateScrolling(r);return o})};this.detach=function(e){if(!this.$commandExecHandler)return;e.commands.off("exec",this.$commandExecHandler);delete this.$commandExecHandler};var e=this.handleKeyboard;this.handleKeyboard=function(n,t,r,o){if((t===1||t===8)&&r==="v"||t===1&&r==="y")return null;var a=e.call(this,n,t,r,o);if(a&&a.command){return a}if(t==-1){var i=this.commands.extendSearchTerm;if(i){return{command:i,args:r}}}return false}}).call(s.prototype);n.IncrementalSearchKeyboardHandler=s});ace.define("ace/incremental_search",["require","exports","module","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"],function(e,n,t){"use strict";var r=this&&this.__extends||function(){var e=function(n,t){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t))e[t]=n[t]};return e(n,t)};return function(n,t){if(typeof t!=="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");e(n,t);function r(){this.constructor=n}n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}}();var o=e("./range").Range;var a=e("./search").Search;var i=e("./search_highlight").SearchHighlight;var s=e("./commands/incremental_search_commands");var c=s.IncrementalSearchKeyboardHandler;function l(e){return e instanceof RegExp}function d(e){var n=String(e),t=n.indexOf("/"),r=n.lastIndexOf("/");return{expression:n.slice(t+1,r),flags:n.slice(r+1)}}function u(e,n){try{return new RegExp(e,n)}catch(n){return e}}function m(e){return u(e.expression,e.flags)}var h=function(e){r(n,e);function n(){var n=e.call(this)||this;n.$options={wrap:false,skipCurrent:false};n.$keyboardHandler=new c(n);return n}n.prototype.activate=function(e,n){this.$editor=e;this.$startPos=this.$currentPos=e.getCursorPosition();this.$options.needle="";this.$options.backwards=n;e.keyBinding.addKeyboardHandler(this.$keyboardHandler);this.$originalEditorOnPaste=e.onPaste;e.onPaste=this.onPaste.bind(this);this.$mousedownHandler=e.on("mousedown",this.onMouseDown.bind(this));this.selectionFix(e);this.statusMessage(true)};n.prototype.deactivate=function(e){this.cancelSearch(e);var n=this.$editor;n.keyBinding.removeKeyboardHandler(this.$keyboardHandler);if(this.$mousedownHandler){n.off("mousedown",this.$mousedownHandler);delete this.$mousedownHandler}n.onPaste=this.$originalEditorOnPaste;this.message("")};n.prototype.selectionFix=function(e){if(e.selection.isEmpty()&&!e.session.$emacsMark){e.clearSelection()}};n.prototype.highlight=function(e){var n=this.$editor.session,t=n.$isearchHighlight=n.$isearchHighlight||n.addDynamicMarker(new i(null,"ace_isearch-result","text"));t.setRegexp(e);n._emit("changeBackMarker")};n.prototype.cancelSearch=function(e){var n=this.$editor;this.$prevNeedle=this.$options.needle;this.$options.needle="";if(e){n.moveCursorToPosition(this.$startPos);this.$currentPos=this.$startPos}else{n.pushEmacsMark&&n.pushEmacsMark(this.$startPos,false)}this.highlight(null);return o.fromPoints(this.$currentPos,this.$currentPos)};n.prototype.highlightAndFindWithNeedle=function(e,n){if(!this.$editor)return null;var t=this.$options;if(n){t.needle=n.call(this,t.needle||"")||""}if(t.needle.length===0){this.statusMessage(true);return this.cancelSearch(true)}t.start=this.$currentPos;var r=this.$editor.session,a=this.find(r),i=this.$editor.emacsMark?!!this.$editor.emacsMark():!this.$editor.selection.isEmpty();if(a){if(t.backwards)a=o.fromPoints(a.end,a.start);this.$editor.selection.setRange(o.fromPoints(i?this.$startPos:a.end,a.end));if(e)this.$currentPos=a.end;this.highlight(t.re)}this.statusMessage(a);return a};n.prototype.addString=function(e){return this.highlightAndFindWithNeedle(false,function(n){if(!l(n))return n+e;var t=d(n);t.expression+=e;return m(t)})};n.prototype.removeChar=function(e){return this.highlightAndFindWithNeedle(false,function(e){if(!l(e))return e.substring(0,e.length-1);var n=d(e);n.expression=n.expression.substring(0,n.expression.length-1);return m(n)})};n.prototype.next=function(e){e=e||{};this.$options.backwards=!!e.backwards;this.$currentPos=this.$editor.getCursorPosition();return this.highlightAndFindWithNeedle(true,function(n){return e.useCurrentOrPrevSearch&&n.length===0?this.$prevNeedle||"":n})};n.prototype.onMouseDown=function(e){this.deactivate();return true};n.prototype.onPaste=function(e){this.addString(e)};n.prototype.convertNeedleToRegExp=function(){return this.highlightAndFindWithNeedle(false,function(e){return l(e)?e:u(e,"ig")})};n.prototype.convertNeedleToString=function(){return this.highlightAndFindWithNeedle(false,function(e){return l(e)?d(e).expression:e})};n.prototype.statusMessage=function(e){var n=this.$options,t="";t+=n.backwards?"reverse-":"";t+="isearch: "+n.needle;t+=e?"":" (not found)";this.message(t)};n.prototype.message=function(e){if(this.$editor.showCommandLine){this.$editor.showCommandLine(e);this.$editor.focus()}};return n}(a);n.IncrementalSearch=h;var f=e("./lib/dom");f.importCssString("\n.ace_marker-layer .ace_isearch-result {\n  position: absolute;\n  z-index: 6;\n  box-sizing: border-box;\n}\ndiv.ace_isearch-result {\n  border-radius: 4px;\n  background-color: rgba(255, 200, 0, 0.5);\n  box-shadow: 0 0 4px rgb(255, 200, 0);\n}\n.ace_dark div.ace_isearch-result {\n  background-color: rgb(100, 110, 160);\n  box-shadow: 0 0 4px rgb(80, 90, 140);\n}","incremental-search-highlighting",false);var g=e("./commands/command_manager");(function(){this.setupIncrementalSearch=function(e,n){if(this.usesIncrementalSearch==n)return;this.usesIncrementalSearch=n;var t=s.iSearchStartCommands;var r=n?"addCommands":"removeCommands";this[r](t)}}).call(g.CommandManager.prototype);var p=e("./editor").Editor;e("./config").defineOptions(p.prototype,"editor",{useIncrementalSearch:{set:function(e){this.keyBinding.$handlers.forEach(function(n){if(n.setupIncrementalSearch){n.setupIncrementalSearch(this,e)}});this._emit("incrementalSearchSettingChanged",{isEnabled:e})}}})});ace.define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"],function(e,n,t){"use strict";var r=e("../lib/dom");e("../incremental_search");var o=e("../commands/incremental_search_commands");var a=e("./hash_handler").HashHandler;n.handler=new a;n.handler.isEmacs=true;n.handler.$id="ace/keyboard/emacs";r.importCssString("\n.emacs-mode .ace_cursor{\n    border: 1px rgba(50,250,50,0.8) solid!important;\n    box-sizing: border-box!important;\n    background-color: rgba(0,250,0,0.9);\n    opacity: 0.5;\n}\n.emacs-mode .ace_hidden-cursors .ace_cursor{\n    opacity: 1;\n    background-color: transparent;\n}\n.emacs-mode .ace_overwrite-cursors .ace_cursor {\n    opacity: 1;\n    background-color: transparent;\n    border-width: 0 0 2px 2px !important;\n}\n.emacs-mode .ace_text-layer {\n    z-index: 4\n}\n.emacs-mode .ace_cursor-layer {\n    z-index: 2\n}","emacsMode");var i;var s;n.handler.attach=function(e){i=e.session.$selectLongWords;e.session.$selectLongWords=true;s=e.session.$useEmacsStyleLineStart;e.session.$useEmacsStyleLineStart=true;e.session.$emacsMark=null;e.session.$emacsMarkRing=e.session.$emacsMarkRing||[];e.emacsMark=function(){return this.session.$emacsMark};e.setEmacsMark=function(e){this.session.$emacsMark=e};e.pushEmacsMark=function(e,n){var t=this.session.$emacsMark;if(t)this.session.$emacsMarkRing.push(t);if(!e||n)this.setEmacsMark(e);else this.session.$emacsMarkRing.push(e)};e.popEmacsMark=function(){var e=this.emacsMark();if(e){this.setEmacsMark(null);return e}return this.session.$emacsMarkRing.pop()};e.getLastEmacsMark=function(e){return this.session.$emacsMark||this.session.$emacsMarkRing.slice(-1)[0]};e.emacsMarkForSelection=function(e){var n=this.selection,t=this.multiSelect?this.multiSelect.getAllRanges().length:1,r=n.index||0,o=this.session.$emacsMarkRing,a=o.length-(t-r),i=o[a]||n.anchor;if(e){o.splice(a,1,"row"in e&&"column"in e?e:undefined)}return i};e.on("click",l);e.on("changeSession",c);e.renderer.$blockCursor=true;e.setStyle("emacs-mode");e.commands.addCommands(h);n.handler.platform=e.commands.platform;e.$emacsModeHandler=this;e.on("copy",this.onCopy);e.on("paste",this.onPaste)};n.handler.detach=function(e){e.renderer.$blockCursor=false;e.session.$selectLongWords=i;e.session.$useEmacsStyleLineStart=s;e.off("click",l);e.off("changeSession",c);e.unsetStyle("emacs-mode");e.commands.removeCommands(h);e.off("copy",this.onCopy);e.off("paste",this.onPaste);e.$emacsModeHandler=null};var c=function(e){if(e.oldSession){e.oldSession.$selectLongWords=i;e.oldSession.$useEmacsStyleLineStart=s}i=e.session.$selectLongWords;e.session.$selectLongWords=true;s=e.session.$useEmacsStyleLineStart;e.session.$useEmacsStyleLineStart=true;if(!e.session.hasOwnProperty("$emacsMark"))e.session.$emacsMark=null;if(!e.session.hasOwnProperty("$emacsMarkRing"))e.session.$emacsMarkRing=[]};var l=function(e){e.editor.session.$emacsMark=null};var d=e("../lib/keys").KEY_MODS;var u={C:"ctrl",S:"shift",M:"alt",CMD:"command"};var m=["C-S-M-CMD","S-M-CMD","C-M-CMD","C-S-CMD","C-S-M","M-CMD","S-CMD","S-M","C-CMD","C-M","C-S","CMD","M","S","C"];m.forEach(function(e){var n=0;e.split("-").forEach(function(e){n=n|d[u[e]]});u[n]=e.toLowerCase()+"-"});n.handler.onCopy=function(e,t){if(t.$handlesEmacsOnCopy)return;t.$handlesEmacsOnCopy=true;n.handler.commands.killRingSave.exec(t);t.$handlesEmacsOnCopy=false};n.handler.onPaste=function(e,n){n.pushEmacsMark(n.getCursorPosition())};n.handler.bindKey=function(e,n){if(typeof e=="object")e=e[this.platform];if(!e)return;var t=this.commandKeyBinding;e.split("|").forEach(function(e){e=e.toLowerCase();t[e]=n;var r=e.split(" ").slice(0,-1);r.reduce(function(e,n,t){var r=e[t-1]?e[t-1]+" ":"";return e.concat([r+n])},[]).forEach(function(e){if(!t[e])t[e]="null"})},this)};n.handler.getStatusText=function(e,n){var t="";if(n.count)t+=n.count;if(n.keyChain)t+=" "+n.keyChain;return t};n.handler.handleKeyboard=function(e,n,t,r){if(r===-1)return undefined;var o=e.editor;o._signal("changeStatus");if(n==-1){o.pushEmacsMark();if(e.count){var a=new Array(e.count+1).join(t);e.count=null;return{command:"insertstring",args:a}}}var i=u[n];if(i=="c-"||e.count){var s=parseInt(t[t.length-1]);if(typeof s==="number"&&!isNaN(s)){e.count=Math.max(e.count,0)||0;e.count=10*e.count+s;return{command:"null"}}}if(i)t=i+t;if(e.keyChain)t=e.keyChain+=" "+t;var c=this.commandKeyBinding[t];e.keyChain=c=="null"?t:"";if(!c)return undefined;if(c==="null")return{command:"null"};if(c==="universalArgument"){e.count=-4;return{command:"null"}}var l;if(typeof c!=="string"){l=c.args;if(c.command)c=c.command;if(c==="goorselect"){c=o.emacsMark()?l[1]:l[0];l=null}}if(typeof c==="string"){if(c==="insertstring"||c==="splitline"||c==="togglecomment"){o.pushEmacsMark()}c=this.commands[c]||o.commands.commands[c];if(!c)return undefined}if(!c.readOnly&&!c.isYank)e.lastCommand=null;if(!c.readOnly&&o.emacsMark())o.setEmacsMark(null);if(e.count){var s=e.count;e.count=0;if(!c||!c.handlesCount){return{args:l,command:{exec:function(e,n){for(var t=0;t<s;t++)c.exec(e,n)},multiSelectAction:c.multiSelectAction}}}else{if(!l)l={};if(typeof l==="object")l.count=s}}return{command:c,args:l}};n.emacsKeys={"Up|C-p":{command:"goorselect",args:["golineup","selectup"]},"Down|C-n":{command:"goorselect",args:["golinedown","selectdown"]},"Left|C-b":{command:"goorselect",args:["gotoleft","selectleft"]},"Right|C-f":{command:"goorselect",args:["gotoright","selectright"]},"C-Left|M-b":{command:"goorselect",args:["gotowordleft","selectwordleft"]},"C-Right|M-f":{command:"goorselect",args:["gotowordright","selectwordright"]},"Home|C-a":{command:"goorselect",args:["gotolinestart","selecttolinestart"]},"End|C-e":{command:"goorselect",args:["gotolineend","selecttolineend"]},"C-Home|S-M-,":{command:"goorselect",args:["gotostart","selecttostart"]},"C-End|S-M-.":{command:"goorselect",args:["gotoend","selecttoend"]},"S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l":"recenterTopBottom","M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"C-Up":{command:"goorselect",args:["gotopageup","selectpageup"]},"PageDown|C-v":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"PageUp|M-v":{command:"goorselect",args:["gotopageup","selectpageup"]},"S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"iSearch","C-r":"iSearchBackwards","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:"\n"},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w|C-S-W":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion","M-x":{command:"focusCommandLine",args:"M-x "}};n.handler.bindKeys(n.emacsKeys);n.handler.addCommands({recenterTopBottom:function(e){var n=e.renderer;var t=n.$cursorLayer.getPixelPosition();var r=n.$size.scrollerHeight-n.lineHeight;var o=n.scrollTop;if(Math.abs(t.top-o)<2){o=t.top-r}else if(Math.abs(t.top-o-r*.5)<2){o=t.top}else{o=t.top-r*.5}e.session.setScrollTop(o)},selectRectangularRegion:function(e){e.multiSelect.toggleBlockSelection()},setMark:{exec:function(e,n){if(n&&n.count){if(e.inMultiSelectMode)e.forEachSelection(s);else s();s();return}var t=e.emacsMark(),r=e.selection.getAllRanges(),o=r.map(function(e){return{row:e.start.row,column:e.start.column}}),a=true,i=r.every(function(e){return e.isEmpty()});if(a&&(t||!i)){if(e.inMultiSelectMode)e.forEachSelection({exec:e.clearSelection.bind(e)});else e.clearSelection();if(t)e.pushEmacsMark(null);return}if(!t){o.forEach(function(n){e.pushEmacsMark(n)});e.setEmacsMark(o[o.length-1]);return}function s(){var n=e.popEmacsMark();n&&e.moveCursorToPosition(n)}},readOnly:true,handlesCount:true},exchangePointAndMark:{exec:function e(n,t){var r=n.selection;if(!t.count&&!r.isEmpty()){r.setSelectionRange(r.getRange(),!r.isBackwards());return}if(t.count){var o={row:r.lead.row,column:r.lead.column};r.clearSelection();r.moveCursorToPosition(n.emacsMarkForSelection(o))}else{r.selectToPosition(n.emacsMarkForSelection())}},readOnly:true,handlesCount:true,multiSelectAction:"forEach"},killWord:{exec:function(e,t){e.clearSelection();if(t=="left")e.selection.selectWordLeft();else e.selection.selectWordRight();var r=e.getSelectionRange();var o=e.session.getTextRange(r);n.killRing.add(o);e.session.remove(r);e.clearSelection()},multiSelectAction:"forEach"},killLine:function(e){e.pushEmacsMark(null);e.clearSelection();var t=e.getSelectionRange();var r=e.session.getLine(t.start.row);t.end.column=r.length;r=r.substr(t.start.column);var o=e.session.getFoldLine(t.start.row);if(o&&t.end.row!=o.end.row){t.end.row=o.end.row;r="x"}if(/^\s*$/.test(r)){t.end.row++;r=e.session.getLine(t.end.row);t.end.column=/^\s*$/.test(r)?r.length:0}var a=e.session.getTextRange(t);if(e.prevOp.command==this)n.killRing.append(a);else n.killRing.add(a);e.session.remove(t);e.clearSelection()},yank:function(e){e.onPaste(n.killRing.get()||"");e.keyBinding.$data.lastCommand="yank"},yankRotate:function(e){if(e.keyBinding.$data.lastCommand!="yank")return;e.undo();e.session.$emacsMarkRing.pop();e.onPaste(n.killRing.rotate());e.keyBinding.$data.lastCommand="yank"},killRegion:{exec:function(e){n.killRing.add(e.getCopyText());e.commands.byName.cut.exec(e);e.setEmacsMark(null)},readOnly:true,multiSelectAction:"forEach"},killRingSave:{exec:function(e){e.$handlesEmacsOnCopy=true;var t=e.session.$emacsMarkRing.slice(),r=[];n.killRing.add(e.getCopyText());setTimeout(function(){function n(){var n=e.selection,t=n.getRange(),o=n.isBackwards()?t.end:t.start;r.push({row:o.row,column:o.column});n.clearSelection()}e.$handlesEmacsOnCopy=false;if(e.inMultiSelectMode)e.forEachSelection({exec:n});else n();e.setEmacsMark(null);e.session.$emacsMarkRing=t.concat(r.reverse())},0)},readOnly:true},keyboardQuit:function(e){e.selection.clearSelection();e.setEmacsMark(null);e.keyBinding.$data.count=null},focusCommandLine:function(e,n){if(e.showCommandLine)e.showCommandLine(n)}});n.handler.addCommands(o.iSearchStartCommands);var h=n.handler.commands;h.yank.isYank=true;h.yankRotate.isYank=true;n.killRing={$data:[],add:function(e){e&&this.$data.push(e);if(this.$data.length>30)this.$data.shift()},append:function(e){var n=this.$data.length-1;var t=this.$data[n]||"";if(e)t+=e;if(t)this.$data[n]=t},get:function(e){e=e||1;return this.$data.slice(this.$data.length-e,this.$data.length).reverse().join("\n")},pop:function(){if(this.$data.length>1)this.$data.pop();return this.get()},rotate:function(){this.$data.unshift(this.$data.pop());return this.get()}}});(function(){ace.require(["ace/keyboard/emacs"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=keybinding-emacs.js.map