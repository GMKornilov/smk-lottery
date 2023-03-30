import Web3 from'web3';

class ContractHolder {
    constructor() {
        this.account = null;
    }

    async loadAccount() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const accounts = await web3.eth.requestAccounts();
        this.account = accounts[0];
    }
}

let holder = new ContractHolder(); 
export default holder;