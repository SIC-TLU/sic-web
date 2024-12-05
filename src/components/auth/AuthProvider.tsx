"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react"

interface AuthProviderType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthProviderType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider')

  return context
}

export default function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [username, setUsername] = useState<string>("")

  const valueContext: AuthProviderType = {
    username,
    setUsername
  }

  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  )
}
