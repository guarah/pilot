import buildResult from './result'
import fromRequest from './mocks/fromRequests.json'
import expectedResult from './mocks/expectedResultMock'

describe('Transaction details', () => {
  it('should work when transaction, gatewayOperations, chargebackOperations, payables, company and status are returned', () => {
    expect(buildResult(fromRequest)).toEqual(expectedResult)
  })
})
