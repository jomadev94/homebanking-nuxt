export interface Transaction{
    id:number,
    description:String,
    type:TransactionType,
    date:string,
    amount:number
}

export type TransactionType="CREDIT"|"DEBIT";