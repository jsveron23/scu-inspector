[![npm](https://img.shields.io/npm/v/scu-inspector.svg?style=flat-square)](https://www.npmjs.com/package/scu-inspector) [![npm](https://img.shields.io/npm/l/scu-inspector.svg?style=flat-square)](https://www.npmjs.com/package/scu-inspector)

# scu-inspector

Please, write [issue](https://github.com/jsveron23/scu-inspector/issues) or PR, if have any feedback.

## Synopsis

The purpose is displaying props changes of shouldComponentUpdate(React). It is designed to use by single component by using decorator. If you want to apply every React components by using just once, try to use NPM package that '[why-did-you-update](why-did-you-update)'.

## Installation

```bash
npm install --save scu-inspector
```

## Screenshot

![Screenshot](screenshot.png)

## Usage

```javascript
import scuInspector from 'scu-inspector'

// with options
@scuInspector({
  // display props changes
  // all(default), changed, none
  // optional
  mode: 'changed',

  // default display name will be using component name
  // but if you want to use unique string to recognize components
  // key name of props
  // optional
  uniqueKey: 'position',

  // it displays in Development Tool as console.table
  // default display will be not collapsed
  // optional
  isCollapsed = false,


  // show specific keys of props
  // ignoring exclude
  // optional
  include = ['name', 'address'],

  // hide specific keys of props
  // optional
  exclude = ['age', 'location']
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
