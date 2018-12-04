const SHA256 = require('crypto-js/sha256'); //import?

class Block {

    constructor(data, prevHash = '', index = 0){ // Remove index, timestamp
        this.index = index;
        this.data = data;
        this.timestamp = Date.now();
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.index).toString();
    }
    // crypto.createHmac

}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block({ coins: 1000 })
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data){
        const prevHash = this.getLatestBlock().hash;
        this.chain.push(new Block(data, prevHash, this.chain.length));
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if(currentBlock.prevHash !== prevBlock.hash) 
                return false
        }
        return true;
    }
}

let bibi_coin = new Blockchain();
bibi_coin.addBlock({ coins: -20 });
bibi_coin.addBlock({ coins: 50 });
// console.log(JSON.stringify(bibi_coin, null, 4));


console.log(`Is BLOCKCHAIN valid: ${bibi_coin.isChainValid()}`);

console.log('Manipulating BLOCKCHAIN...');
bibi_coin.chain[1].data = { coins: 30};
bibi_coin.chain[1].hash = bibi_coin.chain[1].calculateHash();
console.log(`Is BLOCKCHAIN valid: ${bibi_coin.isChainValid()}`);












/*
try {
  const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
  console.log(hash);
} catch (err) {
  console.log('crypto support is disabled!');
}
*/