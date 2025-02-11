import { WhereFilterOp } from "firebase/firestore";

export type QueryOptions = {
    attribute: string
    operator: WhereFilterOp
    value: any
}