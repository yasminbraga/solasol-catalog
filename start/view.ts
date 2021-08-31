/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'

import parseMoney from '../utils/parseMoney'

View.global('parseMoney', parseMoney)

View.global('yesOrNot', (value: boolean) => {
  return value ? 'Sim' : 'Não'
})
