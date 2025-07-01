import axios from 'axios'
import type { Client, Item } from '../../modules/billing/domain/invoice'

const BASE_CLIENTS = 'http://192.168.100.185:8001/api/clients'
const BASE_ITEMS = 'http://192.168.100.185:8002/api/items'

export const billingApi = {
  getSequence: async (): Promise<number> => {
    return 1 // Simulated
  },

  getClients: async (): Promise<Client[]> => {
    const res = await axios.get(BASE_CLIENTS)
    return res.data
  },

  getItems: async (): Promise<Item[]> => {
    const res = await axios.get(BASE_ITEMS)
    return res.data
  },

  getItemById: async (id: string): Promise<Item> => {
    const res = await axios.get(`${BASE_ITEMS}/${id}`)
    return res.data
  }
}