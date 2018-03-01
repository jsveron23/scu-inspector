import { isExist } from './utils'

export default function getDisplayName (target = {}) {
  const displayName = target.displayName || target.constructor.name || target.name

  return (name) => `${displayName}${isExist(name) ? `-${name}` : ''}`
}
