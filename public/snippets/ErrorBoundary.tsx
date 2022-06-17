import type { ReactNode } from 'react'
import { Component } from 'react'
import { canUseDOM } from './env'

type FallbackParams = {
  readonly error: Error
  readonly tryAgain: () => void
}
type FallbackFunction = (params: FallbackParams) => JSX.Element
type ErrorBoundaryProps = {
  readonly fallback?: FallbackFunction
  readonly children: ReactNode
}
type ErrorBoundaryState = {
  error: Error | null
}
const DefaultErrorBoundaryFallback: FallbackFunction = () => {
  return <div>DefaultErrorBoundaryFallback</div>
}
// TODO: 在模块中定义组件类型
// export function ErrorBoundary(props: ErrorBoundaryProps): JSX.Element
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  override componentDidCatch(error: Error): void {
    // Catch errors in any components below and re-render with error message
    if (canUseDOM) {
      this.setState({ error })
    }
  }

  override render(): ReactNode {
    const { children } = this.props
    const { error } = this.state

    if (error) {
      const fallbackParams: FallbackParams = {
        error,
        tryAgain: () => this.setState({ error: null })
      }
      const fallback: FallbackFunction =
        this.props.fallback ?? DefaultErrorBoundaryFallback
      return fallback(fallbackParams)
    }
    return children ?? null
  }
}
