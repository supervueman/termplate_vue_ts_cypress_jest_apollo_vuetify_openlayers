/** Запросы, мутации */
import { userUpdate } from '../apollo'

/** Типы */
import { DollarApollo } from 'vue-apollo/types/vue-apollo'
import { User } from '../types'

/**
 * Update user
 *
 * @param apollo - http client (apollo)
 * @param data - user data
 * @return - updated user
 */
export default async (apollo: DollarApollo<Vue>, data: User): Promise<User> => {
  if (!data.name) {
    throw new Error('Field name is required')
  }

  const user: User = {
    name: data.name.trim(),
    rocket: data.rocket.trim(),
    twitter: data.twitter.trim(),
  }

  const result = await apollo.mutate({
    client: 'testModule',
    mutation: userUpdate,
    variables: {
      _set: user,
      id: data.id?.trim(),
    },
  })

  return result?.data?.insert_users?.returning?.[0]
}
