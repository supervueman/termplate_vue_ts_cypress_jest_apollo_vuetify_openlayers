<template>
  <v-app-bar
    app
    flat
    color="primary"
    dark
  >
    <v-btn @click="openTestModal">Open dialog</v-btn>

    <v-btn @click="changeTitle">Change title</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppBar extends Vue {
  private title = 'Test modal'

  private openTestModal() {
    this.$wm.testModal({
      title: this.title,
    })
  }

  private changeTitle() {
    this.title = 'changed title'
  }
}
</script>
