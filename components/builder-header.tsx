"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cable as Cube, Save, Download, Trash2, ArrowLeft, Sparkles, Menu } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { MintRoomDialog } from "@/components/mint-room-dialog"
import type { SceneObject } from "@/types/room"

interface BuilderHeaderProps {
  objects: SceneObject[]
  onClear: () => void
}

export function BuilderHeader({ objects, onClear }: BuilderHeaderProps) {
  const { toast } = useToast()
  const [mintDialogOpen, setMintDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSave = () => {
    localStorage.setItem("vibeverse-room", JSON.stringify(objects))
    toast({
      title: "Room Saved",
      description: "Your room has been saved locally.",
    })
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(objects, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "vibeverse-room.json"
    link.click()
    toast({
      title: "Room Exported",
      description: "Your room data has been downloaded.",
    })
  }

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Cube className="h-5 w-5 sm:h-6 sm:w-6 text-primary neon-glow" />
            <span className="text-base sm:text-xl font-bold neon-text">Room Builder</span>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setMintDialogOpen(true)}
            className="gap-2 neon-border"
            disabled={objects.length === 0}
          >
            <Sparkles className="h-4 w-4" />
            Mint NFT
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave} className="gap-2 bg-transparent">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="gap-2 text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setMintDialogOpen(true)}
            className="neon-border h-9"
            disabled={objects.length === 0}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleSave()
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start gap-2 bg-transparent"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleExport()
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClear()
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      )}

      <MintRoomDialog open={mintDialogOpen} onOpenChange={setMintDialogOpen} objects={objects} />
    </>
  )
}
