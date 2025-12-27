export type PagedResult<T> = {
  rows: T[]
  total: number
  limit: number
  offset: number
}
