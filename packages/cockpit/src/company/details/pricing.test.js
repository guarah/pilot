import companyMock from '../companyMock.json'
import pricing from './pricing'

const mock = {
  antifraud_cost: 70,
}

describe.only('Company pricing details to dashboard', () => {
  it('should get formated pricing when receives company object', () => {
    const result = pricing(companyMock)

    expect(result).toEqual(mock)
  })
})