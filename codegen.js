const testModule = require('./src/modules/testModule/codegen.generate')

module.exports = {
  overwrite: true,
  generates: {
    ...testModule,
  },
  namingConvention: {
    typeNames: 'change-case-all#pascalCase',
    enumValues: 'change-case-all#upperCase',
    transformUnderscore: true,
  },
  hooks: {
    afterOneFileWrite: [
      'vue-cli-service lint',
    ],
  },
}
