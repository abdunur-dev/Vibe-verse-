import { Cable as Cube, Coins, Compass, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Cube,
    title: "3D Room Builder",
    description:
      "Create stunning 3D spaces with our intuitive drag-and-drop builder. Add furniture, lighting, and custom objects to bring your vision to life.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Coins,
    title: "NFT Minting",
    description:
      "Turn your creations into unique NFTs on the blockchain. Own, trade, and showcase your digital real estate in the metaverse.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Compass,
    title: "Explore & Discover",
    description:
      "Browse thousands of user-created rooms. Get inspired, visit virtual galleries, and connect with creators from around the world.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Web3 Powered",
    description:
      "Built on blockchain technology for true ownership. Your creations are secured, verifiable, and completely under your control.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-text">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to create, own, and explore the metaverse
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-card/50 border-border hover:border-primary/50 transition-all hover:neon-glow group"
              >
                <CardContent className="p-8">
                  <div
                    className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:neon-glow transition-all`}
                  >
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
