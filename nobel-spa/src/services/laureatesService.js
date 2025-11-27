import http from './httpService'

class LaureatesService {
  async getLaureates() {
    const data = await http.get('/laureates', {
      params: {
        limit: 200,
      },
    })

    const laureates = data.laureates || []

    return laureates.map((l) => {
      const name =
        l.fullName?.en ||
        l.knownName?.en ||
        l.orgName?.en ||
        '—'

      const born = l.birth?.date || l.founded?.date || '—'

      const awards = Array.isArray(l.nobelPrizes)
        ? l.nobelPrizes.length
        : 0

      return { name, born, awards }
    })
  }
}

export default new LaureatesService()
