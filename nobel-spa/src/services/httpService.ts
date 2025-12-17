import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

class HttpService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.nobelprize.org/2.1',
      timeout: 10000,
    })
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T>(url, config).then((r) => r.data)
  }
}

export default new HttpService()
