import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { LogIn, Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: (role: "user" | "technician" | "admin") => void
  onSwitchToRegister: () => void
}

export function LoginForm({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists in localStorage (for demo)
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.email === email && userData.password === password) {
          toast({
            title: "Login Successful",
            description: `Welcome back, ${userData.name}!`,
          })
          onLoginSuccess(userData.role)
          return
        }
      }
      
      // Demo credentials for testing
      const demoCredentials = [
        { email: "user@demo.com", password: "123456", role: "user" as const, name: "Demo User" },
        { email: "tech@demo.com", password: "123456", role: "technician" as const, name: "Demo Technician" },
        { email: "admin@demo.com", password: "123456", role: "admin" as const, name: "Demo Admin" }
      ]
      
      const matchedUser = demoCredentials.find(
        cred => cred.email === email && cred.password === password
      )
      
      if (matchedUser) {
        localStorage.setItem('currentUser', JSON.stringify({
          ...matchedUser,
          id: Date.now().toString(),
          phone: "123-456-7890",
          createdAt: new Date().toISOString()
        }))
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${matchedUser.name}!`,
        })
        onLoginSuccess(matchedUser.role)
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive"
        })
      }
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Maintenance System account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary hover:underline font-medium"
              >
                Create one here
              </button>
            </p>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <div>User: user@demo.com / 123456</div>
              <div>Technician: tech@demo.com / 123456</div>
              <div>Admin: admin@demo.com / 123456</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}