import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table'
import { useAuditLog } from './hooks/useAuditLog'
import { Select } from '@/shared/ui/Select'
import { Badge } from '@/shared/ui/Badge'
import { Skeleton } from '@/shared/ui/Skeleton'
import { ErrorState } from '@/shared/ui/ErrorState'
import { formatDateTime } from '@/shared/utils/format'
import type { AuditEvent } from '@/shared/types'

export function AuditLogPage() {
  const { logs, isLoading, error } = useAuditLog()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'timestamp', desc: true }])
  const [userFilter, setUserFilter] = useState<string>('')
  const [actionFilter, setActionFilter] = useState<string>('')

  const columns = useMemo<ColumnDef<AuditEvent>[]>(
    () => [
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: ({ row }) => formatDateTime(row.original.timestamp),
      },
      {
        accessorKey: 'userName',
        header: 'User',
      },
      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
          const action = row.original.action
          const variant =
            action === 'delete'
              ? 'destructive'
              : action === 'create'
              ? 'success'
              : 'default'
          return <Badge variant={variant}>{action}</Badge>
        },
      },
      {
        accessorKey: 'resource',
        header: 'Resource',
      },
      {
        accessorKey: 'details',
        header: 'Details',
      },
    ],
    []
  )

  const filteredData = useMemo(() => {
    return logs.filter((log) => {
      const matchesUser = !userFilter || log.userName === userFilter
      const matchesAction = !actionFilter || log.action === actionFilter
      return matchesUser && matchesAction
    })
  }, [logs, userFilter, actionFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const uniqueUsers = useMemo(() => {
    return Array.from(new Set(logs.map((log) => log.userName)))
  }, [logs])

  const uniqueActions = useMemo(() => {
    return Array.from(new Set(logs.map((log) => log.action)))
  }, [logs])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (error) {
    return <ErrorState message="Failed to load audit logs" />
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Audit Log</h1>

      <div className="flex items-center gap-4">
        <Select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="w-48"
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </Select>
        <Select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="w-48"
        >
          <option value="">All Actions</option>
          {uniqueActions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </Select>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-left font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {logs.length} events
      </div>
    </div>
  )
}
