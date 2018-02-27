# scu-inspector

[![npm](https://img.shields.io/npm/v/scu-inspector.svg)](https://www.npmjs.com/package/scu-inspector) [![npm](https://img.shields.io/npm/l/scu-inspector.svg)](https://www.npmjs.com/package/scu-inspector)
[![Build Status](https://travis-ci.org/jsveron23/scu-inspector.svg?branch=master)](https://travis-ci.org/jsveron23/scu-inspector)

Displaying props changes of React component by using ES2017 decorator on  'shouldComponentUpdate'. And it is designed to use by single component. If you want to apply every React components on your application by using once, use '[why-did-you-update](https://github.com/maicki/why-did-you-update)'.

## Getting Started

I used to display by using console.log for checking prop changes in Console tab. But it was hard to recognize what was changed or not. So, I implemented module to check as table view in Console tab. It does not display after filtered to not render in SCU. So you can just check what props were not apply by filtered.

Please, write [issue](https://github.com/jsveron23/scu-inspector/issues) or PR, if you have any feedback.

### Prerequisites

You may need to install 'babel-plugin-transform-decorators-legacy' to use ES2017 Decorator.

```bash
npm install --save-dev babel-plugin-transform-decorators-legacy
```

**Babel**

```JSON
"plugins": [
  "transform-decorators-legacy"
]
```

### Installation

```bash
npm install --save scu-inspector
```

### Screenshot

![Screenshot](screenshot.png)

### Usage

```javascript
import scuInspector from 'scu-inspector'

// with options
@scuInspector({
  // [optional] display props changes
  mode: 'changed', // all(default), changed, none

  // [optional] default display name will be using component name
  // but if you want to use unique string to recognize among components
  uniqueKey: 'position', // key name of props

  // [optional] it displays in Development Tool as console.table
  // default is false
  isCollapsed: true,

  // [optional]
  // logs off in production by default
  // but you can turn it off or not manually
  // default is true
  debug: false,

  // [optional] show specific keys of props
  // ignoring exclude
  include: ['name', 'homepage'],

  // [optional] hide specific keys of props
  exclude: ['age', 'address', 'location']
})
shouldComponentUpdate (nextProps) {
  ...
}

// without options
@scuInspector()
shouldComponentUpdate (nextProps) {
  ...
}
```

## License

[MIT](LICENSE.md)
