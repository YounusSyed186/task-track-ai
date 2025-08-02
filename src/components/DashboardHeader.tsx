import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DashboardHeaderProps {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const { toast } = useToast()
  
  // Get current user from localStorage
  const getCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem('currentUser')
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  }

  const user = getCurrentUser()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    onLogout()
  }

  if (!user) return null

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.email}
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}