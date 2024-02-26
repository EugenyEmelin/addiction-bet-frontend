import { DepositContract, DepositContractABI } from '../config'
import { ethers, Wallet, providers } from 'ethers'
import { Web3, utils as web3Utils } from 'web3'
import { DEFAULT_PROVIDER } from '../constants/resources.const'

export const transactionsUtils = {
    async getDepositContractInstance(contractAddress: string) {
        const web3 = new Web3.providers.WebsocketProvider("wss://eth-mainnet.g.alchemy.com/v2/ScK1WWZHRPgt8xtmGzmaPlCGLjX7VQPp");
        const mnemonicWallet = ethers.Wallet.createRandom()
        console.log(mnemonicWallet, 'mnemonicWallet')
        const signer = new Wallet(mnemonicWallet.privateKey, web3.provider)
        console.log(signer, 'signer')
        return new ethers.Contract(contractAddress, DepositContractABI)
    },

    async depositTokens(amount) {
        console.log(amount, 'amount')
        const amountHex = web3Utils.numberToHex(amount)
        console.log(amountHex, 'amountHex')
        if (!window.ethereum) {
            return new Error('window.ethereum not found')
        }
        const contractInstance = await this.getDepositContractInstance(DepositContract);
        console.log(contractInstance, 'contractInstance')
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts, 'accounts')
        const tx = await contractInstance.populateTransaction.deposit(amountHex)
        console.log(tx, 'tx')


        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: tx.to,
                        data:  tx.data,
                        value: amountHex,
                    },
                ],
            })
            .then((txHash) => {
                console.log("txHash", txHash)
            })
    },
}
