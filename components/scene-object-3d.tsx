"use client"

import { useRef } from "react"
import { TransformControls } from "@react-three/drei"
import type { Mesh } from "three"
import type { SceneObject } from "@/types/room"

interface SceneObject3DProps {
  object: SceneObject
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<SceneObject>) => void
  mode: "move" | "rotate" | "scale"
}

export function SceneObject3D({ object, isSelected, onSelect, onUpdate, mode }: SceneObject3DProps) {
  const meshRef = useRef<Mesh>(null)

  const renderGeometry = () => {
    switch (object.type) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />
      case "cylinder":
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      case "cone":
        return <coneGeometry args={[0.5, 1, 32]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  const handleTransformChange = () => {
    if (meshRef.current) {
      const pos = meshRef.current.position
      const rot = meshRef.current.rotation
      const scale = meshRef.current.scale

      onUpdate({
        position: [pos.x, pos.y, pos.z],
        rotation: [rot.x, rot.y, rot.z],
        scale: [scale.x, scale.y, scale.z],
      })
    }
  }

  return (
    <group>
      {isSelected && (
        <TransformControls
          object={meshRef.current!}
          mode={mode === "move" ? "translate" : mode === "rotate" ? "rotate" : "scale"}
          onObjectChange={handleTransformChange}
        />
      )}
      <mesh
        ref={meshRef}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        castShadow
        receiveShadow
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={object.color}
          emissive={isSelected ? object.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    </group>
  )
}
