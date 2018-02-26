import { isExist } from './utils'
import processor from './processor'
import applyConditions from './applyCondition'
import getDisplayName from './getDisplayName'

const __MODE__ = 'all' // all, changed, none
const __INCLUDES__ = null
const __EXCLUDES__ = ['children']
const __THROW_MSG__ = 'It has to be applied to shouldComponentUpdate method'

function scuInspector (options = {}) {
  const {
    uniqueKey = '',
    isCollapsed = false,
    mode = __MODE__,
    include = __INCLUDES__,
    exclude = __EXCLUDES__
  } = options
  const _processor = processor(mode)
  const _applyCondition = applyConditions(include, exclude)

  return (target, name, descriptor) => {
    if (name !== 'shouldComponentUpdate') {
      throw new Error(__THROW_MSG__)
    }

    const _getDisplayName = getDisplayName(target)
    const oldValue = descriptor.value

    descriptor.value = function (nextProps) {
      // result from old SCU
      const bool = oldValue.apply(this, arguments)

      // @NOTE
      // - if filtered from old SCU,
      // - it doesn't display
      if (bool) {
        const displayName = _getDisplayName(nextProps[uniqueKey])
        const prevProps = this.props

        /** @callback */
        const _reducer = (res, key) =>
          _processor({
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
