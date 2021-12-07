const testModule = require('./src/modules/testModule/codegen.generate')

module.exports = {
  overwrite: true,
  generates: {
    ...testModule,
  },
  hooks: {
    afterOneFileWrite: [
      'vue-cli-service lint',
    ],
  },
}
