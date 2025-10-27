import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 border border-primary/20 neon-border">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 neon-text text-balance">
            Ready to Build Your Digital Universe?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Join thousands of creators building the future of the metaverse. Start creating your first 3D room today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg group"
            >
              <Link href="/create">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="neon-border border-2 px-8 py-6 text-lg font-bold bg-transparent"
            >
              <Link href="/explore">Explore Rooms</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
