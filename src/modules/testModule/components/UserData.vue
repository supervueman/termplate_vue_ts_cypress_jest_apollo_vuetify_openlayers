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
        :error-messages="nameErrors"
        @input="$v.user.name.$touch()"
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
      <v-btn color="primary" @click="save" :disabled="isLoading">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { SmartQuery } from 'vue-apollo-decorators'

import { Validations } from 'vuelidate-property-decorators'
import { required } from 'vuelidate/lib/validators'

import { oneUser } from '../apollo'

import userCreate from '../services/userCreate'
import userUpdate from '../services/userUpdate'

import { User } from '../types'

@Component({
  apollo: {
    $client: 'testModule',
  },
})
export default class UserData extends Vue {
  @Prop({ type: String, default: '' })
  public declare id: string | undefined

  private isLoading = false

  private createdUserId: string | undefined = ''

  @SmartQuery<UserData, User>({
    query: oneUser,
    skip() {
      return !this.id && !this.createdUserId
    },
    variables() {
      return {
        id: this.id || this.createdUserId,
      }
    },
    update: ({ users }) => {
      const user = users[0]
      return {
        id: user.id ?? '',
        name: user.name ?? '',
        rocket: user.rocket ?? '',
        twitter: user.twitter ?? '',
      }
    },
  })
  private readonly user: User = {
    id: '',
    name: '',
    rocket: '',
    twitter: '',
  }

  @Validations()
  private readonly validations = {
    user: {
      name: { required },
    },
  }

  private get nameErrors(): string[] {
    const errors: string[] = []
    if (!this.$v.user.name?.$dirty) return errors
    !this.$v.user.name?.required && errors.push('Name is required')
    return errors
  }

  private get title(): string {
    return this.id || this.createdUserId ? `User: ${this.user.name}` : 'Create user'
  }

  private async save() {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.isLoading = true

    try {
      if (!this.id && !this.createdUserId) {
        const user = await userCreate(this.$apollo, this.user)
        this.createdUserId = user.id
      } else {
        await userUpdate(this.$apollo, this.user)
      }
      this.$emit('save')
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
