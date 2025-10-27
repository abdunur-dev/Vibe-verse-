"use client"

import { Button } from "@/components/ui/button"
import { Move, RotateCw, Maximize2, Trash2 } from "lucide-react"

interface BuilderToolbarProps {
  mode: "move" | "rotate" | "scale"
  onModeChange: (mode: "move" | "rotate" | "scale") => void
  selectedObjectId: string | null
  onDeleteSelected: () => void
}

export function BuilderToolbar({ mode, onModeChange, selectedObjectId, onDeleteSelected }: BuilderToolbarProps) {
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 flex items-center justify-center gap-2 bg-card/90 backdrop-blur-xl border border-border rounded-full px-3 sm:px-4 py-2 neon-border">
      <Button
        variant={mode === "move" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("move")}
        className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
      >
        <Move className="h-4 w-4" />
      </Button>
      <Button
        variant={mode === "rotate" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("rotate")}
        className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
      >
        <RotateCw className="h-4 w-4" />
      </Button>
      <Button
        variant={mode === "scale" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("scale")}
        className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1 sm:mx-2" />

      <Button
        variant="ghost"
        size="icon"
        onClick={onDeleteSelected}
        disabled={!selectedObjectId}
        className="rounded-full text-destructive hover:text-destructive h-9 w-9 sm:h-10 sm:w-10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
