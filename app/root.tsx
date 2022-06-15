import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useTransition
} from '@remix-run/react'
import NProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import { useEffect } from 'react'
import tailwindcss from '../public/styles/tailwind.css'
import { Banner } from './components/global/Banner'
import { Popup } from './components/global/Popup'
import { MainLayout } from './components/layout/MainLayout'
// import { Nav } from './components/nav/Nav'
// npm run generate:css 生成的 tailwindcss 文件
import noScriptStyles from './styles/no-script.css'

export const meta: MetaFunction = () => {
  // TODO: 补充更多 meta
  return {
    charset: 'utf-8',
    title: 'Kunlun Universal',
    viewport: 'width=device-width,initial-scale=1'
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: nProgressStyles
    },
    // 使用 <link rel="stylesheet" href="/styles/tailwind.css" /> 代替
    // 引入的样式文件名会带哈希
    {
      rel: 'stylesheet',
      href: tailwindcss
    }
  ]
}

export default function Root() {
  const { pathname } = useLocation()
  const transition = useTransition()

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === 'idle') NProgress.done()
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start()
  }, [transition.state])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {pathname === '/react-spring' && (
          <noscript>
            <link rel="stylesheet" href={noScriptStyles} />
          </noscript>
        )}
        <link rel="stylesheet" href="/styles/tailwind.css" />
      </head>
      <body>
        <Banner
          text="⭐️ Star Kunlun Universal on GitHub ⭐️"
          url="https://github.com/turing-fe/kunlun-universal"
        />
        <Popup
          text="Use TailwindCSS? Click Here 👋"
          url="https://tailwindcss.com/"
        />
        {/* <Nav /> */}
        {pathname.startsWith('/examples') ? (
          <Outlet />
        ) : (
          <MainLayout>
            <Outlet />
          </MainLayout>
        )}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
