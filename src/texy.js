"use strict";

(function(window, undefined) {

    var Texy = function() {};

    Texy.prototype.process = function(input) {
        var normalized = normalize(input);
        var ast = parse(normalized);
        return render(ast);
    };

    function normalize(input) {
        return applyFilters(input, [
            removeSoftHyphens,
            normalizeLineEndings,
            removeSpecialCharacters,
            trimRight,
            removeTrailingLineEndings
        ]);
    }

    function applyFilters(input, filters) {
        return filters.reduce(function(x, f) {return f(x)}, input);
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
        return '<' + node.tag + '>' + node.text + '</' + node.tag + '>';
    }

    window['Texy'] = Texy;
    window['Texy']['normalize'] = normalize;

})(window);