import type { MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
// 支持 md 和 mdx
import { attributes } from './articles/__layout/remix.mdx'

export const meta: MetaFunction = () => {
  return {
    title: 'Articles'
  }
}

export default function ArticlesRoute() {
  return (
    <>
      <div>
        <h2 className="text-lg">Articles</h2>
        <Link to={attributes.slug} className="underline">
          {attributes.meta.title}
        </Link>
      </div>
      <Outlet />
    </>
  )
}
