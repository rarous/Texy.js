"use strict";

(function() {

    describe("Texy!", function() {

        var texy = new Texy;

        it("should process empty input", function() {
            expect(texy.process('')).toBe('')
        });

        it("should wrap text into paragraph", function() {
            expect(texy.process('abc')).toBe('<p>abc</p>')
        });

        it("should create more paragraphs", function() {
            expect(texy.process('abc\n\ndef')).toBe('<p>abc</p>\n\n<p>def</p>')
        });

        it("should remove soft hyphens", function() {
            expect(texy.process('abc\u00ADdef')).toBe('<p>abcdef</p>')
        });

        describe("Input normalization", function() {

            it("should normalize DOS line endings", function() {
                expect(Texy.normalize('abc\r\ndef')).toBe('abc\ndef')
            });

            it("should normalize Mac line endings", function() {
                expect(Texy.normalize('abc\rdef')).toBe('abc\ndef')
            });

            it("should remove special chars", function() {
                expect(Texy.normalize('\x00\x01\x02\x03\x04\x05\x06\x07\x08')).toBe('')
            });

            it("should trim right ends of lines", function() {
                expect(Texy.normalize('\tabc\t   \t\t')).toBe('\tabc')
            });

            it("should remove trailing line endings", function() {
                expect(Texy.normalize('\nabc\n\n\n')).toBe('abc')
            });
        })
    })
})();