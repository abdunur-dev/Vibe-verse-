"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Box, Cylinder, Share as Sphere, Pyramid, X } from "lucide-react"
import { useState } from "react"

interface ObjectLibraryProps {
  onAddObject: (type: string) => void
}

const objects = [
  { type: "cube", label: "Cube", icon: Box, color: "text-primary" },
  { type: "sphere", label: "Sphere", icon: Sphere, color: "text-secondary" },
  { type: "cylinder", label: "Cylinder", icon: Cylinder, color: "text-accent" },
  { type: "cone", label: "Cone", icon: Pyramid, color: "text-primary" },
]

export function ObjectLibrary({ onAddObject }: ObjectLibraryProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-20 left-4 z-50 md:hidden neon-border bg-card"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Box className="h-5 w-5" />}
      </Button>

      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border mt-16 md:mt-0">
          <h2 className="font-bold text-lg">Objects</h2>
          <p className="text-sm text-muted-foreground">Click to add to scene</p>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-4 space-y-2">
            {objects.map((obj) => {
              const Icon = obj.icon
              return (
                <Button
                  key={obj.type}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-4 hover:neon-border hover:bg-primary/5 bg-transparent"
                  onClick={() => {
                    onAddObject(obj.type)
                    setIsOpen(false) // Close on mobile after adding
                  }}
                >
                  <div className={`p-2 rounded-lg bg-background ${obj.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{obj.label}</span>
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
