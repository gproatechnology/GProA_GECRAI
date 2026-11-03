import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
  user?: { username: string; role: string }
}

export function Layout({ children, user }: LayoutProps) {
  return (
    <div className="gpc-layout">
      <Navbar user={user} />
      <main className="gpc-layout-main">{children}</main>
    </div>
  )
}
