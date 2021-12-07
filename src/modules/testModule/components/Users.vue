<template>
  <v-card>
    <v-card-title>Users</v-card-title>
    <v-progress-linear indeterminate :active="$apollo.loading || isLoading" />
    <v-card-text class="pt-4">
      <v-data-table :items="users" :headers="headers" hide-default-footer @click:row="openUser">
        <template #top>
          <v-btn color="primary" @click="openCreateUser">Create</v-btn>
        </template>
        <template #item.delete="{ item }">
          <v-icon @click.stop="deleteUser(item)">mdi-delete</v-icon>
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

import userDelete from '../services/userDelete'

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

  private isLoading = false

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

  private userId: string | undefined = ''

  private isUserData = false

  /** Open user date window for create */
  private openCreateUser() {
    this.userId = ''
    this.isUserData = true
  }

  /**
   * Open user profile window
   *
   * @param user - user data
   */
  private openUser(user: User) {
    this.userId = user.id
    this.isUserData = true
  }

  /** Call when user data saved */
  private async onSave() {
    try {
      await this.$apollo.queries.users.refetch()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  /**
   * Delete user
   *
   * @param user - user data
   */
  private async deleteUser(user: User) {
    if (!user.id) {
      return
    }

    const res = await this.$dialog.confirm({
      text: 'Do you really want to delete?',
      title: 'Warning',
    })

    if (!res) {
      return
    }

    this.isLoading = true

    try {
      await userDelete(this.$apollo, user.id)
      await this.$apollo.queries.users.refetch()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      this.isLoading = false
    }
  }
}
</script>
