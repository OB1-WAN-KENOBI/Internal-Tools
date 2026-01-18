import { useState, useEffect } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { Select } from '@/shared/ui/Select'
import type { User, Role, UserStatus } from '@/shared/types'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSubmit: (id: string, data: Partial<User>) => void
}

export function EditUserModal({ isOpen, onClose, user, onSubmit }: EditUserModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('viewer')
  const [status, setStatus] = useState<UserStatus>('active')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
      setStatus(user.status)
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      onSubmit(user.id, { name, email, role, status })
      onClose()
    }
  }

  if (!user) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Name</Label>
          <Input
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-email">Email</Label>
          <Input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-role">Role</Label>
          <Select
            id="edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-status">Status</Label>
          <Select
            id="edit-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
          >
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}
