export type Post = {
  id?: string
  title: string
}
/**
 * @deprecated Use type genereted by Drizzle Insted.
 */
export type Product = {
  id: string
  title: string
  price?: number
  description?: string
  image?: string
  category?: CategoriesEnum
  quantity?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * @deprecated Use type genereted by Drizzle Insted.
 */
export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt?: Date
  updatedAt?: Date
}
export enum RoleEnum {
  USER = 'USER',
  GUEST = 'GUEST ',
  REDACTOR = 'REDACTOR',
  MODERATOR = 'MODERATOR ',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export type User = {
  id: string
  email: string
  password: string
  name?: string
  role: RoleEnum
}
export type AddUser = Partial<Pick<User, 'id'>> & Omit<User, 'id'>
/**
 * @deprecated Use type genereted by Drizzle Insted.
 */
export type AddTodo = Partial<Pick<Todo, 'id'>> & Omit<Todo, 'id'>
export enum CategoriesEnum {
  default = 'default',
  lighting = 'lighting',
  furniture = 'furniture',
  bags = 'bags',
}
export type Session = {
  sessionId: string
  userId: string
  expiresAt: string
}
