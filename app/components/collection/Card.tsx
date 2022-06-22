import { Link } from '@remix-run/react'
import type { FC } from 'react'
import type { KLComponentCard } from '~/interface/component'
import { Tags } from '../example/Tags'

type CardProps = {
  item: KLComponentCard
}

export const Card: FC<CardProps> = ({ item }) => {
  const { title, slug, emoji, count, tags } = item
  const splits = slug.split('/')
  const [dir, file] = splits.length > 1 ? splits : [undefined, splits[0]]

  return (
    <Link to={`/components/${file}${dir ? `?dir=${dir}` : ''}`}>
      <div className="group relative block">
        <span
          className="absolute inset-0 rounded-lg border border-dashed border-black"
          aria-hidden="true"
        ></span>

        <div className="rounded-lg border border-black bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <span className="text-xl" role="img" aria-hidden="true">
                {emoji}
              </span>

              <Tags tags={tags} card={true} />
            </div>

            <p className="mt-4 text-lg font-medium">{title}</p>

            <p className="mt-1 text-xs">
              {count} {count > 1 ? ' components' : ' component'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
