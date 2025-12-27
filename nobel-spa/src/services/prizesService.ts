import http from './httpService'
import type { PagedResult } from '../types/paged'

export type PrizeRow = {
  category: string
  date: string
  grant: string
}

export type PrizesQuery = {
  page: number
  pageSize: number
  nobelPrizeYear?: string
  yearTo?: string
  nobelPrizeCategory?: string
}

type NobelPrize = {
  awardYear?: string
  categoryFullName?: { en?: string }
  category?: { en?: string }
  prizeAmount?: number
  prizeAmountAdjusted?: number
}

type PrizesResponse = {
  meta?: { count?: number; limit?: number; offset?: number }
  nobelPrizes?: NobelPrize[]
}

class PrizesService {
  async getPrizes(q: PrizesQuery): Promise<PagedResult<PrizeRow>> {
    const limit = q.pageSize
    const offset = (q.page - 1) * limit

    const data = await http.get<PrizesResponse>('/nobelPrizes', {
      params: {
        limit,
        offset,
        ...(q.nobelPrizeYear ? { nobelPrizeYear: q.nobelPrizeYear } : {}),
        ...(q.yearTo ? { yearTo: q.yearTo } : {}),
        ...(q.nobelPrizeCategory ? { nobelPrizeCategory: q.nobelPrizeCategory } : {}),
      },
    })

    const prizes = data.nobelPrizes ?? []
    const total = data.meta?.count ?? 0

    const rows: PrizeRow[] = prizes.map((p) => {
      const category = p.categoryFullName?.en || p.category?.en || '—'
      const date = p.awardYear ?? '—'
      const amount = p.prizeAmountAdjusted ?? p.prizeAmount ?? null
      return { category, date, grant: amount ? `${amount} SEK` : '—' }
    })

    return {
      rows,
      total,
      limit: data.meta?.limit ?? limit,
      offset: data.meta?.offset ?? offset,
    }
  }
}

export default new PrizesService()
