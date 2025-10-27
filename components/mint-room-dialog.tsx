"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ExternalLink, CheckCircle2, XCircle } from "lucide-react"
import { mintRoomNFT, type RoomData } from "@/lib/web3/contract"
import { SCROLL_SEPOLIA_CONFIG } from "@/lib/web3/config"
import type { SceneObject } from "@/types/room"

interface MintRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  objects: SceneObject[]
}

export function MintRoomDialog({ open, onOpenChange, objects }: MintRoomDialogProps) {
  const [roomName, setRoomName] = useState("")
  const [colorTheme, setColorTheme] = useState("cyberpunk")
  const [lightingIntensity, setLightingIntensity] = useState(5)
  const [status, setStatus] = useState<"idle" | "minting" | "success" | "error">("idle")
  const [txHash, setTxHash] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleMint = async () => {
    if (!roomName.trim()) {
      setErrorMessage("Please enter a room name")
      return
    }

    if (objects.length === 0) {
      setErrorMessage("Please add at least one object to your room")
      return
    }

    setStatus("minting")
    setErrorMessage("")

    const roomData: RoomData = {
      roomName: roomName.trim(),
      colorTheme,
      lightingIntensity,
      objects: objects.map((obj) => obj.type),
    }

    const hash = await mintRoomNFT(roomData)

    if (hash) {
      setStatus("success")
      setTxHash(hash)
    } else {
      setStatus("error")
      setErrorMessage("Failed to mint NFT. Please try again.")
    }
  }

  const handleClose = () => {
    setStatus("idle")
    setTxHash(null)
    setErrorMessage("")
    setRoomName("")
    setColorTheme("cyberpunk")
    setLightingIntensity(5)
    onOpenChange(false)
  }

  const getBlockExplorerUrl = (hash: string) => {
    return `${SCROLL_SEPOLIA_CONFIG.blockExplorerUrls[0]}/tx/${hash}`
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="neon-text text-lg sm:text-xl">Mint Your Room as NFT</DialogTitle>
          <DialogDescription className="text-sm">
            Create a unique NFT of your 3D room on Scroll Sepolia testnet
          </DialogDescription>
        </DialogHeader>

        {status === "idle" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="room-name" className="text-sm">
                Room Name
              </Label>
              <Input
                id="room-name"
                placeholder="My Awesome Room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-theme" className="text-sm">
                Color Theme
              </Label>
              <Select value={colorTheme} onValueChange={setColorTheme}>
                <SelectTrigger id="color-theme" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                  <SelectItem value="pastel">Pastel</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lighting" className="text-sm">
                Lighting Intensity (1-10)
              </Label>
              <Input
                id="lighting"
                type="number"
                min="1"
                max="10"
                value={lightingIntensity}
                onChange={(e) => setLightingIntensity(Number(e.target.value))}
                className="bg-background"
              />
            </div>

            <div className="rounded-lg bg-muted p-3 space-y-1">
              <p className="text-sm font-medium">Room Details</p>
              <p className="text-xs text-muted-foreground">Objects: {objects.length}</p>
              <p className="text-xs text-muted-foreground">
                Types: {Array.from(new Set(objects.map((o) => o.type))).join(", ")}
              </p>
            </div>

            {errorMessage && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            )}

            <Button onClick={handleMint} className="w-full neon-border" size="lg">
              Mint NFT
            </Button>
          </div>
        )}

        {status === "minting" && (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center space-y-2 px-4">
              <p className="font-medium">Minting your room NFT...</p>
              <p className="text-sm text-muted-foreground">Please confirm the transaction in your wallet</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="py-8 flex flex-col items-center justify-center gap-4 px-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div className="text-center space-y-2">
              <p className="font-medium text-lg">NFT Minted Successfully!</p>
              <p className="text-sm text-muted-foreground">Your room has been minted as an NFT</p>
            </div>
            {txHash && (
              <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                <a href={getBlockExplorerUrl(txHash)} target="_blank" rel="noopener noreferrer">
                  View on Explorer
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button onClick={handleClose} className="w-full mt-4">
              Close
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="py-8 flex flex-col items-center justify-center gap-4 px-4">
            <XCircle className="h-12 w-12 text-destructive" />
            <div className="text-center space-y-2">
              <p className="font-medium text-lg">Minting Failed</p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
            </div>
            <Button onClick={() => setStatus("idle")} className="w-full mt-4">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
