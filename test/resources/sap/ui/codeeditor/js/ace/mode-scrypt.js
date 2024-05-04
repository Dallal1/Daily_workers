ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var i=e("../lib/oop");var n=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};i.inherits(o,n);o.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=o});ace.define("ace/mode/scrypt_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var i=e("../lib/oop");var n=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e="contract|library|loop|new|private|"+"public|if|else|struct|type|"+"require|static|const|import|exit|return|asm";var t="true|false";var r="function|auto|constructor|bytes|int|bool|SigHashPreimage|PrivKey|PubKey|Sig|Ripemd160|Sha1|Sha256|"+"SigHashType|SigHashPreimage|OpCodeType";var i=this.createKeywordMapper({"variable.language":"this",keyword:e,"constant.language":t,"support.function":r},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},n.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/},{token:"constant.numeric",regex:/[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:["support.function.math.scrypt","text","text"],regex:/\b(abs|min|max|within|ripemd160|sha1|sha256|hash160|hash256|checkSig|checkMultiSig|num2bin|pack|unpack|len|reverseBytes|repeat)(\s*)(\()/},{token:["entity.name.type.scrypt","text","text","text","variable.object.property.scrypt"],regex:/\b(SigHash)(\s*)(\.)(\s*)(ANYONECANPAY|ALL|FORKID|NONE|SINGLE)\b/},{token:["entity.name.type.scrypt","text","text","text","variable.object.property.scrypt"],regex:/\b(OpCode)(\s*)(\.)(\s*)(OP_PUSHDATA1|OP_PUSHDATA2|OP_PUSHDATA4|OP_0|OP_FALSE|OP_1NEGATE|OP_1|OP_TRUE|OP_2|OP_3|OP_4|OP_5|OP_6|OP_7|OP_8|OP_9|OP_10|OP_11|OP_12|OP_13|OP_14|OP_15|OP_16|OP_1ADD|OP_1SUB|OP_NEGATE|OP_ABS|OP_NOT|OP_0NOTEQUAL|OP_ADD|OP_SUB|OP_MUL|OP_DIV|OP_MOD|OP_LSHIFT|OP_RSHIFT|OP_BOOLAND|OP_BOOLOR|OP_NUMEQUAL|OP_NUMEQUALVERIFY|OP_NUMNOTEQUAL|OP_LESSTHAN|OP_GREATERTHAN|OP_LESSTHANOREQUAL|OP_GREATERTHANOREQUAL|OP_MIN|OP_MAX|OP_WITHIN|OP_CAT|OP_SPLIT|OP_BIN2NUM|OP_NUM2BIN|OP_SIZE|OP_NOP|OP_IF|OP_NOTIF|OP_ELSE|OP_ENDIF|OP_VERIFY|OP_RETURN|OP_TOALTSTACK|OP_FROMALTSTACK|OP_IFDUP|OP_DEPTH|OP_DROP|OP_DUP|OP_NIP|OP_OVER|OP_PICK|OP_ROLL|OP_ROT|OP_SWAP|OP_TUCK|OP_2DROP|OP_2DUP|OP_3DUP|OP_2OVER|OP_2ROT|OP_2SWAP|OP_RIPEMD160|OP_SHA1|OP_SHA256|OP_HASH160|OP_HASH256|OP_CODESEPARATOR|OP_CHECKSIG|OP_CHECKSIGVERIFY|OP_CHECKMULTISIG|OP_CHECKMULTISIGVERIFY|OP_INVERT|OP_AND|OP_OR|OP_XOR|OP_EQUAL|OP_EQUALVERIFY)\b/},{token:"entity.name.type.scrypt",regex:/\b(?:P2PKH|P2PK|Tx|HashPuzzleRipemd160|HashPuzzleSha1|HashPuzzleSha256|HashPuzzleHash160|OpCode|SigHash)\b/},{token:["punctuation.separator.period.scrypt","text","entity.name.function.scrypt","text","punctuation.definition.parameters.begin.bracket.round.scrypt"],regex:/(\.)([^\S$\r]*)([\w][\w\d]*)(\s*)(\()/,push:[{token:"punctuation.definition.parameters.end.bracket.round.scrypt",regex:/\)/,next:"pop"},{defaultToken:"start"}]},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^="},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]};this.embedRules(n,"doc-",[n.getEndRule("start")]);this.normalizeRules()};i.inherits(a,o);t.scryptHighlightRules=a});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var i=e("../../lib/oop");var n=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};i.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,r){var i=e.getLine(r);if(this.singleLineBlockCommentRe.test(i)){if(!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return""}var n=this._getFoldWidgetBase(e,t,r);if(!n&&this.startRegionRe.test(i))return"start";return n};this.getFoldWidgetRange=function(e,t,r,i){var n=e.getLine(r);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,r);var o=n.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],r,a);var s=e.getCommentFoldRange(r,a+o[0].length,1);if(s&&!s.isMultiLine()){if(i){s=this.getSectionRange(e,r)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=n.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],r,a);return e.getCommentFoldRange(r,a,-1)}};this.getSectionRange=function(e,t){var r=e.getLine(t);var i=r.search(/\S/);var o=t;var a=r.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){r=e.getLine(t);var c=r.search(/\S/);if(c===-1)continue;if(i>c)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=o){break}else if(g.isMultiLine()){t=g.end.row}else if(i==c){break}}s=t}return new n(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,r){var i=t.search(/\s*$/);var o=e.getLength();var a=r;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++r<o){t=e.getLine(r);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var g=r;if(g>a){return new n(a,i,g,t.length)}}}).call(a.prototype)});ace.define("ace/mode/scrypt",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/scrypt_highlight_rules","ace/mode/folding/cstyle"],function(e,t,r){"use strict";var i=e("../lib/oop");var n=e("./text").Mode;var o=e("./scrypt_highlight_rules").scryptHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=o;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};i.inherits(s,n);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$quotes={'"':'"',"'":"'"};this.createWorker=function(e){return null};this.$id="ace/mode/scrypt"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/scrypt"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-scrypt.js.map