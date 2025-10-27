"use client"

import { SCROLL_SEPOLIA_CONFIG } from "./config"

export async function connectWallet(): Promise<string | null> {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask or another Web3 wallet!")
    return null
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    // Switch to Scroll Sepolia
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${SCROLL_SEPOLIA_CONFIG.chainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${SCROLL_SEPOLIA_CONFIG.chainId.toString(16)}`,
              chainName: SCROLL_SEPOLIA_CONFIG.chainName,
              nativeCurrency: SCROLL_SEPOLIA_CONFIG.nativeCurrency,
              rpcUrls: SCROLL_SEPOLIA_CONFIG.rpcUrls,
              blockExplorerUrls: SCROLL_SEPOLIA_CONFIG.blockExplorerUrls,
            },
          ],
        })
      } else {
        throw switchError
      }
    }

    return accounts[0]
  } catch (error) {
    console.error("Error connecting wallet:", error)
    return null
  }
}

export async function getConnectedAccount(): Promise<string | null> {
  if (typeof window.ethereum === "undefined") {
    return null
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    })
    return accounts[0] || null
  } catch (error) {
    console.error("Error getting account:", error)
    return null
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
