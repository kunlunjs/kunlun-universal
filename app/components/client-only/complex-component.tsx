import { useEffect, useState } from 'react'

export const ComplexComponent = () => {
  const [count, setCount] = useState<number>(() => {
    const stored = localStorage.getItem('count')
    if (!stored) return 0
    return JSON.parse(stored)
  })

  useEffect(
    function sync() {
      localStorage.setItem('count', JSON.stringify(count))
    },
    [count]
  )

  return (
    <>
      <button onClick={() => setCount(c => c - 1)} className="w-8 bg-slate-400">
        -
      </button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)} className="w-8 bg-slate-400">
        +
      </button>
    </>
  )
}
