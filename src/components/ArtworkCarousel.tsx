import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

const artworks = [
  {
    id: 1,
    title: "Celestial Dreams",
    artist: "Maya Chen",
    price: "$2,400",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
    likes: 234,
    views: 1200
  },
  {
    id: 2,
    title: "Urban Symphony",
    artist: "David Rodriguez",
    price: "$1,800",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    likes: 189,
    views: 890
  },
  {
    id: 3,
    title: "Nature's Whisper",
    artist: "Sarah Johnson",
    price: "$3,200",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop",
    likes: 321,
    views: 1500
  },
  {
    id: 4,
    title: "Digital Horizons",
    artist: "Alex Kim",
    price: "$2,900",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=500&fit=crop",
    likes: 276,
    views: 1100
  },
  {
    id: 5,
    title: "Midnight Reflection",
    artist: "Elena Vasquez",
    price: "$2,100",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=500&fit=crop",
    likes: 198,
    views: 750
  },
  {
    id: 6,
    title: "Abstract Emotion",
    artist: "Marcus Thompson",
    price: "$2,700",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=500&fit=crop",
    likes: 245,
    views: 980
  }
]

export function ArtworkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // approximate card width including margin
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="font-playfair">Featured</span>{" "}
            <span className="gradient-primary bg-clip-text text-transparent">Artworks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional pieces from our carefully curated collection of contemporary art
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="hidden sm:block">
            <p className="text-muted-foreground">
              Showing {artworks.length} of {artworks.length} artworks
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="transition-smooth hover:shadow-glow"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="transition-smooth hover:shadow-glow"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="flex-shrink-0 w-80 group cursor-pointer transition-smooth hover:shadow-elegant hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-smooth opacity-0 group-hover:opacity-100">
                    <div className="flex justify-between items-center text-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{artwork.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">{artwork.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">by {artwork.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">{artwork.price}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}