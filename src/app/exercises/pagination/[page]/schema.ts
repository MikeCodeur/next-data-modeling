import {CategoriesEnum} from '@/lib/type'
import z from 'zod'

export const formSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number()).optional(),
  createdAt: z.string(),
  quantity: z.coerce.number(),
  category: z.preprocess((val) => Number(val), z.number()),
  price: z.coerce.number(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
})
export type FormSchemaType = z.infer<typeof formSchema>
