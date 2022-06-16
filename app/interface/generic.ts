// TODO
export type ExcludeFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type ExcludeFunctionProperties<T> = Pick<
  T,
  ExcludeFunctionPropertyNames<T>
>
