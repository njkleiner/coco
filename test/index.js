const assert = require('assert');

const parse = require('../');

describe('parse', () => {
    it('should handle null', () => {
        const result = parse(null);

        assert.deepEqual(result, []);
    });

    it('should handle empty string', () => {
        const result = parse('');

        assert.deepEqual(result, []);
    });

    it('should not parse arbitrary string', () => {
        const result = parse('not a conventional comment');

        assert.deepEqual(result, []);
    });

    it('should parse label + subject', () => {
        const result = parse('suggestion: This is not worded correctly.');

        assert.deepEqual(result, [{
            label: 'suggestion',
            subject: 'This is not worded correctly.',
            decoration: [],
            discussion: null
        }]);
    });

    it('should parse label + subject + multiple decorations', () => {
        const result = parse('suggestion (non-blocking needs-feedback): This is not worded correctly.');

        assert.deepEqual(result, [{
            label: 'suggestion',
            subject: 'This is not worded correctly.',
            decoration: ['non-blocking', 'needs-feedback'],
            discussion: null
        }]);
    });

    it('should parse label + decoration + subject', () => {
        const result = parse('nitpick (non-blocking): This is not worded correctly.');

        assert.deepEqual(result, [{
            label: 'nitpick',
            subject: 'This is not worded correctly.',
            decoration: ['non-blocking'],
            discussion: null
        }]);
    });

    it('should parse label + subject + discussion', () => {
        const result = parse('suggestion: This is not worded correctly.\n\nCan we change this to match the wording of the marketing page?');

        assert.deepEqual(result, [{
            label: 'suggestion',
            subject: 'This is not worded correctly.',
            decoration: [],
            discussion: 'Can we change this to match the wording of the marketing page?'
        }]);
    });

    it('should parse label + decoration + subject + discussion', () => {
        const result = parse('question (non-blocking): At this point, does it matter which thread has won?\n\nMaybe to prevent a race condition we should keep looping until they\'ve all won?');

        assert.deepEqual(result, [{
            label: 'question',
            subject: 'At this point, does it matter which thread has won?',
            decoration: ['non-blocking'],
            discussion: 'Maybe to prevent a race condition we should keep looping until they\'ve all won?'
        }]);
    });

    it('should parse multiple comments', () => {
        const result = parse('question (non-blocking): At this point, does it matter which thread has won?\n\nMaybe to prevent a race condition we should keep looping until they\'ve all won?\n\nnitpick (non-blocking): This is not worded correctly.');

        assert.deepEqual(result, [{
            label: 'question',
            subject: 'At this point, does it matter which thread has won?',
            decoration: ['non-blocking'],
            discussion: 'Maybe to prevent a race condition we should keep looping until they\'ve all won?'
        }, {
            label: 'nitpick',
            subject: 'This is not worded correctly.',
            decoration: ['non-blocking'],
            discussion: null
        }]);
    });

    it('should parse multiple comments (reverse order)', () => {
        const result = parse('nitpick (non-blocking): This is not worded correctly.\n\nquestion (non-blocking): At this point, does it matter which thread has won?\n\nMaybe to prevent a race condition we should keep looping until they\'ve all won?');

        assert.deepEqual(result, [{
            label: 'nitpick',
            subject: 'This is not worded correctly.',
            decoration: ['non-blocking'],
            discussion: null
        }, {
            label: 'question',
            subject: 'At this point, does it matter which thread has won?',
            decoration: ['non-blocking'],
            discussion: 'Maybe to prevent a race condition we should keep looping until they\'ve all won?'
        }]);
    });
});
