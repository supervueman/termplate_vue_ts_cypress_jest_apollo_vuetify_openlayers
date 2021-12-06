<template>
  <v-card>
    <v-card-title>Name</v-card-title>
    <v-card-text>
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { SmartQuery } from 'vue-apollo-decorators'

import { oneUser } from '../apollo'

import { User } from '../types'

@Component({
  apollo: {
    $client: 'testModule',
  },
})
export default class UserData extends Vue {
  @Prop({ type: String, default: null })
  public readonly declare id: string

  @SmartQuery<UserData, User>({
    query: oneUser,
    skip() {
      return !this.id
    },
    variables() {
      return {
        id: this.id,
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

  private save() {
    // TODO: Save data
  }
}
</script>
