import { useLocation } from '@remix-run/react'
import { capitalize } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils'
import type { KLComponent } from '~/interface/component'
import { request } from '~/lib/request'
import { Example } from '../example/Example'

type ListProps = {
  name: string
  spacing: string
  items: KLComponent[]
}

// ex: { name: 'hyperui/alerts',
// items: [{ id: '1', title: 'Simple', tags: [], spacing: false }, ...]
// spacing: 'flex flex-col gap-4 max-w-sm mx-auto p-8' }
export const List: FC<ListProps> = ({ name, items, spacing }) => {
  const { search } = useLocation()
  const [state, setState] = useState<KLComponent[]>(items)

  // ex: /components/$dynamic?dir=css-secrets
  const dir = search?.match(/\?dir=([\w-]+)$/)
  const realName = name.endsWith('$dynamic') && dir ? dir[1] : name

  useEffect(() => {
    async function fetchItems(param: string) {
      const res = await request.get(`/components/${param}`)
      const { data } = res
      // ex: ['ampersands.css', 'ampersands.html',...]
      if (Array.isArray(data.names)) {
        const chunkByName: any = [];
        (data.names as string[]).forEach(i => {
          chunkByName.push((data.files as string[]).filter(file => file.match(new RegExp(`^${i}\.(html|css|js)`))).map(j => ({
            id: j,
            title: capitalize(i.split(/[-_]/).join(' ')),
            spacing: '',
            tags: []
          })))
        })
        setState(chunkByName)
      }
    }

    if (name.endsWith('$dynamic') && dir) {
      fetchItems(dir[1])
    }
  }, [name, search])

  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => {
        return (
          <div className="not-prose mt-16 lg:mt-24 xl:max-w-[1348px]">
            <ul className="space-y-16">
              {state.map(item => (
                <li key={item.id}>
                  <Example name={realName} item={item} spacing={spacing} />
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </ClientOnly>
  )
}
