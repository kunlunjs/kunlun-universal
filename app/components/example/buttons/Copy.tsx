import type { FC } from 'react'
import { useContext } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContext } from '~/context/toast'

interface CopyProps {
  code: string
}

export const Copy: FC<CopyProps> = ({ code }) => {
  const toast = useContext(ToastContext)

  return (
    <CopyToClipboard text={code} onCopy={() => toast('Copied to Clipboard!')}>
      {/* TODO */}
      <button className="inline-flex items-center rounded-lg border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white">
        <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
          📋
        </span>

        <span className="text-xs font-medium">Copy</span>
      </button>
    </CopyToClipboard>
  )
}
