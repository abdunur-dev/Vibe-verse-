import { Navigation } from "@/components/navigation"
import { RoomGallery } from "@/components/room-gallery"
import { Footer } from "@/components/footer"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 neon-text">
              Explore <span className="text-primary">Rooms</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover unique 3D rooms created by the VibeVerse community
            </p>
          </div>

          <RoomGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}
