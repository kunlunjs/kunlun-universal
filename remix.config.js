/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  serverBuildPath: 'dist-remix/index.js', // default: build/index
  // publicPath: "/build/",
  // https://remix.run/docs/en/v1/pages/gotchas#server-code-in-client-bundles
  // ESM 模块加载，见 app/lib/markdown.ts
  serverDependenciesToBundle: [
    /^@mdx-js.*/,
    // /^rehype.*/,
    // /^remark.*/,
    // /^unified.*/,
    // /^unist.*/,
    // /^vfile.*/,
    'next-mdx-remote'
  ]
}
