<template>
  <v-navigation-drawer v-model="open" fixed right temporary>
    <v-list-item>
      <v-select v-model="theme" label="color theme" :items="themeOptions" />
    </v-list-item>
    <v-list-item>
      <v-select v-model="contrast" label="contrast" :items="contrastOptions" />
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Preferences } from '@/store/themeManager/types'
import { Vue, Component } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { VuetifyThemesT, VuetifyThemesNames } from '../plugins/vuetify'

type ThemeOptions = {
  text: string
  value: string
}

const namespace = 'themeManager'

@Component({})
export default class PreferencesDrawer extends Vue {
  private themeOptions: ThemeOptions[] = [
    {
      text: 'blue',
      value: 'blue',
    },
    {
      text: 'green',
      value: 'green',
    },
    {
      text: 'mytheme',
      value: 'mytheme',
    },
  ]

  private contrastOptions: ThemeOptions[] = [
    {
      text: VuetifyThemesNames.Dark,
      value: VuetifyThemesNames.Dark,
    },
    {
      text: VuetifyThemesNames.Light,
      value: VuetifyThemesNames.Light,
    },
  ]

  @State('preferencesDrawer', { namespace })
  private readonly declare preferencesDrawer: boolean

  @State('preferences', { namespace })
  private readonly declare preferences: Preferences

  @Mutation('setTheme', { namespace })
  private readonly declare setTheme: (theme: string) => void

  @Mutation('setContrast', { namespace })
  private readonly declare setContrast: (contrast: string) => void

  @Action('changePreferencesDrawer', { namespace })
  private readonly declare changePreferencesDrawer: (value: boolean) => void

  get open(): boolean {
    return this.preferencesDrawer
  }

  set open(value: boolean) {
    this.changePreferencesDrawer(value)
  }

  get theme(): string {
    return this.preferences.theme
  }

  set theme(theme: string) {
    this.setTheme(theme)
  }

  get contrast(): VuetifyThemesT {
    return this.preferences.contrast
  }

  set contrast(contrast: VuetifyThemesT) {
    this.setContrast(contrast)
  }
}
</script>
