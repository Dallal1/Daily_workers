ace.define("ace/mode/elm_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var i=function(){var e=this.createKeywordMapper({keyword:"as|case|class|data|default|deriving|do|else|export|foreign|"+"hiding|jsevent|if|import|in|infix|infixl|infixr|instance|let|"+"module|newtype|of|open|then|type|where|_|port|λ"},"identifier");var t=/\\(\d+|['"\\&trnbvf])/;var n=/[a-z_]/.source;var r=/[A-Z]/.source;var o=/[a-z_A-Z0-9']/.source;this.$rules={start:[{token:"string.start",regex:'"',next:"string"},{token:"string.character",regex:"'(?:"+t.source+"|.)'?"},{regex:/0(?:[xX][0-9A-Fa-f]+|[oO][0-7]+)|\d+(\.\d+)?([eE][-+]?\d*)?/,token:"constant.numeric"},{token:"comment",regex:"--.*"},{token:"keyword",regex:/\.\.|\||:|=|\\|"|->|<-|\u2192/},{token:"keyword.operator",regex:/[-!#$%&*+.\/<=>?@\\^|~:\u03BB\u2192]+/},{token:"operator.punctuation",regex:/[,;`]/},{regex:r+o+"+\\.?",token:function(e){if(e[e.length-1]==".")return"entity.name.function";return"constant.language"}},{regex:"^"+n+o+"+",token:function(e){return"constant.language"}},{token:e,regex:"[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b"},{regex:"{-#?",token:"comment.start",onMatch:function(e,t,n){this.next=e.length==2?"blockComment":"docComment";return this.token}},{token:"variable.language",regex:/\[markdown\|/,next:"markdown"},{token:"paren.lparen",regex:/[\[({]/},{token:"paren.rparen",regex:/[\])}]/}],markdown:[{regex:/\|\]/,next:"start"},{defaultToken:"string"}],blockComment:[{regex:"{-",token:"comment.start",push:"blockComment"},{regex:"-}",token:"comment.end",next:"pop"},{defaultToken:"comment"}],docComment:[{regex:"{-",token:"comment.start",push:"docComment"},{regex:"-}",token:"comment.end",next:"pop"},{defaultToken:"doc.comment"}],string:[{token:"constant.language.escape",regex:t},{token:"text",regex:/\\(\s|$)/,next:"stringGap"},{token:"string.end",regex:'"',next:"start"},{defaultToken:"string"}],stringGap:[{token:"text",regex:/\\/,next:"string"},{token:"error",regex:"",next:"start"}]};this.normalizeRules()};r.inherits(i,o);t.ElmHighlightRules=i});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var o=e("../../range").Range;var i=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var o=this._getFoldWidgetBase(e,t,n);if(!o&&this.startRegionRe.test(r))return"start";return o};this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var i=t;var a=n.length;t=t+1;var s=t;var g=e.getLength();while(++t<g){n=e.getLine(t);var l=n.search(/\S/);if(l===-1)continue;if(r>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i){break}else if(c.isMultiLine()){t=c.end.row}else if(r==l){break}}s=t}return new o(i,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var i=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var g=1;while(++n<i){t=e.getLine(n);var l=s.exec(t);if(!l)continue;if(l[1])g--;else g++;if(!g)break}var c=n;if(c>a){return new o(a,r,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/elm",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/elm_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var i=e("./elm_highlight_rules").ElmHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=i;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(s,o);(function(){this.lineCommentStart="--";this.blockComment={start:"{-",end:"-}",nestable:true};this.$id="ace/mode/elm"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/elm"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-elm.js.map