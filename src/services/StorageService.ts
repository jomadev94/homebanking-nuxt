import { Client } from "../models/Client";

export default class StorageService{

    static saveClient(client:Client){
        const cookie=useCookie<Client>("client", {sameSite:"none", secure:true, httpOnly:true});
        cookie.value=client;
    }

    static getCurrentClient():Client | null{
        const cookie=useCookie<Client>("client");
        cookie.value=cookie.value || null;
        return cookie.value;
    }

    static clear():void{
        useCookie("client").value=null;
    }

}