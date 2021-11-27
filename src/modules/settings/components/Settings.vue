<template>
  <v-card fixed right temporary>
    <v-card-title>Settings</v-card-title>

    <ThemeManager />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ThemeManager from '@/modules/themeManager/components/ThemeManager.vue'

@Component({
  components: {
    ThemeManager,
  },
})
export default class Settings extends Vue {}
</script>
