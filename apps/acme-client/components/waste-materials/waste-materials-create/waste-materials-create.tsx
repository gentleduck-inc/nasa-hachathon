'use client'

import { Button } from '@acme/ui/button'
import { Input } from '@acme/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@acme/ui/react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@acme/ui/select'
import { Textarea } from '@acme/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createWasteMaterialSchema } from '~/server/waste_materials/waste_materials.dto'
import { useWasteMaterialsMutations } from './waste-materials-create.hooks'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@acme/ui/sheet'
import React from 'react'

// Example categories enum
const WASTE_ENUM = ['plastics', 'metals', 'glass', 'paper', 'organic'] as const

export type WasteMaterialForm = z.infer<typeof createWasteMaterialSchema>

export function WasteMaterialsCreate({
  children,
  defaultValues,
  id,
}: {
  children: React.ReactNode
  defaultValues?: WasteMaterialForm
  id: string
}) {
  const { createMutation, updateMutation, router } = useWasteMaterialsMutations()

  const form = useForm<WasteMaterialForm>({
    defaultValues: defaultValues ?? {
      category: 'plastics',
      composition: {},
      density_kg_per_m3: 1,
      description: 'This is a description for the waste material.',
      name: 'Plastic',
      properties: {},
    },
    resolver: zodResolver(createWasteMaterialSchema),
  })

  async function handleSubmit(values: WasteMaterialForm) {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id: id, payload: values })
      } else {
        await createMutation.mutateAsync(values)
      }
      form.reset()
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <SheetTitle>{defaultValues ? 'Update' : 'Create'} Waste Materials</SheetTitle>
              <SheetDescription>
                Keep an updated list of waste materials to streamline recycling and disposal.
              </SheetDescription>
            </div>
          </div>

          <Form {...form}>
            <form className="flex h-full flex-col" onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Scrollable form content */}
              <div className="flex-1 space-y-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter material name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger type="button">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WASTE_ENUM.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Density */}
                <FormField
                  control={form.control}
                  name="density_kg_per_m3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Density (kg/m³)</FormLabel>
                      <FormControl>
                        <Input step="0.01" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sticky bottom-0 bg-background border-t pt-4 flex justify-end">
                <Button
                  size="lg"
                  type="submit"
                  disabled={!form.formState.isValid || form.formState.isSubmitting || !form.formState.isDirty}>
                  {defaultValues ? 'Update' : 'Create'} Material
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
