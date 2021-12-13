<template>
  <v-app-bar
    app
    flat
    color="primary"
    dark
  >
    <v-btn @click="openTestModal">Open dialog</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppBar extends Vue {
  private openTestModal() {
    this.$wm.testModal({
      title: 'Test modal',
    })
  }
}
</script>
