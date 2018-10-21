
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jpLocale from 'element-ui/lib/locale/lang/ja'
import zhTerm from './ch'
import enTerm from './en'
import jpTerm from './jp'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...enTerm
  },
  ch: {
    ...zhTerm,
    ...zhLocale
  },
  jp: {
    ...jpTerm,
    ...jpLocale
  }
}

export const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'ch',
  messages
})
