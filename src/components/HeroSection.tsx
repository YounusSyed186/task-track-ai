import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-accent/20 blur-xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-artffy-teal/20 blur-lg animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur rounded-full px-4 py-2 mb-8 border border-border/50">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Discover Amazing Artworks
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          <span className="font-playfair">Dive into creativity</span>
          <br />
          <span className="gradient-primary bg-clip-text text-transparent">
            with our gallery collection
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Explore a curated world of extraordinary art pieces from renowned artists and emerging talents. 
          Experience the beauty, emotion, and innovation that defines contemporary creativity.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="gradient-primary text-primary-foreground hover:shadow-glow transition-smooth text-lg px-8 py-4 h-auto"
        >
          Explore Collection
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">500+</div>
            <div className="text-sm text-muted-foreground">Artworks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">100+</div>
            <div className="text-sm text-muted-foreground">Artists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">50k+</div>
            <div className="text-sm text-muted-foreground">Visitors</div>
          </div>
        </div>
      </div>
    </section>
  )
}