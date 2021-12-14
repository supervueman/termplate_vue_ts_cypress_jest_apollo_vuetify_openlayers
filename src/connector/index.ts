const connectModules = () => {
  const requireComponent = require.context(
    // Относительный путь до каталога компонентов
    '@/modules',
    // Обрабатывать или нет подкаталоги
    true,
    // Регулярное выражение для определения файлов
    /(index.module.ts)$/,
  )

  return requireComponent.keys().map((fileName) => requireComponent(fileName))
}

const connectedModules = connectModules().map(module => module.default)

let routes = []
const storeModules = {}
const modals = {}
const apolloClients = {}

const moduleNameError = (moduleName) => {
  if (!moduleName) {
    throw new Error('Module name is not setted!')
  }
}

connectedModules.forEach(module => {
  moduleNameError(module.name)

  if (module.store) {
    storeModules[module.name] = module.store
  }

  if (module.routes) {
    routes = routes.concat(module.routes)
  }

  if (module.modals) {
    Object.keys(module.modals).forEach(modalName => {
      modals[modalName] = module.modals[modalName]
    })
  }

  if (module.apolloClient) {
    apolloClients[module.name] = module.apolloClient
  }
})

export {
  routes,
  storeModules,
  modals,
  apolloClients,
}
