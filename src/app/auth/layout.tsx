import AuthProvider from "@/components/auth/AuthProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
