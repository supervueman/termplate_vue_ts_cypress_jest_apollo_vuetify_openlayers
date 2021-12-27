/** Запросы, мутации */
import { userDelete } from '../apollo'

/** Типы */
import { DollarApollo } from 'vue-apollo/types/vue-apollo'

/**
 * Delete user
 *
 * @param apollo - http client (apollo)
 * @param data - user id
 * @return - deleted user name
 */
export default async (apollo: DollarApollo<Vue>, data: string): Promise<string> => {
  if (!data) {
    throw new Error('Field id is required')
  }

  const result = await apollo.mutate({
    client: 'testModule',
    mutation: userDelete,
    variables: {
      id: data,
    },
  })

  return result?.data?.insert_users?.returning?.[0]?.name
}
