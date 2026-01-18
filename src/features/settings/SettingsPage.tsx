import { useState } from 'react'
import { useAuthStore } from '@/features/auth/store'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card'
import { Label } from '@/shared/ui/Label'
import { Switch } from '@/shared/ui/Switch'
import { Select } from '@/shared/ui/Select'
import { Badge } from '@/shared/ui/Badge'
import { User, Bell, Palette } from 'lucide-react'
import toast from 'react-hot-toast'

export function SettingsPage() {
  const user = useAuthStore((state) => state.user)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [timezone, setTimezone] = useState('UTC')
  const [emailAlerts, setEmailAlerts] = useState(true)

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark')
    toast.success(`Theme changed to ${value}`)
  }

  const handleTimezoneChange = (value: string) => {
    setTimezone(value)
    toast.success(`Timezone changed to ${value}`)
  }

  const handleEmailAlertsChange = (checked: boolean) => {
    setEmailAlerts(checked)
    toast.success(`Email alerts ${checked ? 'enabled' : 'disabled'}`)
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Role</Label>
              <div className="mt-1">
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <div className="mt-1">
                <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Preferences</CardTitle>
          </div>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              id="theme"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              id="timezone"
              value={timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <Switch
              checked={emailAlerts}
              onCheckedChange={handleEmailAlertsChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
