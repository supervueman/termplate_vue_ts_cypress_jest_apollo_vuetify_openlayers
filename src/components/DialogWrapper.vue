<template>
  <v-theme-provider root>
    <v-fade-transition>
      <div v-show="isActive" class="dialog-wrapper">
        <v-card>
          <v-card-title class="dialog-wrapper--header" @mousedown="move">
            <div>{{ title }}</div>
            <v-spacer />
            <div class="d-flex">
              <v-icon @click.stop="close">mdi-window-close</v-icon>
              <!-- <v-icon @click.stop="close">mdi-chevron-up</v-icon> -->
            </div>
          </v-card-title>
          <v-progress-linear :active="isLoading" />
          <v-card-text>
            <div class="dialog-wrapper--lock dialog-wrapper--lock_loading" v-if="isLoading" />
            <dialog-child
              ref="dialog"
              v-bind="$options.propsData"
            />
          </v-card-text>
        </v-card>
      </div>
    </v-fade-transition>
  </v-theme-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import LayoutableMixin from 'vuedl/src/mixins/layoutable'

/** Типы */
import { Size } from '@/plugins/windowManager'

interface Activable extends Vue {
  isActive: boolean

  close(): void
}

interface Layoutable extends Activable {
  width: string | number

  persistent: boolean

  loading: boolean

  isLayout(): boolean

  getWidth: string | number

  _destroy(): void

  dismiss(): void
}

type DialogSize = {
  width: number
  height: number
}

@Component({})
export default class DialogWrapper extends mixins<Layoutable>(LayoutableMixin) {
  @Prop({ type: String, default: '' })
  private declare readonly title: string

  @Prop({ type: Boolean, default: false })
  private declare readonly isLoading: boolean

  private readonly size: Size = {
    offsetWidth: 0,
    offsetHeight: 0,
    nWidth: 0,
    nHeight: 0,
    width: 0,
    height: 0,
    maxWidth: 0,
    maxHeight: 0,
    offsetLeft: 0,
    offsetTop: 0,
    left: null,
    top: null,
  }

  private dialogSize: DialogSize = {
    width: 0,
    height: 0,
  }

  private setPosition(dialog: HTMLElement, position) {
    dialog.style.top = `${position.y}px`
    dialog.style.left = `${position.x}px`
  }

  /**
   * Обработчик события нажатия ЛКМ по кнопке перемещения модального окна
   *
   * @param event - событие мыши
   */
  private move(event: MouseEvent) {
    const target = event.target as HTMLElement

    if (event.target instanceof HTMLElement) {
      const dialog: HTMLElement | null = target?.closest('.dialog-wrapper')

      if (!dialog) return

      const dialogHeader: HTMLElement | null = target?.closest('.dialog-wrapper--header')
      const dialogHeaderSizes = dialogHeader?.getBoundingClientRect()

      const mousePosition = {
        x: event.clientX,
        y: event.clientY,
      }

      const offsetX = mousePosition.x - (dialogHeaderSizes?.x ?? 0)
      const offsetY = mousePosition.y - (dialogHeaderSizes?.y ?? 0)

      const onMouseMove = (event: MouseEvent) => {
        mousePosition.x = event.clientX - offsetX
        mousePosition.y = event.clientY - offsetY
        this.setPosition(dialog, mousePosition)
      }

      window.addEventListener('mousemove', onMouseMove)

      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', onMouseMove)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  position: absolute;
  overflow: hidden;
  top: 300px;
  left: 500px;
  z-index: 3;

  &--header {
    cursor: move;
    user-select: none;
  }
}
</style>
