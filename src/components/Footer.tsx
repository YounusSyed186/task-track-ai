import { Palette, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ]

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Collections", href: "#collections" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" }
  ]

  const artCategories = [
    { label: "Digital Art", href: "#" },
    { label: "Photography", href: "#" },
    { label: "Abstract", href: "#" },
    { label: "Contemporary", href: "#" }
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-playfair text-2xl font-bold text-foreground">
                Artffy
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Discover extraordinary art that inspires, challenges, and transforms. 
              Join our community of art enthusiasts and creators.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="transition-smooth hover:shadow-glow hover:border-primary"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <IconComponent className="h-4 w-4" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-playfair text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Art Categories */}
          <div className="space-y-6">
            <h3 className="font-playfair text-lg font-semibold text-foreground">
              Art Categories
            </h3>
            <ul className="space-y-3">
              {artCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href={category.href}
                    className="text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h3 className="font-playfair text-lg font-semibold text-foreground">
              Stay Connected
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest exhibitions and art news.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Your email" 
                className="flex-1"
              />
              <Button className="gradient-primary text-primary-foreground hover:shadow-glow">
                Subscribe
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@artffy.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Art Street, Creative District</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Artffy Gallery. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}