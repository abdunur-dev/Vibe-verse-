"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { Suspense } from "react"

function FloatingShape() {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh castShadow>
        <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#00B4FF"
          emissive="#00B4FF"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00B4FF" />
            <FloatingShape />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 neon-border">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Build Your Digital Universe</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            <span className="neon-text">Create.</span> <span className="text-secondary neon-text">Mint.</span>{" "}
            <span className="text-accent neon-text">Explore.</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 text-pretty max-w-2xl mx-auto leading-relaxed px-4">
            Build immersive 3D rooms, mint them as NFTs, and explore a metaverse of creativity powered by Web3
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg group"
            >
              <Link href="/create">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto neon-border border-2 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold bg-transparent"
            >
              <Link href="/explore">Explore Rooms</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary neon-text mb-1 sm:mb-2">10K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Rooms Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary neon-text mb-1 sm:mb-2">
                5K+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">NFTs Minted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent neon-text mb-1 sm:mb-2">2K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Creators</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
