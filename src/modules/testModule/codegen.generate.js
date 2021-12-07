module.exports = {
  './src/modules/testModule/types/generated.ts': {
    schema: `${process.env.VUE_APP_GRAPHQL_TEST_MODULE}`,
    documents: 'src/modules/testModule/apollo/**/*.gql',
    plugins: [
      'typescript',
    ],
  },
}
