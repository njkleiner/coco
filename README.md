# coco

Quickly parse [conventional comments](https://conventionalcomments.org).

## Install

`$ npm install @njkleiner/coco`

## Usage

```javascript
const coco = require('@njkleiner/coco');

coco('nitpick (non-blocking): This is not worded correctly.');
// => [{label: 'nitpick', subject: 'This is not worded correctly.', decoration: ['non-blocking'], discussion: null}]

coco('not a conventional comment');
// => []
```
