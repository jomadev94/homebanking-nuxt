export interface Card{
    id:number,
    number:any,
    cardHolder:string,
    cvv:string,
    color:CardColor,
    type:CardType,
    truDate:string,
    fromDate:string,
}

export enum CardColor{
    SILVER="bg-gradient-to-tl to-gray-700 from-white/80 text-black",
    TITANIUM="bg-gradient-to-bl to-gray-600/90 from-zinc-800",
    GOLD="bg-gradient-to-tr to-yellow-400 from-amber-600"
}

export type CardType="CREDIT"|"DEBIT"