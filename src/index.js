import { isExist } from './utils'
import processor from './processor'
import applyCondition from './applyCondition'
import getDisplayName from './getDisplayName'

const __MODE__ = 'all'
const __INCLUDES__ = null
const __EXCLUDES__ = ['children']
const __THROW_MSG__ = 'It has to be applied to shouldComponentUpdate method'

function scuInspector (options = {}) {
  const {
    uniqueKey = '',
    isCollapsed = false,
    debug = process.env.NODE_ENV !== 'production',
    mode = __MODE__,
    include = __INCLUDES__,
    exclude = __EXCLUDES__
  } = options
  const _processor = processor(mode)
  const _applyCondition = applyCondition(include, exclude)

  if (!debug) {
    return (target, name, descriptor) => descriptor
  }

  return (target, name, descriptor) => {
    if (name !== 'shouldComponentUpdate') {
      throw new Error(__THROW_MSG__)
    }

    const _getDisplayName = getDisplayName(target)
    const oldValue = descriptor.value

    descriptor.value = function (nextProps) {
      const bool = oldValue.apply(this, arguments)

      if (bool) {
        const displayName = _getDisplayName(nextProps[uniqueKey])
        const prevProps = this.props

        /** @callback */
        const _reducer = (res, key) => _processor({
          prevProp: prevProps[key],
          nextProp: nextProps[key],
          prevProps,
          nextProps
        })(res, key)

        /** @callback */
        const _display = (result) => {
          if (isExist(result)) {
            const groupStart = console[isCollapsed ? 'groupCollapsed' : 'group']

            groupStart(displayName)
            console.table(result)
            console.groupEnd()
          }
        }

        Object.keys(nextProps)
          .filter(_applyCondition)
          .reduce(_reducer, [{}])
          .forEach(_display)
      }

      return bool
    }

    return descriptor
  }
}

export default scuInspector
