<template>
  <v-theme-provider root>
    <v-fade-transition>
      <div v-show="isActive" class="dialog-wrapper">
        <v-card>
          <v-card-title @click="move">
            {{ title }}
            <v-spacer />
          </v-card-title>
          <v-card-text>
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

@Component({})
export default class DialogWrapper extends mixins<Layoutable>(LayoutableMixin) {
  @Prop({ type: String, default: '' })
  private declare readonly title: string

  private move() {
    // TODO: Move
  }

  public close() {
    // TODO: Close
  }

  private hide() {
    // TODO: Hide
  }

  private focus() {
    // TODO: Focus
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  position: absolute;
  overflow: hidden;
  top: 300px;
  left: 500px;
}
</style>
