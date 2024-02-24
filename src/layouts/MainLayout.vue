<template>
  <header class="navbar fixed flex justify-between items-center min-h-16">
    <div class="logo text-2xl">
      <a href="/" class="font-bold">Addiction Bets</a>
    </div>
    <div class="login flex items-center">
      <div v-if="isConnected" class="mr-2">{{ address }}</div>
      <button
          class="rounded-3xl font-bold"
          :class="{ 'bg-green-700': isConnected, 'bg-red-600': !isConnected }"
          @click="modalHandler"
      >
        Wallet
      </button>
    </div>
  </header>
  <main class="main mt-16">
    <div class="content pt-28">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import {createWeb3Modal, defaultConfig } from '@web3modal/ethers5/vue'
import { useWeb3Modal , useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/vue'
import { ethers } from 'ethers'
import api from '@/api'
import { ref, watch } from 'vue'

const clicked = ref(false)

// 1. Get projectId
const projectId = 'addiction-bets'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'Addiction bets',
  description: 'Addiction bets',
  url: 'http://localhost:5173', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

const web3Modal = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const modal = useWeb3Modal()

const { address, isConnected } = useWeb3ModalAccount()
watch(isConnected, async (value, oldValue) => {
  if (!value) {
    return
  }
  if (clicked.value) {
    await onSignMessage()
  }
}, { immediate: true })

const { walletProvider } = useWeb3ModalProvider()

async function onSignMessage() {
  const provider = new ethers.providers.Web3Provider(walletProvider.value)
  const signer = provider.getSigner()
  const signature = await signer?.signMessage(
      `Addiction wants you to sign in with your Ethereum account: ${address.value}`
  )
  const login = await api.auth.login(signature, address.value)
}

const modalHandler = async () => {
  clicked.value = true
  await modal.open()
}
</script>


<style scoped lang="postcss">
.navbar {
  color: #ffffff;
  padding: 0 15px;
  background-color: rgb(102, 190, 218);
  left: 0;
  right: 0;
  top: 0;

  .login {
    button {
      //background-color: #DD1980;
      color: #ffffff;
      padding: 10px 25px;
    }

  }
}
.main {
  padding: 0 15px;
}
</style>