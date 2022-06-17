import type { FC } from 'react'
import type { KLComponentCard } from '~/interface/component'
import { Card } from './Card'

type GridProps = {
  items: Array<KLComponentCard>
}

export const Grid: FC<GridProps> = ({ items }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {items.map(item => (
        <Card item={item} key={item.slug} />
      ))}
    </div>
  )
}
