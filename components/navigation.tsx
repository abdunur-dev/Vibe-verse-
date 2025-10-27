"use client"

import Link from "next/link"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Cable as Cube, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Cube className="h-8 w-8 text-primary neon-glow transition-transform group-hover:rotate-12" />
            </div>
            <span className="text-2xl font-bold neon-text">VibeVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/explore" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Explore
            </Link>
            <Link href="/create" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Create
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:block">
            <WalletConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/explore"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/create"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create
            </Link>
            <div className="pt-2">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
