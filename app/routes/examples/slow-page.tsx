import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const loader: LoaderFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return json({})
}

export default function SlowPageRoute() {
  return <Link to="/examples">Examples</Link>
}
