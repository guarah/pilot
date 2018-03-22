import {
  __,
  divide,
  isNil,
  pipe,
} from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const formatter = new Intl.NumberFormat({
  style: 'decimal',
})

const fixToTwo = number => number.toFixed(2)

const format = pipe(
  Number,
  divide(__, 100),
  fixToTwo,
  formatter.format
)

const decimal = (value) => {
  if (isNil(value)) {
    return null
  }

  return format(Number(value) / 100)
}

export default decimal
