"use strict";

(function(window, undefined) {

    var Texy = function() {};

    Texy.prototype.process = function(input) {
        return applyFilters(input, [
            removeSoftHyphens,
            normalize,
            parse,
            render,
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
        return input.replace(/\xAD/g, '');
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
            filter(isNonBlankString).
            map(function(x) {return { tag : 'p', text : x }});
    }

    function isNonBlankString(str) {
        return !!str;
    }

    function render(ast) {
        return ast.map(renderNode).join('\n\n');
    }

    function renderNode(node) {
        return ['<', node.tag, '>', node.text, '</', node.tag, '>'].join('');
    }

    window['Texy'] = Texy;
    window['Texy']['normalize'] = normalize;
})(window);
