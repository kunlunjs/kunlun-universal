import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Grid } from '~/components/collection/Grid'
import type { KLComponentCard } from '~/interface/component'
import { getDataComponents } from '~/lib/components'

type LoaderData = {
  components: Array<KLComponentCard>
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const componentData = [
    'title',
    'slug',
    'emoji',
    'count',
    'ecommerce',
    'application',
    'tags'
  ]
  // [{ title: 'Alerts', slug: 'hyperui/alerts', emoji: '🚨', count: 7 },...]
  const components = getDataComponents(componentData)

  return json({ components })
}

export default function Home() {
  // {components: [{title: 'Alerts', slug: 'alerts', emoji: '🚨', count: 7}, ...]}
  const data = useLoaderData() as LoaderData

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
