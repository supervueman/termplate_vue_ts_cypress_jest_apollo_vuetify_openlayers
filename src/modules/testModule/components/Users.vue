<template>
  <v-card>
    <v-card-title>Users</v-card-title>
    <v-card-text>
      <v-data-table :items="users" :headers="headers" hide-default-footer @click:row="openUser">
        <template #item.delete>
          <v-icon>mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog v-model="isUserData" width="500">
      <UserData :id="userId" @save="onSave" />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SmartQuery } from 'vue-apollo-decorators'

import { allUsers } from '../apollo'

import UserData from './UserData.vue'

import { User } from '../types'
import { DataTableHeader } from 'vuetify'

@Component({
  apollo: {
    $client: 'testModule',
  },
  components: {
    UserData,
  },
})
export default class Users extends Vue {
  @SmartQuery<Users, User[]>({
    query: allUsers,
    update: ({ users }) => users,
  })
  private readonly users: User[] = []

  private readonly headers: DataTableHeader[] = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Rocket',
      value: 'rocket',
    },
    {
      text: 'Twitter',
      value: 'twitter',
    },
    {
      text: '',
      value: 'delete',
      align: 'end',
    },
  ]

  private userId = ''

  private isUserData = false

  /**
   * Open user profile window
   *
   * @param user - user data
   */
  private openUser(user: User) {
    this.userId = user.id
    this.isUserData = true
  }

  private onSave() {
    // TODO: refetch users
  }
}
</script>
