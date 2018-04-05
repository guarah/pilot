import buildResult from './result'
import fromRequest from './mocks/fromRequestsMock.json'
import expectedResult from './mocks/expectedResult.json'

describe('Transaction details', () => {
  it('should work', () => {
    expect(buildResult(fromRequest)).toEqual(expectedResult)
  })
})
