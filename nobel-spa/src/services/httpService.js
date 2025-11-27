import axios from 'axios'

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.nobelprize.org/2.1',
      timeout: 10000,
    })
  }

  async get(url, config = {}) {
    const r = await this.client.get(url, config)
      return r.data
  }
}

export default new HttpService()
