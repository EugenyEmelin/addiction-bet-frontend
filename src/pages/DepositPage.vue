<template>
  <div class="w-full bg-white rounded-xl p-8">
    <Deposit />
    <Transactions />
  </div>
</template>
<script setup lang="ts">
import Deposit from '@/components/Deposit.vue'
import Transactions from '@/components/Transactions.vue'
</script>