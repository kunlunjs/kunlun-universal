// https://github.com/abc3354/remix-esm-workaround/blob/main/esm-module.ts
/**
 * TODO: 完善类型定义
 * @typedef {Record<'getReactMarkdown' | 'getReactFlowRenderer', React.ReactNode>}
 */
// @ts-ignore
module.exports = {
  getReactMarkdown: async () => import('react-markdown'),
  getReactFlowRenderer: async () => import('react-flow-renderer')
}
