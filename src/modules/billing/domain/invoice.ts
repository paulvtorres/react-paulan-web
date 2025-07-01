export interface Client {
  num: number  
  id: string
  name: string
}

export interface Item {
  id: number
  name: string
  description: string
  price: number
}

export interface InvoiceDetail {
  itemId: string
  itemData: Item | null
  quantity: number
}

export interface Invoice {
  sequence: number
  clientId: string
  details: InvoiceDetail[]
}