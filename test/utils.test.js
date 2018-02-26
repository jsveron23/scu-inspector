import {
  isEmpty,
  isExist,
  isDiff,
  isObject,
  isArray,
  isFunction,
  isNumber,
  isString,
  isBoolean,
  diff
} from '../src/utils'

describe('utils.js', () => {
  describe('#isEmpty', () => {
    it('Should be false', () => {
      expect(isEmpty(true)).toBeFalsy()
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(null, 'hello world')).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isEmpty(undefined)).toBeTruthy()
      expect(isEmpty(null)).toBeTruthy()
      expect(isEmpty(undefined, null, '', {}, [])).toBeTruthy()
    })
  })

  describe('#isExist', () => {
    it('Should be false', () => {
      expect(isExist('')).toBeFalsy()
      expect(isExist({})).toBeFalsy()
      expect(isExist([])).toBeFalsy()
      expect(isExist({ hello: 'world' }, '')).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isExist(true)).toBeTruthy()
      expect(isExist(0)).toBeTruthy()
      expect(isExist(true, 'hello world', 0)).toBeTruthy()
    })
  })

  describe('#isFunction', () => {
    it('Should be false', () => {
      expect(isFunction({})).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isFunction(function () {})).toBeTruthy()
      expect(isFunction(() => {})).toBeTruthy()
    })
  })

  describe('#isNumber', () => {
    it('Should be false', () => {
      expect(isNumber('0')).toBeFalsy()
      expect(isNumber(undefined)).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isNumber(-1)).toBeTruthy()
      expect(isNumber(0)).toBeTruthy()
      expect(isNumber(0.2)).toBeTruthy()
      expect(isNumber(-0.2)).toBeTruthy()
    })
  })

  describe('#isString', () => {
    it('Should be false', () => {
      expect(isString(0)).toBeFalsy()
      expect(isString(undefined)).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isString('-1')).toBeTruthy()
    })
  })

  describe('#isBoolean', () => {
    it('Should be false', () => {
      expect(isBoolean(0)).toBeFalsy()
      expect(isBoolean('true')).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isBoolean(false)).toBeTruthy()
      expect(isBoolean(!!'')).toBeTruthy()
    })
  })

  describe('#isObject', () => {
    it('Should be false', () => {
      expect(isObject(function () {})).toBeFalsy()
      expect(isObject(() => {})).toBeFalsy()
      expect(isObject(() => ({}))).toBeFalsy()
      expect(isObject([])).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject({}, { hello: 'world' })).toBeTruthy()
    })
  })

  describe('#isArray', () => {
    it('Should be false', () => {
      expect(isArray({})).toBeFalsy()
      expect(isArray([], new Map())).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isArray([])).toBeTruthy()
      expect(isArray([], ['hello'], [0], [undefined], [null])).toBeTruthy()
    })
  })

  describe('#isDiff', () => {
    it('Should be false', () => {
      expect(isDiff(undefined)(undefined)).toBeFalsy()
      expect(isDiff(null)(null)).toBeFalsy()
      expect(isDiff({})({})).toBeFalsy()
      expect(isDiff([])([])).toBeFalsy()
    })

    it('Should be true', () => {
      expect(isDiff(undefined)(null)).toBeTruthy()
      expect(isDiff(false)(0)).toBeTruthy()
    })
  })

  describe('#diff', () => {
    const a = ['a', 'b']
    const b = ['a', 'c']
    const c = [1, 2]
    const d = [1, 3]

    it('Should be equal as', () => {
      expect(diff(a)(b)).toEqual(['b'])
      expect(diff(b)(a)).toEqual(['c'])
      expect(diff(c)(d)).toEqual([2])
      expect(diff(d)(c)).toEqual([3])
    })
  })
})
