<template>
  <div class="deposit-container min-w-full rounded-md p-4 flex justify-center">
    <div class="deposit-actions">
      <div class="flex mt-2 justify-between">
        <button
            @click="activeAction = 'deposit'"
            class="actions-button mr-2"
            :class="{ active: activeAction === 'deposit' }"
        >
          DEPOSIT
        </button>
        <button
            @click="activeAction = 'withdraw'"
            class="actions-button"
            :class="{ active: activeAction === 'withdraw' }"
        >
          WITHDRAW
        </button>
      </div>
      <div class="flex mt-2 justify-between">
        <select class="actions-input mr-2" v-model="coin">
          <option value="eth" label="ETH"></option>
          <option value="add" label="ADD"></option>
        </select>
        <input
            v-model="amount"
            type="number"
            min="0"
            step="0.001"
            class="actions-input"
            placeholder="0.002"
        />
      </div>
      <div class="flex mt-2">
        <button @click="handleConfirm" class="actions-button" :class="{ active: amount }">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'
import { useWeb3ModalAccount } from '@web3modal/ethers5/vue'

const activeAction = ref<'deposit' | 'withdraw'>('deposit')
const coin = ref<'eth' | 'add'>('eth')
const amount = ref<number | null>(null)

const handleConfirm = async () => {
  if (!amount.value) {
    return
  }
  const { address } = useWeb3ModalAccount()

  if (activeAction.value === 'deposit') {
    const response = await api.transactions.deposit(amount.value)
    console.log(response, 'response deposit')
  }

  if (activeAction.value === 'withdraw') {
    const response = await api.transactions.withdraw(address.value, amount.value)
    console.log(response, 'response withdraw')
  }
}

</script>

<style scoped lang="postcss">
.deposit-container {
  background-color: #eeb8da73;
  .deposit-actions {
    width: 390px;
    .actions-button {
      background-color: rgba(102, 190, 218, .15);
      color: rgb(102, 190, 218);
      @apply rounded w-full font-bold p-2;
      &.active {
        background-color: rgb(102, 190, 218);
        @apply text-white font-bold p-2;
      }
    }
    .actions-input {
      @apply rounded w-full p-2 text-right;
    }
  }

}
</style>