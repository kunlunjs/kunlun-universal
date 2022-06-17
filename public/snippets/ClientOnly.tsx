import { isValidElement } from 'react'
import { useIsBrowser } from './context'

interface ClientOnlyProps {
  readonly children?: () => JSX.Element
  readonly fallback?: JSX.Element
}

export function ClientOnly(props: ClientOnlyProps): JSX.Element | null
export function ClientOnly({
  children,
  fallback
}: ClientOnlyProps): JSX.Element | null {
  const isBrowser = useIsBrowser()

  if (isBrowser) {
    if (
      typeof children !== 'function' &&
      process.env.NODE_ENV === 'development'
    ) {
      throw new Error(
        `Error: The children of <ClientOnly> must be a "render function", e.g. <ClientOnly>{() => <span>{window.location.href}</span>}</ClientOnly>.
Current type: ${isValidElement(children) ? 'React element' : typeof children}`
      )
    }
    return <>{children?.()}</>
  }
  return fallback ?? null
}
