"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { connectWallet, getConnectedAccount } from "@/lib/web3/wallet"

export function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkConnection()

    // Listen for account changes
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })
    }
  }, [])

  async function checkConnection() {
    const connectedAccount = await getConnectedAccount()
    setAccount(connectedAccount)
  }

  async function handleConnect() {
    setIsConnecting(true)
    const connectedAccount = await connectWallet()
    setAccount(connectedAccount)
    setIsConnecting(false)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || !!account}
      className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-lg"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {isConnecting ? "Connecting..." : account ? formatAddress(account) : "Connect Wallet"}
    </Button>
  )
}
