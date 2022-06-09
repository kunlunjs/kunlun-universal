import { Link, NavLink } from '@remix-run/react'

/**
 * 演示一些库的使用或 remix 特性
 */
export const Nav = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" end className="underline">
          Home
        </NavLink>
        <br />
        <NavLink to="/examples/articles" className="underline">
          Articles
        </NavLink>
        <br />
        <NavLink to="/examples/slow-page" className="underline">
          Slow Page
        </NavLink>
        <br />
        <NavLink to="/examples/framer-motion" className="underline">
          Framer Motion
        </NavLink>
        <br />
        <NavLink to="/examples/client-only-components" className="underline">
          Client Only Components
        </NavLink>
        <h2>Infinite Scrolling</h2>
        <ul>
          <li>
            <Link to="/examples/scrolling/offset-simple" className="underline">
              Offset Simple
            </Link>
          </li>
          <li>
            <Link
              to="/examples/scrolling/offset-advanced"
              className="underline"
            >
              Offset Advanced
            </Link>
          </li>
        </ul>
        <h2>Page based</h2>
        <ul>
          <li>
            <Link to="/examples/scrolling/page-simple" className="underline">
              Page Simple
            </Link>
          </li>
          <li>
            <Link to="/examples/scrolling/page-advanced" className="underline">
              Page Advanced
            </Link>
          </li>
          <li>
            <Link
              to="/examples/scrolling/page-alternative"
              className="underline"
            >
              Page Alternative
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
