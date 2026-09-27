import { createI18n } from 'vue-i18n'
import navbarEn from '@/locales/en/navbar.json'
import machineEn from '@/locales/en/machine.json'
import appearanceEn from '@/locales/en/appearance.json'
import dailysheetEn from '@/locales/en/dailysheet.json'

import navbarZh from '@/locales/zh/navbar.json'
import machineZh from '@/locales/zh/machine.json'
import appearanceZh from '@/locales/zh/appearance.json'
import dailysheetZh from '@/locales/zh/dailysheet.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': {
      navbar: navbarEn,
      machine: machineEn,
      appearance: appearanceEn,
      dailysheet: dailysheetEn
    },
    'zh': {
      navbar: navbarZh,
      machine: machineZh,
      appearance: appearanceZh,
      dailysheet: dailysheetZh
    }
  }
})
export default i18n