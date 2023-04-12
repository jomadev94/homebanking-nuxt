import { Account } from "../models/Account";
import { Card } from "../models/Card";
import { Client } from "../models/Client";
import StorageService from "../services/StorageService";

export const currentClient=()=>useState<Client | null>('currentClient',()=>StorageService.getCurrentClient())
export const currentAccounts=()=>useState<Account[] | null>('currentClient',()=>[])
export const currentCards=()=>useState<Card[] | null>('currentClient',()=>[])