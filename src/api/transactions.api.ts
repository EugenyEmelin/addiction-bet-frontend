import http from './http'

export const TransactionsApi = {
    async deposit(walletAddress: string, amount: number) {
        return http.post('transactions/deposit', {
            json: { walletAddress, amount },
        })
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