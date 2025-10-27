"use client"

import { useState } from "react"
import { Canvas3DEditor } from "@/components/canvas-3d-editor"
import { ObjectLibrary } from "@/components/object-library"
import { BuilderToolbar } from "@/components/builder-toolbar"
import { BuilderHeader } from "@/components/builder-header"
import type { SceneObject } from "@/types/room"

export function RoomBuilder() {
  const [objects, setObjects] = useState<SceneObject[]>([])
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)
  const [mode, setMode] = useState<"move" | "rotate" | "scale">("move")

  const addObject = (type: string) => {
    const newObject: SceneObject = {
      id: `${type}-${Date.now()}`,
      type,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#00B4FF",
    }
    setObjects([...objects, newObject])
    setSelectedObjectId(newObject.id)
  }

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(objects.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)))
  }

  const deleteObject = (id: string) => {
    setObjects(objects.filter((obj) => obj.id !== id))
    if (selectedObjectId === id) {
      setSelectedObjectId(null)
    }
  }

  const clearScene = () => {
    setObjects([])
    setSelectedObjectId(null)
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <BuilderHeader objects={objects} onClear={clearScene} />

      <div className="flex-1 flex overflow-hidden">
        {/* Object Library Sidebar */}
        <ObjectLibrary onAddObject={addObject} />

        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas3DEditor
            objects={objects}
            selectedObjectId={selectedObjectId}
            onSelectObject={setSelectedObjectId}
            onUpdateObject={updateObject}
            mode={mode}
          />

          {/* Floating Toolbar */}
          <BuilderToolbar
            mode={mode}
            onModeChange={setMode}
            selectedObjectId={selectedObjectId}
            onDeleteSelected={() => selectedObjectId && deleteObject(selectedObjectId)}
          />
        </div>
      </div>
    </div>
  )
}
