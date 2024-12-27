import crypto from "crypto"
import { BlockShape } from "../interfaces/BlockShape"

export class Block implements BlockShape {
    public readonly hash:string;
    public readonly timestamp:number;

    constructor(
        public readonly prevHash:string,
        public readonly height:number,
        public readonly data:string
    ) {
        this.timestamp = Date.now();
        this.hash = this.calculateHash();
    }

    private calculateHash():string{
        const toHash = `${this.prevHash}${this.height}${this.data}${this.timestamp}`
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }

    // 블록 유효성 검증
    public isValid():boolean{
        return this.hash == this.calculateHash()
    }
}