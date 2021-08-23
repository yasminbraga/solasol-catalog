export default function formatPriceToNumber(value: string) {
  value = value.replace('R$', '').replace('.', '').replace(',', '.')
  const valueFormated = parseFloat(value)
  return valueFormated
}
