import type { FC } from 'react'

interface RangeProps {
  range: number
  onChange: CallableFunction
}

export const Range: FC<RangeProps> = ({ onChange, range }) => {
  return (
    <div>
      <input
        type="range"
        min="340"
        max="1348"
        step="4"
        aria-label="Breakpoint Width"
        value={range}
        onChange={e => onChange(Number(e.currentTarget.value))}
      />
    </div>
  )
}
