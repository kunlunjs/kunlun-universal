const value = JSON.parse(localStorage.getItem('count') ?? '0') as
  | string
  | number

export function BrokenOnTheServer() {
  return <h1>The initial count value was {value}</h1>
}
