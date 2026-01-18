import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  message?: string
  description?: string
}

export function EmptyState({
  message = 'No data available',
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{message}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
