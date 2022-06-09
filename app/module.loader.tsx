// https://github.com/abc3354/remix-esm-workaround/blob/main/app/moduleLoader.tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Module = any
type ModuleMap = Record<string, Module>
type ModuleImporter = () => Promise<Module>
type ModuleArray = { name: string; content: any }[]

const ModuleLoaderContext = createContext<ModuleMap | null>(null)

function moduleArrayToMap(modules: ModuleArray) {
  return modules.reduce<ModuleMap>((moduleMap, module) => {
    return {
      ...moduleMap,
      [module.name]: module.content
    }
  }, {})
}

export function ModulerLoader({
  imports,
  children
}: {
  imports: {
    // noinspection JSUnusedLocalSymbols (jetbrains bug)
    [name: string]: ModuleImporter
  }
  children: React.ReactNode
}) {
  const [modules, setModules] = useState<ModuleMap | null>(null)

  useEffect(() => {
    Promise.all(
      Object.keys(imports).map(async importName => ({
        name: 'next-mdx-remote',
        content: await imports[importName]()
      }))
    ).then(
      modules => setModules(moduleArrayToMap(modules)),
      err => {
        throw err
      }
    )
    return () => setModules(null)
  }, [imports])

  return (
    <ModuleLoaderContext.Provider value={modules}>
      {modules != null ? children : 'Loading modules'}
    </ModuleLoaderContext.Provider>
  )
}

export function useModuleLoader(importName: string) {
  const imports = useContext(ModuleLoaderContext)
  if (imports == null) {
    throw new Error(
      'Be sure to use useModuleLoader in a component wrapped in ModuleLoader'
    )
  }
  if (imports[importName] == null) {
    throw new Error(
      `Cannot find ${importName}, is it declared in the 'imports' prop of the ModuleLoader ?`
    )
  }
  return imports[importName]
}
