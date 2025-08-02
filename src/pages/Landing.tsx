import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ArtworkCarousel } from "@/components/ArtworkCarousel"
import { AboutSection } from "@/components/AboutSection"
import { FeaturedArtworks } from "@/components/FeaturedArtworks"
import { Footer } from "@/components/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ArtworkCarousel />
        <AboutSection />
        <FeaturedArtworks />
      </main>
      <Footer />
    </div>
  )
}