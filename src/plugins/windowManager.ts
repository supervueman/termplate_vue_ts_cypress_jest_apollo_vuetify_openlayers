import Vue, { VueConstructor, PluginObject } from 'vue'
import VuetifyDialogPlugin, { VuetifyDialogUseOptions, VuetifyDialog } from 'vuetify-dialog'
import Vuetify from 'vuetify/lib'

export type WmOptions = {
  container?: string
  context?: {
    vuetify?: Vuetify
  },
  components?: {
    testModal: VueConstructor<Vue>,
  },
  layouts?: {
    dialog: VueConstructor<Vue>,
  },
}

export interface _VuetifyDialog extends VuetifyDialog {
  layout (name: string, options: VueConstructor): void
}

export type DialogActionBtn = {
  icon: string
  tooltip?: string
  disabled?: (() => boolean) | boolean
  onClick?: (event: MouseEvent) => void
}

export type DialogSubActionBtn = {
  label: string
  tooltip?: string
  disabled?: (() => boolean) | boolean
  onClick?: (event: MouseEvent) => void
}

export type DialogActionBtnMore = {
  icon: string
  tooltip?: string
  disabled?: (() => boolean) | boolean
  subActions: Array<DialogSubActionBtn>
}

export type DialogActions = Array<DialogActionBtn | DialogActionBtnMore>

/** Типы для диалоговых окон */
export interface DialogPluginUseOptions extends VuetifyDialogUseOptions {
  components?: { [key: string]: VueConstructor }
  layouts?: { [key: string]: VueConstructor }
}

export interface WindowManager {
  // Текущий интерфейс будет расширяться в других файлах
}

export type VueComponents<T extends {}> = {
  [name in keyof T]: typeof Vue
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: [
      'dialog',
      {
        customCssClass?: string[]
        top?: number | string
        left?: number | string
        width?: number | string
        height?: number | string
        title: string
        dataTest?: string
        beforeClose?: (this: V) => Promise<boolean> | boolean
        actions?: DialogActions
        resizable?: boolean
        unique?: boolean
      },
    ]
  }
}

const WindowManager: PluginObject<DialogPluginUseOptions> = {
  install: (Vue, options = {}) => {
    Vue.use<VuetifyDialogUseOptions>(VuetifyDialogPlugin, options)

    const manager: _VuetifyDialog = Vue.prototype.$wm

    if (options.components) {
      Object.keys(options.components).forEach((componentName) => {
        if (options.components?.[componentName]) {
          manager.component(componentName, options.components[componentName])
        }
      })
    }

    if (options.layouts) {
      Object.keys(options.layouts).forEach((layoutName) => {
        if (options.layouts?.[layoutName]) {
          manager.layout(layoutName, options.layouts[layoutName])
        }
      })
    }
  },
}

export default WindowManager
