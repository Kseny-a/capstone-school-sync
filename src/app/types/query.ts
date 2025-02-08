import { WhereFilterOp } from "firebase/firestore";
import { OrderByDirection } from "firebase/firestore/lite";

export type CollectionOptions = {
    queries?: QueryOptions[];
    sort?: SortOptions
}

export type QueryOptions = {
    attribute: string
    operator: WhereFilterOp
    value: any
}

export type SortOptions = {
    attribute: string
    order: OrderByDirection
}