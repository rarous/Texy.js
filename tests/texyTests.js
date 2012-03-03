
(function(){

describe ("Texy!", function() {

    var texy = new Texy;

    it ("should process empty input", function () {
       expect(texy.process('')).toBe('')
    });

    it ("should wrap text into paragraph", function () {
        expect(texy.process('abc')).toBe('<p>abc</p>')
    });


    describe ("Texy! input normalization", function() {

        it ("should remove soft hyphens", function() {
            expect(Texy.normalize('\xC2\xAD')).toBe('')
        });

        it ("should normalize DOS line endings", function () {
           expect(Texy.normalize('abc\r\ndef')).toBe('abc\ndef')
        });

        it ("should normalize Mac line endings", function () {
            expect(Texy.normalize('abc\rdef')).toBe('abc\ndef')
        });

        it ("should remove special chars", function () {
            expect(Texy.normalize('\x00\x01\x02\x03\x04\x05\x06\x07\x08')).toBe('')
        });

        it ("should trim right ends of lines", function () {
            expect(Texy.normalize('test\t   \t\t')).toBe('test')
        });

        it ("should remove trailing line endings", function () {
            expect(Texy.normalize('\ntest\n\n\n')).toBe('test')
        });
    })
})

})();