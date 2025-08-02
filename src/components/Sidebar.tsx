import { useState } from "react"
import { User, Wrench, Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Role = "user" | "technician" | "admin"

interface SidebarProps {
  currentRole: Role
  onRoleChange: (role: Role) => void
}

const roleConfig = {
  user: {
    label: "User Portal",
    icon: User,
    description: "Report issues"
  },
  technician: {
    label: "Technician",
    icon: Wrench,
    description: "Manage tasks"
  },
  admin: {
    label: "Admin Panel",
    icon: Shield,
    description: "System overview"
  }
}

export function Sidebar({ currentRole, onRoleChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border transition-transform z-50 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-foreground mb-8">
            Maintenance System
          </h1>
          
          <nav className="space-y-2">
            {Object.entries(roleConfig).map(([role, config]) => {
              const Icon = config.icon
              const isActive = currentRole === role
              
              return (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role as Role)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{config.label}</div>
                    <div className="text-xs opacity-75">{config.description}</div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}