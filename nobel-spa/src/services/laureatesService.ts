import http from './httpService'

export type LaureateRow = {
  name: string
  born: string
  awards: number
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
  laureates?: NobelLaureate[]
}

class LaureatesService {
  async getLaureates(): Promise<LaureateRow[]> {
    const data = await http.get<LaureatesResponse>('/laureates', {
      params: { limit: 200 },
    })

    const laureates = data.laureates ?? []

    return laureates.map((l) => {
      const name =
        l.fullName?.en ||
        l.knownName?.en ||
        l.orgName?.en ||
        '—'

      const born = l.birth?.date || l.founded?.date || '—'

      const awards = Array.isArray(l.nobelPrizes) ? l.nobelPrizes.length : 0

      return { name, born, awards }
    })
  }
}

export default new LaureatesService()
