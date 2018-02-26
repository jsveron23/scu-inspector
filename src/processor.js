import * as Utils from './utils'

export default function processor (mode) {
  return ({ prevProp, nextProp }) => (res, key) => {
    let _isDiff

    if (Utils.isFunction(nextProp)) {
      return res
    }

    if (Utils.isBoolean(nextProp) || Utils.isString(nextProp) || Utils.isNumber(nextProp)) {
      _isDiff = prevProp !== nextProp
    }

    if (Utils.isObject(nextProp) || Utils.isArray(nextProp)) {
      _isDiff = Utils.isDiff(nextProp)(prevProp)

      if (Utils.isArray(nextProp)) {
        prevProp = Utils.diff(prevProp)(nextProp).join(', ')
        nextProp = Utils.diff(nextProp)(prevProp).join(', ')
      }
    }

    const shouldAppend = (
      mode === 'all' ||
      (mode === 'changed' && _isDiff) ||
      (mode === 'none' && !_isDiff)
    )

    return shouldAppend
      ? [{
        ...res[0],
        [key]: {
          state: _isDiff ? 'CHANGED' : 'NONE',
          prevProp,
          nextProp
        }
      }]
      : res
  }
}
