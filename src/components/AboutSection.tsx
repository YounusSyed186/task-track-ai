import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Calendar, MapPin } from "lucide-react"

export function AboutSection() {
  const stats = [
    { icon: Users, value: "15+", label: "Years of Excellence" },
    { icon: Award, value: "500+", label: "Art Pieces" },
    { icon: Calendar, value: "100+", label: "Exhibitions" },
    { icon: MapPin, value: "3", label: "Gallery Locations" }
  ]

  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                <span className="font-playfair">About the</span>{" "}
                <span className="gradient-primary bg-clip-text text-transparent">Gallery</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Artffy, where creativity meets innovation. For over a decade, we've been 
                  dedicated to showcasing exceptional contemporary art that challenges perspectives 
                  and inspires meaningful conversations.
                </p>
                <p>
                  Our mission is to bridge the gap between artists and art enthusiasts, creating 
                  a vibrant community that celebrates artistic expression in all its forms. From 
                  emerging talents to established masters, we curate exhibitions that reflect 
                  the dynamic landscape of modern creativity.
                </p>
                <p>
                  Each piece in our collection tells a unique story, inviting visitors to embark 
                  on a journey of discovery and emotional connection through the transformative 
                  power of art.
                </p>
              </div>
              <div className="pt-6">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="transition-smooth hover:shadow-glow hover:border-primary"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card 
                  key={index} 
                  className="text-center p-6 transition-smooth hover:shadow-elegant hover:-translate-y-1"
                >
                  <CardContent className="space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground font-playfair">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="text-center max-w-4xl mx-auto">
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground italic font-playfair leading-relaxed">
              "Art is not what you see, but what you make others see. At Artffy, we create 
              spaces where imagination flourishes and artistic vision comes to life."
            </blockquote>
            <cite className="block mt-6 text-muted-foreground">
              — Isabella Martinez, Gallery Director
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}