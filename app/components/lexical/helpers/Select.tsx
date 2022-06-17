export function Select({
  onChange,
  className,
  options,
  value
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className: string
  options: string[]
  value: string
}) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden value="" />
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
