<template>
  <div>
    {{ title }}
    <div class="d-flex">
      <v-text-field
        name="name"
        label="label"
      />
      <v-text-field
        name="name"
        label="label"
      />
      <v-text-field
        name="name"
        label="label"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  layout: ['dialog', {
    title: 'Test modal 1',
  }],
})
export default class TestModal extends Vue {
  @Prop({ type: String, default: '' })
  public declare readonly title: string
}
</script>
