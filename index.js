const PATTERN = /(\w+)( \([\w- ]+\))?: (.+)(\r?\n\r?\n.+)?/gm;

/**
* Parse conventional comments from a string.
*
* @param {string} input The input string to parse conventional comments from.
*
* @asserts typeof input === 'string'
* @asserts input.length > 0
*
* @returns {object[]} An array of conventional comment objects parsed from the input string.
*/
function parse(input) {
    if (!(input && typeof input === 'string' && input.length)) {
        return [];
    }

    const comments = [];
    let match = null;

    while ((match = PATTERN.exec(input)) !== null) {
        let [, label = null, decoration = [], subject = null, discussion = null] = match;

        if (decoration && typeof decoration === 'string') {
            decoration = decoration.trim();
            decoration = decoration.replace(/^\(/, '');
            decoration = decoration.replace(/\)$/, '');
            decoration = decoration.split(' ');
        }

        if (discussion) {
            discussion = discussion.trim();
        }

        comments.push({label, decoration, subject, discussion});
    }

    return comments;
}

module.exports = Object.freeze(parse);
