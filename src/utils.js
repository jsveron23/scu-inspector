const _isEmpty = (v) => (
  v === null ||
  v === undefined ||
  (v.hasOwnProperty('length') && v.length === 0) ||
  (v.constructor === Object && Object.keys(v).length === 0)
)
const _isExist = (v) => !_isEmpty(v)

export const isEmpty = (...x) => x.every(_isEmpty)
export const isExist = (...x) => x.every(_isExist)
export const isBoolean = (v) => typeof v === 'boolean'
export const isString = (v) => typeof v === 'string'
export const isNumber = (v) => typeof v === 'number'
export const isObject = (...x) => {
  const _isObject = (v) => !!v && v.constructor === Object

  return x.every(_isObject)
}
export const isArray = (...x) => {
  const _isArray = (v) => Array.isArray(v)

  return x.every(_isArray)
}
export const isFunction = (v) => typeof v === 'function'
export const isDiff = (a) => (b) => JSON.stringify(a) !== JSON.stringify(b)
export const diff = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filtered = new Set([...aSet].filter(x => !bSet.has(x)))

  return Array.from(filtered)
}
