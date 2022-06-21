import type { SandpackFiles } from '@codesandbox/sandpack-react'
import { ClientOnly } from 'remix-utils'
import { Example } from '~/components/example/Example'

type LoaderData = {
  files: SandpackFiles
}

// export const loader: LoaderFunction = async () => {
//   return json<LoaderData>({
//     files: {}
//   })
// }

export default function LoadingRouter() {
  // const data = useLoaderData() as LoaderData
  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => {
        return (
          <div className="mx-auto max-w-screen-xl px-4 py-8">
            <Example
              name="loading"
              item={[
                {
                  id: 'spinkit.html',
                  title: 'Loading',
                  spacing: ''
                },
                {
                  id: 'spinkit.css',
                  title: 'Loading',
                  spacing: ''
                }
              ]}
              spacing=""
            />
          </div>
        )
      }}
    </ClientOnly>
  )
}
