/* eslint-disable unused-imports/no-unused-imports */
import {
  Fragment,
  createContext,
  createElement,
  createFactory,
  createRef,
  // Hooks
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  // Types
  ElementRef,
  ElementType,
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
  KeygenHTMLAttributes,
  MutableRefObject,
  MouseEvent as ReactMouseEvent,
  Ref,
  ReactNode
} from 'react'

/**
 * 如何定义一个 context 类型的 Hook
 */
const DefineContext = createContext<Record<string, any> | null>(null)
function useDefineContext() {
  const context = useContext(DefineContext)
  if (context === null) {
    const error = new Error('Error messgae')
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, useDefineContext)
    throw error
  }
  return context
}

/**
 * Hook 的几种形态
 */
function useHook1(): [string | undefined, (props: any) => JSX.Element] {
  const [state, setState] = useState<string[]>([])
  return [
    state.length ? state.join(' ') : undefined,
    useMemo(() => {
      return function DefineProvider(props: any) {
        return (
          <DefineContext.Provider value={[]}>
            {props.children}
          </DefineContext.Provider>
        )
      }
    }, [state])
  ]
}

const useIsoMorphicEffect =
  typeof window !== undefined ? useLayoutEffect : useEffect
