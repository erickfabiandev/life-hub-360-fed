interface IFinance {
  _id?: string,
  transactionType: string,
  amount: number,
  description: string,
  date: any,
  category: string
}

export type { IFinance }