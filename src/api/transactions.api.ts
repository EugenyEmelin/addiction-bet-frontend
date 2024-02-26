import http from './http'
import utils from '../utils'

export const TransactionsApi = {
    async deposit(amount: number) {
        const result = await utils.transactions.depositTokens(amount)
        console.log(result, 'result')
    },

    async withdraw(walletAddress: string, amount: number) {
        const response = await http.post('transactions/withdraw', {
            json: { walletAddress, amount },
        })
        const responseJson = await response.json()
        console.log(response, 'withdraw')
    },

    async transactionsList() {
        const response = await http.get('transactions')
        console.log(response, 'transactionsList')
    }
}