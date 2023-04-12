import {
    ExclamationTriangleIcon,
    ShieldExclamationIcon,
    ShieldCheckIcon,
  } from "@heroicons/vue/20/solid";

export enum ButtonColor{
    default="bg-blue-800",
    edit="bg-yellow-600",
    cancel="bg-gray-600",
    delete="bg-red-600",
    transparent="bg-black/40",
    alter="bg-gradient-to-r from-black to-blue-900 shadow-md shadow-black"
}

export type MsgType={
    color:string,
    icon:any
}

export type BtnType="button"|"submit"|"reset"|undefined;


export const MessageTypes={
    default:{
        color:"bg-gray-600",
        icon:ExclamationTriangleIcon,
    },
    success:{
        color:"bg-green-600",
        icon:ShieldCheckIcon
    },
    error:{
        color:"bg-red-600",
        icon:ShieldExclamationIcon
    }
}