<template>
  <div class="transactions-header mt-5 pb-5 text-center">Transactions</div>
  <table class="transactions-table min-w-full table-fixed divide-y divide-slate-200 text-left">
    <thead>
      <tr>
        <th class="th">Type</th>
        <th class="th">Hash</th>
        <th class="th">Coin</th>
        <th class="th">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.hash">
        <td>{{ transaction.type }}</td>
        <td>{{ transaction.hash }}</td>
        <td>{{ transaction.coin }}</td>
        <td>{{ transaction.amount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { Transaction } from '@/interfaces/transaction.interface'

const props = defineProps({
  transactions: {
    type: Array as PropType<Transaction[]>,
    default: () => [
      { type: 'withdraw', hash: 'hg6f86sd8f6sd87f8sdf9ci4', coin: 'ETH', amount: 4 },
      { type: 'deposit', hash: '3g6f86d8f6ew87f8sr32r2ci4', coin: 'ADD', amount: 3 },
    ],
  }
})
</script>

<style scoped lang="postcss">
.transactions-header, .transactions-table {
  color: #DD1980;
}
.transactions-header {
  border-bottom: 2px dashed rgb(102, 190, 218);
  @apply font-semibold;
}
.transactions-table {
  .th {
    @apply py-3 font-sans text-xs uppercase font-semibold;
  }
}
</style>