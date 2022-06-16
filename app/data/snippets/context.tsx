import type { ReactNode } from 'react'
import { useContext } from 'react'
import { createContext, useEffect, useState } from 'react'

export const BrowserContext = createContext<boolean>(false)
export function BrowserContextProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <BrowserContext.Provider value={isBrowser}>
      {children}
    </BrowserContext.Provider>
  )
}
export function useIsBrowser(): boolean {
  return useContext(BrowserContext)
}
