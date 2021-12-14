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

export type Size = {
  offsetWidth: number
  offsetHeight: number
  nWidth: number
  nHeight: number
  width: number
  height: number
  maxWidth: number
  maxHeight: number
  offsetLeft: number
  offsetTop: number
  left: number | null
  top: number | null
}

// Эти поля будут необходимы, если родителем перемещаемого объекта является какой-либо кастомный div
export interface SizeExtended extends Size {
  parentWidth?: number
  parentHeight?: number
  parentLeft?: number
  parentTop?: number
  parentMinLeft?: number
  parentMinTop?: number
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

/** Обработчик перемещения DOM-элемента. Данная ф-я мутирует value
 *
 * @param event - объект события mousedown
 * @param element - элемент DOM, который необходимо передвигать
 * @param value - объект передвигаемого элемента, где содержатся его координаты, размеры и т.д.
 * @param selector - селектор выборки
 */
export const move = (event: MouseEvent, element: Element, value: SizeExtended, selector = '#AppWorkspace .v-main__wrap') => {
  const { left, top, height, width } = element.getBoundingClientRect()
  /* Сохранить позицию объекта на момент начала перемещения окна */
  value.offsetLeft = event.clientX - left
  value.offsetTop = event.clientY - top

  const topOffset = getHeightHeader(selector) ?? 0
  const minLeft = value.parentMinLeft ?? 0
  const minTop = value.parentMinTop ?? 0
  /* Область перемещения всё окно, при необходимости можно передевать */
  const parentWidth = value.parentWidth || window.innerWidth
  const parentHeight = value.parentHeight || window.innerHeight
  const maxLeft = parentWidth - width
  const maxTop = parentHeight - height
  /* Обработчик события отслеживания положения курсора */
  window.onmousemove = (e) => {
    if (value.offsetTop && value.offsetLeft) {
      let left = e.clientX - value.offsetLeft - (value.parentLeft ?? 0)
      let top = e.clientY - value.offsetTop - (value.parentTop !== undefined ? value.parentTop : topOffset)
      left = left < minLeft ? minLeft : left
      left = left > maxLeft ? maxLeft : left
      top = top < minTop ? minTop : top
      top = top > maxTop ? maxTop : top

      value.left = left
      value.top = top
    }
  }

  /* Обработчик события снятие зажатия ЛКМ с кнопки перемещения модального окна */
  window.onmouseup = () => {
    value.offsetLeft = 0
    value.offsetTop = 0

    window.onmousemove = null
    window.onmousedown = null
    window.onmouseup = null
  }
}

/**
 * Получаем высоту шапки за которую нельзя заезжать передвигаемым окном
 * @param selector - селектор
 * @return - высота шапки
 * */
const getHeightHeader = (selector: string): number | undefined => {
  const elem = document.querySelector(selector)
  if (!elem) {
    console.error(`${selector} больше не существует.`)
  } else {
    return elem?.getBoundingClientRect().top || 0
  }
}

const WindowManager: PluginObject<DialogPluginUseOptions> = {
  install: (Vue, options = {}) => {
    Vue.use<VuetifyDialogUseOptions>(VuetifyDialogPlugin, {
      ...options,
      property: '$wm',
    })

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
