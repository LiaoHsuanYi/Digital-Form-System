import { createI18n } from 'vue-i18n'
import commonZh from '@/locales/zh/common.json'
import machineZh from '@/locales/zh/machine.json'
import appearanceZh from '@/locales/zh/appearance.json'

import commonTh from '@/locales/th/common.json'
import machineTh from '@/locales/th/machine.json'
import appearanceTh from '@/locales/th/appearance.json'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    'zh': {
        common: commonZh,
        machine: machineZh,
        appearance: appearanceZh
    },
    'th': {
        common: commonTh,
        machine: machineTh,
        appearance: appearanceTh
    }
  }
})
export default i18n