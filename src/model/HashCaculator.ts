import crypto from "crypto"
import { IHashCaculator } from "../interfaces/IHashCaculator"

export class HashCaculator implements IHashCaculator {
    calculateHash(data:string):string{
        return crypto.createHash("sha256").update(data).digest("hex")
    }
}