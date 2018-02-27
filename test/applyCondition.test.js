import applyCondition from '../src/applyCondition'

describe('applyCondition.js', () => {
  it('Should be false', () => {
    expect(applyCondition(['a', 'b', 'c'], [0, 1, 2])(0)).toBeFalsy()
    expect(applyCondition(null, [0, 1, 2])(0)).toBeFalsy()
  })

  it('Should be true', () => {
    expect(applyCondition(['a', 'b', 'c'], [0, 1, 2])('a')).toBeTruthy()
  })
})
