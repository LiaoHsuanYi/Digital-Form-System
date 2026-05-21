import { createI18n } from 'vue-i18n'
import common from '@/locales/zh/common.json'
import machineZh from '@/locales/zh/machine.json'
import appearanceZh from '@/locales/zh/appearance.json'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    'zh': {
        common: common,
        machine: machineZh,
        appearance: appearanceZh
    },
  }
})
export default i18n