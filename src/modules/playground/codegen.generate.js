module.exports = {
  './src/modules/playground/types/generated.ts': {
    schema: `${process.env.VUE_APP_GRAPHQL_TEST_MODULE}`,
    documents: 'src/modules/playground/apollo/**/*.gql',
    plugins: [
      'typescript',
    ],
  },
}
