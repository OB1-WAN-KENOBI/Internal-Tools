import { Button } from '@/shared/ui/Button'
import { Label } from '@/shared/ui/Label'
import { Columns } from 'lucide-react'
import { useState } from 'react'
import type { Table } from '@tanstack/react-table'

interface ColumnVisibilityMenuProps<T> {
  table: Table<T>
}

export function ColumnVisibilityMenu<T>({ table }: ColumnVisibilityMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <Columns className="mr-2 h-4 w-4" />
        Columns
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-md border bg-card p-4 shadow-lg z-20">
            <div className="space-y-2">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <div key={column.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="h-4 w-4"
                      id={`column-${column.id}`}
                    />
                    <Label
                      htmlFor={`column-${column.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {column.id}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
