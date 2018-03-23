import buildResult from './result'
import mock from './mock.json'
import expectedResult from './expectedResultMock'

describe('Transaction details', () => {
  it('should work when transaction, gatewayOperations, chargebackOperations, payables, company and status are returned', () => {
    expect(buildResult(mock)).toEqual(expectedResult)
  })
})
