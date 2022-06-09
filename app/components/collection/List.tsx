import type { FC } from 'react'
import { ClientOnly } from 'remix-utils'
import type { Component } from '~/interface/component'
import { Example } from '../component/Example/Example'

type ListProps = {
  name: string
  items: Array<Component>
  spacing: string
}

export const List: FC<ListProps> = ({ name, items, spacing }) => {
  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => {
        return (
          <div className="not-prose mt-16 lg:mt-24 xl:max-w-[1348px]">
            <ul className="space-y-16">
              {items.map(item => (
                <li key={item.id}>
                  <Example name={name} item={item} spacing={spacing} />
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </ClientOnly>
  )
}
