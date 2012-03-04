"use strict";

(function(window, undefined) {

    var Texy = function() {};

    Texy.prototype.process = function(input) {
        return applyFilters(input, [
            Utf8.encode,
            removeSoftHyphens,
            normalize,
            parse,
            render,
            Utf8.decode
        ]);
    };

    function applyFilters(input, filters) {
        return filters.reduce(function(x, f) {return f(x)}, input);
    }

    function normalize(input) {
        return applyFilters(input, [
            normalizeLineEndings,
            removeSpecialCharacters,
            trimRight,
            removeTrailingLineEndings
        ]);
    }

    function removeSoftHyphens(input) {
        return input.replace(/\xC2\xAD/g, '');
    }

    function normalizeLineEndings(input) {
        return input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    function removeSpecialCharacters(input) {
        return input.replace(/[\x00-\x08\x0B-\x1F]+/g, '');
    }

    function trimRight(input) {
        return input.replace(/[\t ]+$/m, '');
    }

    function removeTrailingLineEndings(input) {
        return input.replace(/^\n+|\n+$/g, '')
    }

    function parse(input) {
        return input.
            split(/\n{2,}/g).
            filter(function(x) {return x}).
            map(function(x) {return { tag : 'p', text : x }});
    }

    function render(ast) {
        return ast.map(renderNode).join('\n\n');
    }

    function renderNode(node) {
        return ['<', node.tag, '>', node.text, '</', node.tag, '>'].join('');
    }

    /**
     * @author Jonas Raoni Soares Silva
     * @see http://jsfromhell.com/geral/utf-8
     * @type {Object}
     */
    var Utf8 = {
        encode : function(s) {
            for (var c, i = -1, l = (s = s.split('')).length, o = String.fromCharCode; ++i < l; s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]);
            return s.join('');
        },
        decode : function(s) {
            for (var a, b, i = -1, l = (s = s.split('')).length, o = String.fromCharCode, c = 'charCodeAt'; ++i < l; ((a = s[i][c](0)) & 0x80) && (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ? o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = ''));
            return s.join('');
        }
    };

    window['Texy'] = Texy;
    window['Texy']['normalize'] = normalize;
})(window);