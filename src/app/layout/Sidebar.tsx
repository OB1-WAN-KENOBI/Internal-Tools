import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'
import {
  LayoutDashboard,
  Users,
  Table,
  Flag,
  FileText,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/shared/ui/Button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAuthStore((state) => state.user)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'viewer'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Data Table', href: '/data-table', icon: Table, roles: ['admin', 'manager'] },
    { name: 'Feature Flags', href: '/feature-flags', icon: Flag, roles: ['admin'] },
    { name: 'Audit Log', href: '/audit-log', icon: FileText, roles: ['admin', 'manager'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'manager', 'viewer'] },
  ]

  const filteredNavigation = navigation.filter((item) =>
    user ? item.roles.includes(user.role) : false
  )

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold">Internal Tools</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
