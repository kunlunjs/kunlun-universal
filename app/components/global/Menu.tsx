import { Link } from '@remix-run/react'
import type { FC } from 'react'
import type { Links } from '~/interface/global'
import { IconMenu } from '../icon/Menu'

type MenuProps = {
  menu: boolean
  links: Links
  onClick: CallableFunction
}

export const Menu: FC<MenuProps> = ({ menu, onClick, links }) => (
  <div className="flex items-center sm:hidden">
    <button className="inline-flex items-center" onClick={() => onClick(!menu)}>
      <IconMenu />
      <span className="ml-1.5 text-xs font-medium">Menu</span>
    </button>

    {menu && (
      <ul className="absolute inset-x-0 top-full mt-[2px] border-b-2 border-gray-100 bg-white p-2">
        {links.map(link => (
          <li key={link.href}>
            <Link to={link.href}>
              <span className="block p-2 text-xs font-medium">
                {link.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
)
