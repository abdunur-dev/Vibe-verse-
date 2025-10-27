"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import type { SceneObject } from "@/types/room"

interface RoomPreview3DProps {
  objects: SceneObject[]
}

function PreviewObject({ object }: { object: SceneObject }) {
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

  return (
    <mesh position={object.position} rotation={object.rotation} scale={object.scale}>
      {renderGeometry()}
      <meshStandardMaterial color={object.color} metalness={0.3} roughness={0.7} />
    </mesh>
  )
}

export function RoomPreview3D({ objects }: RoomPreview3DProps) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00B4FF" />

        {objects.map((obj) => (
          <PreviewObject key={obj.id} object={obj} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}
