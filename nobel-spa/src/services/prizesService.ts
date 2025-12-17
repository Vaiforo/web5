import http from './httpService'

export type PrizeRow = {
  category: string
  date: string
  grant: string
}

type NobelPrize = {
  categoryFullName?: { en?: string }
  category?: { en?: string }
  awardYear?: string
  prizeAmount?: number
  prizeAmountAdjusted?: number
}

type PrizesResponse = {
  nobelPrizes?: NobelPrize[]
}

class PrizesService {
  async getPrizes(): Promise<PrizeRow[]> {
    const data = await http.get<PrizesResponse>('/nobelPrizes', {
      params: { limit: 200 },
    })

    const prizes = data.nobelPrizes ?? []

    return prizes.map((p) => {
      const category =
        p.categoryFullName?.en ||
        p.category?.en ||
        '—'

      const date = p.awardYear ?? '—'

      const amount = p.prizeAmountAdjusted ?? p.prizeAmount ?? null

      return {
        category,
        date,
        grant: amount ? `${amount} SEK` : '—',
      }
    })
  }
}

export default new PrizesService()
