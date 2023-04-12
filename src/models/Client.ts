import { Account } from "./Account";
import { Loan } from "./Loan";

export interface Client{
    token:String,
    firstName:String,
    lastName:String,
    email:String
}

export interface HomeInfo extends Omit<Client,"token">{
    accounts: Array<Account>,
    loans: Array<Loan>,
}