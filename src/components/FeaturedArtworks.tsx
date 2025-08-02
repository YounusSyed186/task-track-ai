import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ExternalLink } from "lucide-react"

const featuredPieces = [
  {
    id: 1,
    title: "Ethereal Moments",
    artist: "Sophia Chen",
    category: "Digital Art",
    price: "$3,500",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&h=400&fit=crop",
    description: "A mesmerizing exploration of time and space through digital manipulation.",
    featured: true
  },
  {
    id: 2,
    title: "Urban Pulse",
    artist: "Marcus Rivera",
    category: "Photography",
    price: "$2,200",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop",
    description: "Capturing the heartbeat of city life in stunning monochromatic tones.",
    featured: false
  },
  {
    id: 3,
    title: "Flowing Harmony",
    artist: "Elena Kowalski",
    category: "Abstract",
    price: "$4,100",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop",
    description: "An abstract masterpiece that evokes movement and emotional depth.",
    featured: true
  },
  {
    id: 4,
    title: "Sacred Geometry",
    artist: "Ahmed Hassan",
    category: "Mixed Media",
    price: "$2,800",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=600&h=400&fit=crop",
    description: "Exploring spiritual connections through mathematical precision and art.",
    featured: false
  },
  {
    id: 5,
    title: "Neon Dreams",
    artist: "Yuki Tanaka",
    category: "Contemporary",
    price: "$3,900",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    description: "A futuristic vision that blends technology with human emotion.",
    featured: true
  },
  {
    id: 6,
    title: "Vintage Reflections",
    artist: "Roberto Silva",
    category: "Classic",
    price: "$5,200",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    description: "A timeless piece that bridges classical techniques with modern themes.",
    featured: false
  }
]

export function FeaturedArtworks() {
  return (
    <section id="collections" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="font-playfair">Featured</span>{" "}
            <span className="gradient-primary bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in our carefully selected masterpieces that represent the finest in contemporary art
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPieces.map((piece) => (
            <Card 
              key={piece.id} 
              className="group cursor-pointer transition-smooth hover:shadow-elegant hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={piece.image}
                    alt={piece.title}
                    className="w-full h-64 object-cover transition-smooth group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  
                  {/* Featured Badge */}
                  {piece.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-smooth">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Bottom Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-smooth">
                    <Button className="w-full gradient-primary text-primary-foreground">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-playfair text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {piece.title}
                      </h3>
                      <p className="text-muted-foreground">by {piece.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {piece.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {piece.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-primary">{piece.price}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="transition-smooth hover:shadow-glow hover:border-primary"
          >
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  )
}