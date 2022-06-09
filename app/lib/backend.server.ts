// @ts-ignore
const items = (global.__items =
  // @ts-ignore
  global.__items ??
  Array.from({ length: 50_000 }, (_, i) => ({
    id: i.toString(),
    value: `Item ${i}`
  })))

export async function getItems({
  start,
  limit
}: {
  start: number
  limit: number
}) {
  return items.slice(start, start + limit)
}

export async function getItemsPaginated({
  page,
  limit
}: {
  page: number
  limit: number
}) {
  const start = page * limit
  return items.slice(start, start + limit)
}

export async function getCount() {
  return items.length
}
