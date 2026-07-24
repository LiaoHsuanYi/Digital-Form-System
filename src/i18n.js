import { createI18n } from 'vue-i18n'
import navbarZh from '@/locales/zh/navbar.json'
import machineZh from '@/locales/zh/machine.json'
import appearanceZh from '@/locales/zh/appearance.json'
import dailysheetZh from '@/locales/zh/dailysheet.json'

import navbarTh from '@/locales/th/navbar.json'
import machineTh from '@/locales/th/machine.json'
import appearanceTh from '@/locales/th/appearance.json'
import dailysheetTh from '@/locales/th/dailysheet.json'

import navbarId from '@/locales/id/navbar.json'
import machineId from '@/locales/id/machine.json'
import appearanceId from '@/locales/id/appearance.json'
import dailysheetId from '@/locales/id/dailysheet.json'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    'zh': {
        navbar: navbarZh,
        machine: machineZh,
        appearance: appearanceZh,
        dailysheet: dailysheetZh
    },
    'th': {
        navbar: navbarTh,
        machine: machineTh,
        appearance: appearanceTh,
        dailysheet: dailysheetTh
    },
    'id': {
        navbar: navbarId,
        machine: machineId,
        appearance: appearanceId,
        dailysheet: dailysheetId
    }
  }
})
export default i18n