import type { FC } from 'react'

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <p className="text-center text-sm text-gray-500">
          Created with 💖 by{' '}
          <a
            className="underline"
            href="https://kunlunjs.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            @kunlunjs
          </a>
        </p>
      </div>
    </footer>
  )
}
