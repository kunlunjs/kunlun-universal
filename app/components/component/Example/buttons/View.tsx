import type { FC } from 'react'
// import styles from '~/styles/button.module.css'

type ViewProps = {
  view: boolean
  onClick: CallableFunction
}

export const View: FC<ViewProps> = ({ onClick, view }) => {
  return (
    // TODO
    <button
      onClick={() => onClick(!view)}
      className="inline-flex items-center rounded-lg border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white"
    >
      <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
        👀
      </span>

      <span className="text-xs font-medium">View</span>
    </button>
  )
}
