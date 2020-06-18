# coco

Quickly parse [conventional comments](https://conventionalcomments.org).

## Install

`$ npm install @njkleiner/coco`

## Usage

```javascript
const coco = require('@njkleiner/coco');

coco.parse('nitpick (non-blocking): This is not worded correctly.');
// => [{label: 'nitpick', subject: 'This is not worded correctly.', decoration: ['non-blocking'], discussion: null}]

coco.parse('suggestion: Let\'s avoid using this specific function...\n\nIf we reference much of a function marked "Deprecated", it is almost certain to disagree with us, sooner or later.');
// => [{label: 'suggestion', subject: 'Let\'s avoid using this specific function...', discussion: 'If we reference much of a function marked "Deprecated", it is almost certain to disagree with us, sooner or later.', decoration: []}]

coco.parse('not a conventional comment');
// => []
```
