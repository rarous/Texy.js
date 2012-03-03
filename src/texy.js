"use strict";

(function(window, undefined) {

    var Texy = function() {};

    Texy.prototype.process = function(input) {
        if (!input) return '';
        var normalized = normalize(input);
        return normalized ? '<p>' + normalized + '</p>' : '';
    };

    function normalize(input) {
        return [
            removeSoftHyphens,
            normalizeLineEndings,
            removeSpecialCharacters,
            trimRight,
            removeTrailingLineEndings
        ].reduce(function(x, f) {return f(x)}, input);
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

    window['Texy'] = Texy;
    window['Texy']['normalize'] = normalize;

})(window);