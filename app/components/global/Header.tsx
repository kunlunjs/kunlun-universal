import { Link } from '@remix-run/react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { links } from '~/data/header/links'
import { IconGithub } from '../icon/GitHub'
import { Menu } from './Menu'

export const Header: FC = () => {
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    setMenu(false)
  }, [])

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center">
          <Link to="/">
            <span className="text-sm font-medium">
              Kunlun Universal
              <span aria-hidden="true" className="ml-1.5" role="img">
                🚀
              </span>
            </span>
          </Link>
          <span className="mx-4 block h-6 w-px bg-gray-100"></span>
          <Menu menu={menu} onClick={setMenu} links={links} />
          <ul className="hidden space-x-4 sm:flex">
            {links.map(link => {
              return (
                <li key={link.title}>
                  <Link to={link.href}>
                    <span className="block text-xs font-medium hover:opacity-75">
                      {link.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex flex-1 items-center justify-end">
          {/* <Link to="/notes">
            <span className="block text-xs font-medium hover:opacity-75">
              <span className="hidden sm:inline">Kunlun Universal</span>
              Notes
            </span>
          </Link> */}
          <a
            className="rounded p-2 hover:opacity-75"
            href="https://github.com/turing-fe/kunlun-universal"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only"> GitHub </span>
            <IconGithub />
          </a>
        </div>
      </div>
    </header>
  )
}
