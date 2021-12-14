const connectModules = () => {
  const requireComponent = require.context(
    // Относительный путь до каталога компонентов
    '@/modules',
    // Обрабатывать или нет подкаталоги
    true,
    // Регулярное выражение для определения файлов
    /(index.module.ts)$/,
  )

  return requireComponent.keys().map((fileName) => {
    return requireComponent(fileName)
  })
}

const connectedModules = connectModules()

const storeModules = {}
let routes = []

connectedModules.forEach(module => {
  if (module.store) {
    storeModules[module.moduleName] = module.store
  }

  if (module.routes) {
    routes = routes.concat(module.routes)
  }
})

export {
  storeModules,
  routes,
}
