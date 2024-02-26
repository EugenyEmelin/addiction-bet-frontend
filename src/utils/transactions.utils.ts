import { DepositContract, DepositContractABI } from '../config'
import { ethers, Wallet, providers } from 'ethers'
import { Web3 } from 'web3'
import { DEFAULT_PROVIDER } from '../constants/resources.const'

export const transactionsUtils = {
    async getDepositContractInstance(contractAddress: string) {
        const provider = new providers.WebSocketProvider("ws://localhost:8545");
        const mnemonicWallet = ethers.Wallet.createRandom()
        console.log(mnemonicWallet, 'mnemonicWallet')
        const signer = new Wallet(mnemonicWallet.privateKey, provider)
        console.log(signer, 'signer')
        return new ethers.Contract(contractAddress, DepositContractABI)
    },

    async depositTokens(amount) {
        if (!window.ethereum) {
            return new Error('window.ethereum not found')
        }
        const contractInstance = await this.getDepositContractInstance(DepositContract);
        console.log(contractInstance, 'contractInstance')
        const tx = await contractInstance.depositToken(amount)
        console.log(tx, 'tx')

        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts, 'accounts')

        window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: tx.to,
                        data:  tx.data,
                        value: "0x0"
                    },
                ],
            })
            .then((txHash) => {
                console.log("txHash", txHash)
            })
    },
}
