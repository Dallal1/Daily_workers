ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"--\x3e",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]};this.normalizeRules()};r.inherits(i,o);t.LogiQLHighlightRules=i});ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){"use strict";var r=e("../../lib/oop");var o=e("./fold_mode").FoldMode;var i=e("../../range").Range;var a=t.FoldMode=function(){};r.inherits(a,o);(function(){this.commentBlock=function(e,t){var n=/\S/;var r=e.getLine(t);var o=r.search(n);if(o==-1||r[o]!="#")return;var a=r.length;var s=e.getLength();var c=t;var l=t;while(++t<s){r=e.getLine(t);var g=r.search(n);if(g==-1)continue;if(r[g]!="#")break;l=t}if(l>c){var u=e.getLine(l).length;return new i(c,a,l,u)}};this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;r=this.commentBlock(e,n);if(r)return r};this.getFoldWidget=function(e,t,n){var r=e.getLine(n);var o=r.search(/\S/);var i=e.getLine(n+1);var a=e.getLine(n-1);var s=a.search(/\S/);var c=i.search(/\S/);if(o==-1){e.foldWidgets[n-1]=s!=-1&&s<c?"start":"";return""}if(s==-1){if(o==c&&r[o]=="#"&&i[o]=="#"){e.foldWidgets[n-1]="";e.foldWidgets[n+1]="";return"start"}}else if(s==o&&r[o]=="#"&&a[o]=="#"){if(e.getLine(n-2).search(/\S/)==-1){e.foldWidgets[n-1]="start";e.foldWidgets[n+1]="";return""}}if(s!=-1&&s<o)e.foldWidgets[n-1]="start";else e.foldWidgets[n-1]="";if(o<c)return"start";else return""}}).call(a.prototype)});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var o=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var o=n.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length;var a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,i-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype);t.MatchingBraceOutdent=o});ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/matching_brace_outdent"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var i=e("./logiql_highlight_rules").LogiQLHighlightRules;var a=e("./folding/coffee").FoldMode;var s=e("../token_iterator").TokenIterator;var c=e("../range").Range;var l=e("./matching_brace_outdent").MatchingBraceOutdent;var g=function(){this.HighlightRules=i;this.foldingRules=new a;this.$outdent=new l;this.$behaviour=this.$defaultBehaviour};r.inherits(g,o);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var o=this.getTokenizer().getLineTokens(t,e);var i=o.tokens;var a=o.state;if(/comment|string/.test(a))return r;if(i.length&&i[i.length-1].type=="comment.single")return r;var s=t.match();if(/(-->|<--|<-|->|{)\s*$/.test(t))r+=n;return r};this.checkOutdent=function(e,t,n){if(this.$outdent.checkOutdent(t,n))return true;if(n!=="\n"&&n!=="\r\n")return false;if(!/^\s+/.test(t))return false;return true};this.autoOutdent=function(e,t,n){if(this.$outdent.autoOutdent(t,n))return;var r=t.getLine(n);var o=r.match(/^\s+/);var i=r.lastIndexOf(".")+1;if(!o||!n||!i)return 0;var a=t.getLine(n+1);var s=this.getMatching(t,{row:n,column:i});if(!s||s.start.row==n)return 0;i=o[0].length;var l=this.$getIndent(t.getLine(s.start.row));t.replace(new c(n+1,0,n+1,i),l)};this.getMatching=function(e,t,n){if(t==undefined)t=e.selection.lead;if(typeof t=="object"){n=t.column;t=t.row}var r=e.getTokenAt(t,n);var o="keyword.start",i="keyword.end";var a;if(!r)return;if(r.type==o){var l=new s(e,t,n);l.step=l.stepForward}else if(r.type==i){var l=new s(e,t,n);l.step=l.stepBackward}else return;while(a=l.step()){if(a.type==o||a.type==i)break}if(!a||a.type==r.type)return;var g=l.getCurrentTokenColumn();var t=l.getCurrentTokenRow();return new c(t,g,t,g+a.value.length)};this.$id="ace/mode/logiql"}).call(g.prototype);t.Mode=g});(function(){ace.require(["ace/mode/logiql"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-logiql.js.map