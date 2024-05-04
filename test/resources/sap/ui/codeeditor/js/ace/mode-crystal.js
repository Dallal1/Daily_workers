ace.define("ace/mode/crystal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var s=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e="puts|initialize|previous_def|typeof|as|pointerof|sizeof|instance_sizeof";var t="if|end|else|elsif|unless|case|when|break|while|next|until|def|return|class|new|getter|setter|property|lib"+"|fun|do|struct|private|protected|public|module|super|abstract|include|extend|begin|enum|raise|yield|with"+"|alias|rescue|ensure|macro|uninitialized|union|type|require";var n="true|TRUE|false|FALSE|nil|NIL|__LINE__|__END_LINE__|__FILE__|__DIR__";var r="$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|"+"root_url|flash|session|cookies|params|request|response|logger|self";var s=this.$keywords=this.createKeywordMapper({keyword:t,"constant.language":n,"variable.language":r,"support.function":e},"identifier");var a="(?:0[xX][\\dA-Fa-f]+)";var o="(?:[0-9][\\d_]*)";var i="(?:0o[0-7][0-7]*)";var g="(?:0[bB][01]+)";var u="(?:[+-]?)(?:"+a+"|"+o+"|"+i+"|"+g+")(?:_?[iIuU](?:8|16|32|64))?\\b";var p=/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}})/;var l=/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}}|u{(:?[\da-fA-F]{2}\s)*[\da-fA-F]{2}})/;this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string.regexp",regex:"[/]",push:[{token:"constant.language.escape",regex:l},{token:"string.regexp",regex:"[/][imx]*(?=[).,;\\s]|$)",next:"pop"},{defaultToken:"string.regexp"}]},[{regex:"[{}]",onMatch:function(e,t,n){this.next=e=="{"?this.nextState:"";if(e=="{"&&n.length){n.unshift("start",t);return"paren.lparen"}if(e=="}"&&n.length){n.shift();this.next=n.shift();if(this.next.indexOf("string")!=-1)return"paren.end"}return e=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.start",regex:/"/,push:[{token:"constant.language.escape",regex:l},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/"/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/`/,push:[{token:"constant.language.escape",regex:l},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/`/,next:"pop"},{defaultToken:"string"}]},{stateName:"rpstring",token:"string.start",regex:/%[Qx]?\(/,push:[{token:"constant.language.escape",regex:l},{token:"string.start",regex:/\(/,push:"rpstring"},{token:"string.end",regex:/\)/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"spstring",token:"string.start",regex:/%[Qx]?\[/,push:[{token:"constant.language.escape",regex:l},{token:"string.start",regex:/\[/,push:"spstring"},{token:"string.end",regex:/]/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"fpstring",token:"string.start",regex:/%[Qx]?{/,push:[{token:"constant.language.escape",regex:l},{token:"string.start",regex:/{/,push:"fpstring"},{token:"string.end",regex:/}/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"tpstring",token:"string.start",regex:/%[Qx]?</,push:[{token:"constant.language.escape",regex:l},{token:"string.start",regex:/</,push:"tpstring"},{token:"string.end",regex:/>/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"ppstring",token:"string.start",regex:/%[Qx]?\|/,push:[{token:"constant.language.escape",regex:l},{token:"string.end",regex:/\|/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"rpqstring",token:"string.start",regex:/%[qwir]\(/,push:[{token:"string.start",regex:/\(/,push:"rpqstring"},{token:"string.end",regex:/\)/,next:"pop"},{defaultToken:"string"}]},{stateName:"spqstring",token:"string.start",regex:/%[qwir]\[/,push:[{token:"string.start",regex:/\[/,push:"spqstring"},{token:"string.end",regex:/]/,next:"pop"},{defaultToken:"string"}]},{stateName:"fpqstring",token:"string.start",regex:/%[qwir]{/,push:[{token:"string.start",regex:/{/,push:"fpqstring"},{token:"string.end",regex:/}/,next:"pop"},{defaultToken:"string"}]},{stateName:"tpqstring",token:"string.start",regex:/%[qwir]</,push:[{token:"string.start",regex:/</,push:"tpqstring"},{token:"string.end",regex:/>/,next:"pop"},{defaultToken:"string"}]},{stateName:"ppqstring",token:"string.start",regex:/%[qwir]\|/,push:[{token:"string.end",regex:/\|/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/'/,push:[{token:"constant.language.escape",regex:p},{token:"string.end",regex:/'|$/,next:"pop"},{defaultToken:"string"}]}],{token:"text",regex:"::"},{token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"},{token:"variable.fresh",regex:"%[a-zA-Z_\\d]+"},{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},{token:"constant.other.symbol",regex:"[:](?:(?:===|<=>|\\[]\\?|\\[]=|\\[]|>>|\\*\\*|<<|==|!=|>=|<=|!~|=~|<|\\+|-|\\*|\\/|%|&|\\||\\^|>|!|~)|(?:(?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?))"},{token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?(?:_?[fF](?:32|64))?\\b"},{token:"constant.numeric",regex:u},{token:"constant.other.symbol",regex:':"',push:[{token:"constant.language.escape",regex:l},{token:"constant.other.symbol",regex:'"',next:"pop"},{defaultToken:"constant.other.symbol"}]},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"support.function",regex:"(?:is_a\\?|nil\\?|responds_to\\?|as\\?)"},{token:s,regex:"[a-zA-Z_$][a-zA-Z0-9_$!?]*\\b"},{token:"variable.system",regex:"\\$\\!|\\$\\?"},{token:"punctuation.separator.key-value",regex:"=>"},{stateName:"heredoc",onMatch:function(e,t,n){var r="heredoc";var s=e.split(this.splitRegex);n.push(r,s[3]);return[{type:"constant",value:s[1]},{type:"string",value:s[2]},{type:"support.class",value:s[3]},{type:"string",value:s[4]}]},regex:"(<<-)([']?)([\\w]+)([']?)",rules:{heredoc:[{token:"string",regex:"^ +"},{onMatch:function(e,t,n){if(e===n[1]){n.shift();n.shift();this.next=n[0]||"start";return"support.class"}this.next="";return"string"},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){if(t[0]==="heredoc")return t[0];return e}},{token:"punctuation.operator",regex:/[.]\s*(?![.])/,push:[{token:"punctuation.operator",regex:/[.]\s*(?![.])/},{token:"support.function",regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{regex:"",token:"empty",next:"pop"}]},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|\\?|\\:|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\^|\\|"},{token:"punctuation.operator",regex:/[?:,;.]/},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}]};this.normalizeRules()};r.inherits(a,s);t.CrystalHighlightRules=a});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var s=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var s=n.match(/^(\s*\})/);if(!s)return 0;var a=s[1].length;var o=e.findMatchingBracket({row:t,column:a});if(!o||o.row==t)return 0;var i=this.$getIndent(e.getLine(o.row));e.replace(new r(t,0,t,a-1),i)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype);t.MatchingBraceOutdent=s});ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){"use strict";var r=e("../../lib/oop");var s=e("./fold_mode").FoldMode;var a=e("../../range").Range;var o=t.FoldMode=function(){};r.inherits(o,s);(function(){this.commentBlock=function(e,t){var n=/\S/;var r=e.getLine(t);var s=r.search(n);if(s==-1||r[s]!="#")return;var o=r.length;var i=e.getLength();var g=t;var u=t;while(++t<i){r=e.getLine(t);var p=r.search(n);if(p==-1)continue;if(r[p]!="#")break;u=t}if(u>g){var l=e.getLine(u).length;return new a(g,o,u,l)}};this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;r=this.commentBlock(e,n);if(r)return r};this.getFoldWidget=function(e,t,n){var r=e.getLine(n);var s=r.search(/\S/);var a=e.getLine(n+1);var o=e.getLine(n-1);var i=o.search(/\S/);var g=a.search(/\S/);if(s==-1){e.foldWidgets[n-1]=i!=-1&&i<g?"start":"";return""}if(i==-1){if(s==g&&r[s]=="#"&&a[s]=="#"){e.foldWidgets[n-1]="";e.foldWidgets[n+1]="";return"start"}}else if(i==s&&r[s]=="#"&&o[s]=="#"){if(e.getLine(n-2).search(/\S/)==-1){e.foldWidgets[n-1]="start";e.foldWidgets[n+1]="";return""}}if(i!=-1&&i<s)e.foldWidgets[n-1]="start";else e.foldWidgets[n-1]="";if(s<g)return"start";else return""}}).call(o.prototype)});ace.define("ace/mode/crystal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/crystal_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/folding/coffee"],function(e,t,n){"use strict";var r=e("../lib/oop");var s=e("./text").Mode;var a=e("./crystal_highlight_rules").CrystalHighlightRules;var o=e("./matching_brace_outdent").MatchingBraceOutdent;var i=e("../range").Range;var g=e("./folding/coffee").FoldMode;var u=function(){this.HighlightRules=a;this.$outdent=new o;this.$behaviour=this.$defaultBehaviour;this.foldingRules=new g};r.inherits(u,s);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var s=this.getTokenizer().getLineTokens(t,e);var a=s.tokens;if(a.length&&a[a.length-1].type=="comment"){return r}if(e=="start"){var o=t.match(/^.*[\{\(\[]\s*$/);var i=t.match(/^\s*(class|def|module)\s.*$/);var g=t.match(/.*do(\s*|\s+\|.*\|\s*)$/);var u=t.match(/^\s*(if|else|when)\s*/);if(o||i||g||u){r+=n}}return r};this.checkOutdent=function(e,t,n){return/^\s+(end|else)$/.test(t+n)||this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){var r=t.getLine(n);if(/}/.test(r))return this.$outdent.autoOutdent(t,n);var s=this.$getIndent(r);var a=t.getLine(n-1);var o=this.$getIndent(a);var g=t.getTabString();if(o.length<=s.length){if(s.slice(-g.length)==g)t.remove(new i(n,s.length-g.length,n,s.length))}};this.$id="ace/mode/crystal"}).call(u.prototype);t.Mode=u});(function(){ace.require(["ace/mode/crystal"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-crystal.js.map