import { PluginObject } from 'vue' // eslint-disable-line no-unused-vars

import VSinglePicker from './VSinglePicker.vue'

export const CoreUI: PluginObject<any> = {
  /**
   * インストール対象のコンポーネント
   * @param Vue Vueインスタンス
   * @param options コンポーネントオプション
   */
  install(Vue, options): void {
    Vue.component('v-single-picker', VSinglePicker)
  }
}
