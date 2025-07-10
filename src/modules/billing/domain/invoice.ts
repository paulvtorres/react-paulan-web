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

export interface InvoiceItem {
  sequence: number;
  code: string;
  description: string;
  pvp: number;
  quantity: number;
  iva_code: number;
  iva_percentage: number;
  iva_descripcion: string;
  subtotal: number;
}

export interface IvaGroupSummary {
  base: number;
  iva: number;
  total: number;
}