ace.define("ace/mode/tex_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t,r){
/*
 * tex_highlight_rules.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */
"use strict";var n=e("../lib/oop");var o=e("../lib/lang");var a=e("./text_highlight_rules").TextHighlightRules;var i=function(e){if(!e)e="text";this.$rules={start:[{token:"comment",regex:"%.*$"},{token:e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",next:"nospell"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:e,regex:"\\s+"}],nospell:[{token:"comment",regex:"%.*$",next:"start"},{token:"nospell."+e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"},{token:"keyword",regex:"\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",next:"start"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])]"},{token:"paren.keyword.operator",regex:"}",next:"start"},{token:"nospell."+e,regex:"\\s+"},{token:"nospell."+e,regex:"\\w+"}]}};n.inherits(i,a);t.TexHighlightRules=i});ace.define("ace/mode/r_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/tex_highlight_rules"],function(e,t,r){
/*
 * r_highlight_rules.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */
var n=e("../lib/oop");var o=e("../lib/lang");var a=e("./text_highlight_rules").TextHighlightRules;var i=e("./tex_highlight_rules").TexHighlightRules;var s=function(){var e=o.arrayToMap("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass".split("|"));var t=o.arrayToMap(("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|"+"NA_complex_").split("|"));this.$rules={start:[{token:"comment.sectionhead",regex:"#+(?!').*(?:----|====|####)\\s*$"},{token:"comment",regex:"#+'",next:"rd-start"},{token:"comment",regex:"#.*$"},{token:"string",regex:'["]',next:"qqstring"},{token:"string",regex:"[']",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+[Li]?\\b"},{token:"constant.numeric",regex:"\\d+L\\b"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.numeric",regex:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.language.boolean",regex:"(?:TRUE|FALSE|T|F)\\b"},{token:"identifier",regex:"`.*?`"},{onMatch:function(r){if(e[r])return"keyword";else if(t[r])return"constant.language";else if(r=="..."||r.match(/^\.\.\d+$/))return"variable.language";else return"identifier"},regex:"[a-zA-Z.][a-zA-Z0-9._]*\\b"},{token:"keyword.operator",regex:"%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"},{token:"keyword.operator",regex:"%.*?%"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]};var r=new i("comment").getRules();for(var n=0;n<r["start"].length;n++){r["start"][n].token+=".virtual-comment"}this.addRules(r,"rd-");this.$rules["rd-start"].unshift({token:"text",regex:"^",next:"start"});this.$rules["rd-start"].unshift({token:"keyword",regex:"@(?!@)[^ ]*"});this.$rules["rd-start"].unshift({token:"comment",regex:"@@"});this.$rules["rd-start"].push({token:"comment",regex:"[^%\\\\[({\\])}]+"})};n.inherits(s,a);t.RHighlightRules=s});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,r){"use strict";var n=e("../range").Range;var o=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var r=e.getLine(t);var o=r.match(/^(\s*\})/);if(!o)return 0;var a=o[1].length;var i=e.findMatchingBracket({row:t,column:a});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new n(t,0,t,a-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype);t.MatchingBraceOutdent=o});ace.define("ace/mode/r",["require","exports","module","ace/unicode","ace/range","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/r_highlight_rules","ace/mode/matching_brace_outdent"],function(e,t,r){
/*
 * r.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */
"use strict";var n=e("../unicode");var o=e("../range").Range;var a=e("../lib/oop");var i=e("./text").Mode;var s=e("./text_highlight_rules").TextHighlightRules;var g=e("./r_highlight_rules").RHighlightRules;var c=e("./matching_brace_outdent").MatchingBraceOutdent;var l=function(){this.HighlightRules=g;this.$outdent=new c;this.$behaviour=this.$defaultBehaviour};a.inherits(l,i);(function(){this.lineCommentStart="#";this.tokenRe=new RegExp("^["+n.wordChars+"._]+","g");this.nonTokenRe=new RegExp("^(?:[^"+n.wordChars+"._]|s])+","g");this.$id="ace/mode/r";this.snippetFileId="ace/snippets/r"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/r"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-r.js.map