"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import { SceneObject3D } from "@/components/scene-object-3d"
import type { SceneObject } from "@/types/room"

interface Canvas3DEditorProps {
  objects: SceneObject[]
  selectedObjectId: string | null
  onSelectObject: (id: string | null) => void
  onUpdateObject: (id: string, updates: Partial<SceneObject>) => void
  mode: "move" | "rotate" | "scale"
}

export function Canvas3DEditor({
  objects,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  mode,
}: Canvas3DEditorProps) {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} color="#00B4FF" />

        {/* Grid */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#00B4FF"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#FF3278"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />

        {/* Scene Objects */}
        {objects.map((obj) => (
          <SceneObject3D
            key={obj.id}
            object={obj}
            isSelected={obj.id === selectedObjectId}
            onSelect={() => onSelectObject(obj.id)}
            onUpdate={(updates) => onUpdateObject(obj.id, updates)}
            mode={mode}
          />
        ))}

        {/* Controls */}
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Suspense>
    </Canvas>
  )
}
