import { User, Project, Task, Role } from '@prisma/client'

export const canEditProject = (user: User, project: Project): boolean => {
  if (!user.isActive) return false
  if (user.role === 'ADMIN') return true
  return user.department === project.department && user.clearance >= 3
}

export const canViewTask = (user: User, task: Task, project: Project & { users: User[] }): boolean => {
  if (!user.isActive) return false
  if (user.role === 'ADMIN') return true
  if (task.isSensitive && user.clearance < 4) return false
  return project.users.some((u: User) => u.id === user.id)
}

export const canAssignTask = (user: User, assignee: User): boolean => {
  if (!user.isActive) return false
  if (user.role === 'ADMIN') return true
  return user.role === 'MANAGER' && user.department === assignee.department
}

export const canViewBudget = (user: User, project: Project): boolean => {
  if (!user.isActive) return false
  return user.role === 'ADMIN' || user.clearance >= 5 || user.department === 'Finance'
}

export const isUserAdmin = (user: User): boolean => {
  return user.role === Role.ADMIN;
}