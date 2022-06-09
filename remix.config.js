/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // https://remix.run/docs/en/v1/pages/gotchas#server-code-in-client-bundles
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^vfile.*/,
    /^unified.*/,
    /^@mdx-js.*/,
    'next-mdx-remote',
    'hast-util-to-html'
  ]
}
