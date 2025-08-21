// Navigation types
export interface NavigationItem {
  name: string
  href: string
  external?: boolean
}

// Form types
export interface ContactForm {
  name: string
  email: string
  message: string
}

// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Component props types
export interface SectionProps {
  className?: string
  children?: React.ReactNode
}
