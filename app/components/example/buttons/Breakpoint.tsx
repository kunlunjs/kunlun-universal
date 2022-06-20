import type { FC } from 'react'
// import styles from '~/styles/button.module.css'

type BreakpointProps = {
  active: boolean
  icon: string
  size: string
  text: string
  onClick: CallableFunction
}

export const Breakpoint: FC<BreakpointProps> = ({
  active,
  icon,
  size,
  text,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(size)}
      // TODO
      className={`inline-flex items-center rounded-lg border border-black px-3 py-1.5 hover:bg-black hover:text-white ${
        active ? 'bg-black text-white' : 'text-black'
      }`}
    >
      <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
        {icon}
      </span>

      <span className="text-xs font-medium">{text}</span>
    </button>
  )
}
