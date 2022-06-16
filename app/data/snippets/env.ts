export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const ExecutionEnvironment = {
  canUseDOM,
  // @ts-expect-error: window.attachEvent is IE specific.
  // See https://github.com/Microsoft/TypeScript/issues/3953#issuecomment-123396830
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseIntersectionObserver: canUseDOM && 'IntersectionObserver' in window,
  canUseViewport: canUseDOM && !!window.screen
}
