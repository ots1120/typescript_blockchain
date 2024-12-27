import { BlockShape } from "../interfaces/BlockShape"
import { IHashCaculator } from "../interfaces/IHashCaculator";

export class Block implements BlockShape {
    public readonly hash:string;
    public readonly timestamp:number;

    constructor(
        private readonly hashCaculator:IHashCaculator,
        public readonly prevHash:string,
        public readonly height:number,
        public readonly data:string
    ) {
        this.timestamp = Date.now();
        this.hash = this.calculateHash();
    }

    private calculateHash():string{
        const toHash = `${this.prevHash}${this.height}${this.data}${this.timestamp}`
        return this.hashCaculator.calculateHash(toHash) // 분리된 해시 계산 로직
    }

    // 블록 유효성 검증
    public isValid():boolean{
        return this.hash == this.calculateHash()
    }
}