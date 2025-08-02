import { useState, useEffect } from "react"
import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"

interface AuthWrapperProps {
  onAuthSuccess: (role: "user" | "technician" | "admin") => void
}

export function AuthWrapper({ onAuthSuccess }: AuthWrapperProps) {
  const [isLogin, setIsLogin] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.role) {
          onAuthSuccess(userData.role)
        }
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('currentUser')
      }
    }
  }, [onAuthSuccess])

  const handleAuthSuccess = (role: "user" | "technician" | "admin") => {
    onAuthSuccess(role)
  }

  const handleSwitchToRegister = () => {
    setIsLogin(false)
  }

  const handleSwitchToLogin = () => {
    setIsLogin(true)
  }

  if (isLogin) {
    return (
      <LoginForm 
        onLoginSuccess={handleAuthSuccess}
        onSwitchToRegister={handleSwitchToRegister}
      />
    )
  }

  return (
    <RegisterForm 
      onRegisterSuccess={handleAuthSuccess}
    />
  )
}