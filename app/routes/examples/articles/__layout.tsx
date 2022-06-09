import { Outlet } from '@remix-run/react'

/**
 * 所有 /article/:slug 页面的父组件
 */
export default function ArticleLayoutRoute() {
  return (
    <div className="text-red-400">
      <Outlet />
    </div>
  )
}
