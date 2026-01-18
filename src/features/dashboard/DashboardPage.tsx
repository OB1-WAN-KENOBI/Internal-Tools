import { useRealtimeMetrics } from './hooks/useRealtimeMetrics'
import { MetricCard } from './components/MetricCard'
import { MetricsChart } from './components/MetricsChart'
import { Skeleton } from '@/shared/ui/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Users, Activity, AlertCircle, DollarSign } from 'lucide-react'

export function DashboardPage() {
  const { metrics, history, isLoading, error } = useRealtimeMetrics()

  if (error) {
    return <ErrorState message={error} />
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (!metrics) {
    return <ErrorState message="No metrics available" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          icon={Users}
          type="number"
        />
        <MetricCard
          title="Events per Minute"
          value={metrics.eventsPerMinute}
          icon={Activity}
          type="number"
        />
        <MetricCard
          title="Error Rate"
          value={metrics.errorRate}
          icon={AlertCircle}
          type="percent"
        />
        <MetricCard
          title="Revenue"
          value={metrics.revenue}
          icon={DollarSign}
          type="currency"
        />
      </div>

      {history.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <MetricsChart
            data={history}
            type="line"
            title="Events Over Time"
            dataKey="eventsPerMinute"
          />
          <MetricsChart
            data={history}
            type="bar"
            title="Error Rate"
            dataKey="errorRate"
          />
        </div>
      )}
    </div>
  )
}
