import type { FC } from 'react'

interface BannerProps {
  text: string
  url: string
}

export const Banner: FC<BannerProps> = ({ text, url }) => {
  return (
    <aside className="bg-black p-3 text-center text-white">
      <p className="text-center text-sm font-medium">
        <a
          href={url}
          className="hover:opacity-75"
          rel="noopener noreferrer"
          target="_blank"
        >
          {text}
        </a>
      </p>
    </aside>
  )
}
