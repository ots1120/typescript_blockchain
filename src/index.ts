import { Blockchain } from "./model/Blockchain";

const blockchain = new Blockchain();

blockchain.addData("First Data");
blockchain.addData("Second Data");
blockchain.addData("Third Data");

try{
    const block1 = blockchain.createBlock();
    console.log(block1);

    const block2 = blockchain.createBlock();
    console.log(block2);

    const block3 = blockchain.createBlock();
    console.log(block3);

    const isValid = blockchain.isChainValid();
    console.log("블록체인 유효성:", isValid);

    const allBlocks = blockchain.getBlocks();
    console.log("전체 블록:", allBlocks);
    
}catch(error){
    if(error instanceof Error){console.error("에러 발생:", error.message);}
    else{console.error("알 수 없는 에러 발생")}
}
