import test from 'japa'

import formatPriceToNumber from '../../utils/formatPriceToNumber'

test.only('should formatPriceToNumber return a number formated whith money', (assert) => {
  const formatedNumber = formatPriceToNumber('R$ 1.000,00')
  assert.isNumber(formatedNumber)
  assert.equal(formatedNumber, 1000.0)
})
