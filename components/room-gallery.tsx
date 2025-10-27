"use client"

import { useEffect, useState } from "react"
import { RoomCard } from "@/components/room-card"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from "lucide-react"
import { getConnectedAccount } from "@/lib/web3/wallet"
import { getAllRooms } from "@/lib/web3/contract"
import type { Room } from "@/types/room"

export function RoomGallery() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null)

  useEffect(() => {
    loadRooms()
    checkConnection()
  }, [])

  const checkConnection = async () => {
    const account = await getConnectedAccount()
    setConnectedAccount(account)
  }

  const loadRooms = async () => {
    setLoading(true)
    setError(null)

    try {
      const fetchedRooms = await getAllRooms()
      setRooms(fetchedRooms)
    } catch (err) {
      console.error("[v0] Error loading rooms:", err)
      setError("Failed to load rooms. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading rooms from blockchain...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-6 max-w-md text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadRooms} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <div className="rounded-full bg-primary/10 p-6">
          <Wallet className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">No Rooms Yet</h3>
          <p className="text-muted-foreground max-w-md">
            Be the first to create and mint a room in the VibeVerse metaverse!
          </p>
        </div>
        <Button asChild size="lg" className="neon-border">
          <a href="/create">Create Your Room</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {rooms.length} {rooms.length === 1 ? "room" : "rooms"} found
        </p>
        <Button onClick={loadRooms} variant="outline" size="sm" className="bg-transparent">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} isOwner={connectedAccount === room.creatorAddress} />
        ))}
      </div>
    </div>
  )
}
