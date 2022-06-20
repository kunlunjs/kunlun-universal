import type { FC } from 'react'

type DirectionProps = {
  direction?: 'horizontal' | 'verticle'
  onClick: CallableFunction
}

export const Direction: FC<DirectionProps> = ({
  direction = 'horizontal',
  onClick
}) => {
  return (
    <button
      onClick={() =>
        onClick(direction === 'horizontal' ? 'verticle' : 'horizontal')
      }
      className="inline-flex items-center rounded-lg border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white"
    >
      <span aria-hidden="true" className="mr-1.5 text-sm" role="img">
        👀
      </span>
      <span className="text-xs font-medium capitalize">{direction}</span>
    </button>
  )
}
