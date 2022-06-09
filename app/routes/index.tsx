import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Grid } from '~/components/collection/Grid'
import type { ComponentCard } from '~/interface/component'
import { getComponents } from '~/lib/components'

type LoaderData = {
  components: Array<ComponentCard>
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const componentData = [
    'title',
    'slug',
    'icon',
    'count',
    'ecommerce',
    'application',
    'tags'
  ]
  const components = getComponents(componentData)
  return json({ components })
}

export default function Home() {
  const data = useLoaderData() as LoaderData
  console.log(data)

  return (
    <>
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">Components</h2>
          <Grid items={data.components || []} />
        </div>
      </div>
    </>
  )
}
