import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import styles from '~/styles/scrolling.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

/**
 * 所有 /scrolling/* 页面的父组件
 */
export default function Scrolling() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
