import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card'
import { LucideIcon } from 'lucide-react'
import { formatNumber, formatCurrency, formatPercent } from '@/shared/utils/format'

interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  type: 'number' | 'currency' | 'percent'
  trend?: number
}

export function MetricCard({ title, value, icon: Icon, type, trend }: MetricCardProps) {
  const formattedValue = 
    type === 'currency' 
      ? formatCurrency(value)
      : type === 'percent'
      ? formatPercent(value)
      : formatNumber(value)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {trend !== undefined && (
          <p className={`text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% from last hour
          </p>
        )}
      </CardContent>
    </Card>
  )
}
