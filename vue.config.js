module.exports = {
  devServer: {
    overlay: false,
  },

  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },
}
