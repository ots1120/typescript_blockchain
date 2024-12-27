import { Block } from "./Block";
import { BlockchainError } from "../errors/BlockchainError";

export class Blockchain {
    private readonly blocks:Block[] = [];
    private readonly pendingData: string[] = []; // 메모리 풀과 유사한 개념: 대기 중인 데이터를 저장하는 배열
    
    constructor(){
        const genesisBlock = new Block("0",0,"Genesis Block");
        this.blocks.push(genesisBlock);
    }

    public addData(data: string): void {
        this.pendingData.push(data);
    }

    public createBlock(): Block{
        if(this.pendingData.length === 0){
            throw new BlockchainError("데이터가 없습니다.")
        }
        // pendingData에서 가장 오래된 데이터를 가져와 새 블록을 생성(첫번째 요소 제거 및 반환)
        const data = this.pendingData.shift() || "";
        const newBlock = new Block(
            this.getLastBlock().hash,
            this.blocks.length,
            data
        );
        
        this.blocks.push(newBlock);
        return newBlock;
    }

    private getLastBlock(): Block{
        return this.blocks[this.blocks.length - 1];
    }

    public isChainValid(): boolean{
        for(let i = 1 ; i < this.blocks.length ; i++){
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];

            if(!currentBlock.isValid()) return false;
            if(currentBlock.prevHash !== previousBlock.hash) return false;
    }
    return true;
    }

    public getBlocks(): ReadonlyArray<Block> {
        return this.blocks;
    }
}
