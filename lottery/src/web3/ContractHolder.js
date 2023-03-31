import Web3 from'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract/LotteryContract';

function toWei(ether) {
    return 1000000000000000000 * ether;
}

class ContractHolder {
    constructor() {
        this.account = null;
        this.loadAccount = this.loadAccount.bind(this);
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        this.loadAccount = this.loadAccount.bind(this);
        this.createLottery = this.createLottery.bind(this);
    }

    async loadAccount() {
        const accounts = await this.web3.eth.requestAccounts();
        this.account = accounts[0];
    }

    async createLottery(etherAmount) {
        let data = await this.contract.methods.createLottery().send(
            {
                from: this.account,
                value: toWei(etherAmount).toString(),
            }
        )
        return data
    }
}

export const holder = new ContractHolder();