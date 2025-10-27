import { Wallet, Paintbrush, Rocket } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Connect Your Wallet",
    description: "Link your Web3 wallet to get started. We support MetaMask, WalletConnect, and more.",
    color: "text-primary",
  },
  {
    icon: Paintbrush,
    step: "02",
    title: "Build Your Room",
    description: "Use our 3D builder to design your perfect space. Add objects, customize colors, and make it yours.",
    color: "text-secondary",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Mint & Share",
    description: "Mint your creation as an NFT and share it with the world. Start earning from your digital art.",
    color: "text-accent",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-text">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                {/* Step Number */}
                <div className="text-6xl font-bold text-muted/20 mb-4">{step.step}</div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background border-2 border-border mb-6 neon-border relative z-10">
                  <Icon className={`h-10 w-10 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
