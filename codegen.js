const playground = require('./src/modules/playground/codegen.generate')

module.exports = {
  overwrite: true,
  generates: {
    ...playground,
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
