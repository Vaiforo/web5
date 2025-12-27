import http from './httpService'
import type { PagedResult } from '../types/paged'

export type LaureateRow = {
  name: string
  born: string
  awards: number
}

export type LaureatesQuery = {
  page: number
  pageSize: number
  nobelPrizeYear?: string
  yearTo?: string
  nobelPrizeCategory?: string
}

type NobelLaureate = {
  fullName?: { en?: string }
  knownName?: { en?: string }
  orgName?: { en?: string }
  birth?: { date?: string }
  founded?: { date?: string }
  nobelPrizes?: unknown[]
}

type LaureatesResponse = {
  meta?: { count?: number; limit?: number; offset?: number }
  laureates?: NobelLaureate[]
}

class LaureatesService {
  async getLaureates(q: LaureatesQuery): Promise<PagedResult<LaureateRow>> {
    const limit = q.pageSize
    const offset = (q.page - 1) * limit

    const data = await http.get<LaureatesResponse>('/laureates', {
      params: {
        limit,
        offset,
        ...(q.nobelPrizeYear ? { nobelPrizeYear: q.nobelPrizeYear } : {}),
        ...(q.yearTo ? { yearTo: q.yearTo } : {}),
        ...(q.nobelPrizeCategory ? { nobelPrizeCategory: q.nobelPrizeCategory } : {}),
      },
    })

    const laureates = data.laureates ?? []
    const total = data.meta?.count ?? 0

    const rows: LaureateRow[] = laureates.map((l) => {
      const name = l.fullName?.en || l.knownName?.en || l.orgName?.en || '—'
      const born = l.birth?.date || l.founded?.date || '—'
      const awards = Array.isArray(l.nobelPrizes) ? l.nobelPrizes.length : 0
      return { name, born, awards }
    })

    return {
      rows,
      total,
      limit: data.meta?.limit ?? limit,
      offset: data.meta?.offset ?? offset,
    }
  }
}

export default new LaureatesService()
