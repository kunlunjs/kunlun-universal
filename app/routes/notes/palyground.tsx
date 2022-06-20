import { ClientOnly } from 'remix-utils'
import { Sandpack } from '~/components/sandpack'

export default function PlaygroundRouter() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-16">
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => {
          return <Sandpack files={{}} options={{}} />
        }}
      </ClientOnly>
    </div>
  )
}
