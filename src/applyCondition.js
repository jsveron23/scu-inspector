import { isExist } from './utils'

export default function applyCondition (include, exclude) {
  return (key) => isExist(include)
    ? include.includes(key)
    : !exclude.includes(key)
}
