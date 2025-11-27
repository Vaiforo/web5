import http from './httpService'

class PrizesService {
  async getPrizes() {
    const data = await http.get('/nobelPrizes', {
      params: {
        limit: 200,
      },
    })

    const prizes = data.nobelPrizes || []

    return prizes.map((p) => {
      const category =
        p.categoryFullName?.en ||
        p.category?.en ||
        '—'

      const date = p.awardYear || '—'

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
