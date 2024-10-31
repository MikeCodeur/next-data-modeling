'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, {useActionState} from 'react'

import {getCategories, onSubmitAction} from './actions'
import {toast} from 'sonner'
import {FormSchemaType, formSchema} from './schema'
import {Product} from '@/db/schema/products'
import {Category} from '@/db/schema/categories'

export default function ProductForm({product}: {product?: Product}) {
  const [state, formAction] = useActionState(onSubmitAction, {})

  const [isPending, setIsPending] = React.useState(false)
  const [categories, setCategories] = React.useState<Category[]>([])

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 0,
      category: product?.category ?? 0,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    },
  })
  if (Object.keys(form.formState.errors).length > 0) {
    console.log('form.formState.errors', form.formState.errors)
  }

  React.useEffect(() => {
    if (state.success === true) {
      toast.success('Product saved')
      form.reset({
        id: undefined,
        createdAt: new Date().toISOString(),
        quantity: 10,
        category: undefined,
        title: '',
        description: '',
        price: 0,
      })
    } else if (state.success === false) {
      //set rhf errors form the server errors
      for (const error of state?.errors ?? []) {
        form.setError(error.field, {type: 'manual', message: error.message})
      }

      toast.error(state.message ?? 'Error')
    }
    setIsPending(false)
  }, [state.success])

  React.useEffect(() => {
    form.reset({
      id: product?.id,
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category:
        (product?.category as unknown as Category)?.id ?? categories[0]?.id,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
  }, [form, product]) //

  React.useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories()
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  const handleSubmitAction = async (prod: FormSchemaType) => {
    setIsPending(true)
    const formData = new FormData()
    for (const [key, value] of Object.entries(prod)) {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob)
      }
    }
    formAction(formData)
  }
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(handleSubmitAction)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product title</FormLabel>
              <FormControl>
                <Input placeholder="ex : Iphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="199" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={`${field.value}`}
                value={`${field.value}`}
              >
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={'' + category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product quantity"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Buttons isSubmitting={isPending} />
        </div>
      </form>
    </Form>
  )
}
const Buttons = ({isSubmitting}: {isSubmitting: boolean}) => {
  //const status = useFormStatus()

  return (
    <>
      <Button size="sm" type="submit" disabled={isSubmitting}>
        Save
      </Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}
