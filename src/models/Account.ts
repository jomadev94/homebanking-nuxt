import { Transaction } from "./Transaction"

export interface Account{
    id:number,
    number:String,
    balance:number,
    creationDate:string
    transactions:Transaction[]
}