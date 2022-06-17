type ChunkNames = {
  [propName: string]: string | ChunkNames | ChunkNames[]
}
type Chunk = ChunkNames[string]
type Tree = Exclude<Chunk, string>

const isTree = (x: unknown): x is Tree =>
  typeof x === 'object' && !!x && Object.keys(x).length > 0

/**
 * Takes a tree, and flattens it into a map of keyPath -> value.
 *
 * ```js
 * flat({a: { b: 1 }}) === { 'a.b': 1 }
 * flat({ a: [1, 2] }) === { 'a.0': 1, 'a.1': 2 }
 * ```
 */
function flat(target: ChunkNames): Record<string, string> {
  const delimiter = '.'
  const output: Record<string, string> = {}

  function dfs(object: Tree, prefix?: string | number) {
    Object.entries(object).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}${delimiter}${key}` : key
      if (isTree(value)) {
        dfs(value, newKey)
      } else {
        output[newKey] = value
      }
    })
  }
  dfs(target)
  return output
}

const Noop = () => null

function hasProtocol(url: string): boolean {
  return /^(?:\w*|\/\/)/.test(url)
}

function isInternalUrl(url: string): boolean {
  return typeof url !== 'undefined' && !hasProtocol(url)
}
