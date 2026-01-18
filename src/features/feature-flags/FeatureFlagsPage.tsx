import { useFeatureFlags } from './hooks/useFeatureFlags'
import { useFeatureFlagsStore } from './store'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card'
import { Switch } from '@/shared/ui/Switch'
import { Skeleton } from '@/shared/ui/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState'

export function FeatureFlagsPage() {
  const { flags, isLoading, error, toggleFlag } = useFeatureFlags()
  const { toggleFlag: toggleLocalFlag } = useFeatureFlagsStore()

  const handleToggle = (id: string, name: string, currentValue: boolean) => {
    toggleLocalFlag(name)
    toggleFlag({ id, enabled: !currentValue })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message="Failed to load feature flags" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <p className="text-muted-foreground mt-2">
          Manage application features by toggling flags on or off
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {flags.map((flag) => (
          <Card key={flag.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{flag.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {flag.description}
                  </CardDescription>
                </div>
                <Switch
                  checked={flag.enabled}
                  onCheckedChange={() => handleToggle(flag.id, flag.name, flag.enabled)}
                />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Current Feature Flags Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            {flags.map((flag) => (
              <div key={flag.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <code className="font-mono">{flag.name}</code>
                <span className={flag.enabled ? 'text-green-500' : 'text-red-500'}>
                  {flag.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
