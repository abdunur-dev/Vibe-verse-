import Link from "next/link"
import { Cable as Cube, Twitter, Github, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Cube className="h-8 w-8 text-primary neon-glow" />
              <span className="text-2xl font-bold neon-text">VibeVerse</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Build immersive 3D rooms, mint them as NFTs, and explore a metaverse of creativity powered by abdu&dev.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com/AbdurhamanNur" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/abddunur-dev" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://discord.com/abdunur_dev" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">Portfolio</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/https://abdudevapp.vercel.app/" className="text-muted-foreground hover:text-primary transition-colors">
                  About Me
                </Link>
              </li>
            </ul>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 VibeVerse. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
