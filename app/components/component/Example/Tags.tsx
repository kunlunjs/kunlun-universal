import type { FC } from 'react'

interface TagsProps {
  tags?: string[]
  card?: boolean
}

export const Tags: FC<TagsProps> = ({ tags, card }) => {
  return (
    <div className={`flex items-center gap-1.5 ${card && '-mt-3 -mr-3'}`}>
      {tags &&
        tags.map(tag => (
          <span
            className="rounded bg-black py-1 px-3 text-[10px] text-white"
            key={tag}
          >
            {tag}
          </span>
        ))}
    </div>
  )
}
