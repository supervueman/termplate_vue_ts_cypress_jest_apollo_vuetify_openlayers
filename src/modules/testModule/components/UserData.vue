<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-progress-linear indeterminate :active="$apollo.loading" />
    <v-card-text class="pt-4">
      <v-text-field
        v-model="user.name"
        label="Name"
        dense
        outlined
      />
      <v-text-field
        v-model="user.rocket"
        label="Rocket"
        dense
        outlined
      />
      <v-text-field
        v-model="user.twitter"
        label="Twitter"
        dense
        outlined
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { SmartQuery } from 'vue-apollo-decorators'

import { oneUser } from '../apollo'

import { User } from '../types'

@Component({
  apollo: {
    $client: 'testModule',
  },
})
export default class UserData extends Vue {
  @PropSync('id', { type: String })
  public readonly declare syncedId: string

  @SmartQuery<UserData, User>({
    query: oneUser,
    skip() {
      return !this.syncedId
    },
    variables() {
      return {
        id: this.syncedId,
      }
    },
    update: ({ users }) => users[0],
  })
  private readonly user: User = {
    id: '',
    name: '',
    rocket: '',
    twitter: '',
  }

  private get title(): string {
    return this.syncedId ? `User: ${this.user.name}` : 'Create user'
  }

  private save() {
    // TODO: Save data
    this.$emit('save')
  }
}
</script>
