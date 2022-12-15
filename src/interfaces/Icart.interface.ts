import { IcartItems } from "./IcartItems.interfaces";

export interface Icart {
    userId: number,
    items: IcartItems[]
}