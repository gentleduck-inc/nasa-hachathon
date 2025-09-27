'use client'

import { WASTE_ENUM } from '@acme/acme-db/constants'
import { Button } from '@acme/ui/button'
import { Calendar } from '@acme/ui/calendar'
import { Input } from '@acme/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@acme/ui/popover'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@acme/ui/react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@acme/ui/select'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@acme/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@acme/ui/alert-dialog'
import { Textarea } from '@acme/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar1, ChevronDownIcon, PlusIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createWasteInventorySchema } from '~/server/waste_inventory/waste_inventory.dto'
import { useWasteInventoryMutations } from './waste-inventory-create.hooks'

const QUALITY_GRADES = ['pristine', 'standard', 'degraded'] as const

export type WasteMaterialForm = z.infer<typeof createWasteInventorySchema>

/**
 * Utility: parse a JS-style object string like:
 * {
 *   foo: 'bar',
 *   n: 2,
 *   nested: { x: true }
 * }
 *
 * NOTE: uses new Function — only use with trusted users/contexts.
 */
function parseObject(input: string): Record<string, any> | null {
  try {
    const fn = new Function(`return (${input})`)
    return fn()
  } catch {
    return null
  }
}

export function WasteInventoryCreate({
  children,
  defaultValues,
  id,
}: {
  children: React.ReactNode
  defaultValues?: WasteMaterialForm
  id: string
}) {
  const { createMutation, updateMutation } = useWasteInventoryMutations()
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)

  // track whether properties textarea has local edits (dirty) not yet reflected in react-hook-form
  const [propertiesDirty, setPropertiesDirty] = React.useState(false)

  const form = useForm<WasteMaterialForm>({
    defaultValues: defaultValues ?? {
      contamination_level: 0,
      date_collected: new Date().toISOString(),
      expiry_date: new Date().toISOString(),
      location: 'Storage Bay A-1',
      properties: {},
      quality_grade: 'standard',
      quantity_kg: '0',
      waste_type: WASTE_ENUM[0],
    },
    mode: 'all',
    resolver: zodResolver(createWasteInventorySchema),
  })

  async function handleSubmit(values: WasteMaterialForm) {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, payload: values })
      } else {
        await createMutation.mutateAsync(values)
      }
      form.reset()
      setOpen(false)
      setPropertiesDirty(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[400px]" side="right">
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <SheetTitle>{defaultValues ? 'Update' : 'Create'} Waste Inventory</SheetTitle>
              <SheetDescription>
                Keep an updated list of waste inventory to streamline recycling and disposal.
              </SheetDescription>
            </div>
          </div>

          <Form {...form}>
            <form className="flex h-full flex-col" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex-1 space-y-4">
                {/* Waste Type */}
                <FormField
                  control={form.control}
                  name="waste_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waste Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select waste type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WASTE_ENUM.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace('_', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity_kg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (kg)</FormLabel>
                      <FormControl>
                        <Input step="0.1" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Storage Bay A-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Collected */}
                <FormField
                  control={form.control}
                  name="date_collected"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Collected</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="w-full justify-between font-normal" variant="outline">
                              {field.value ? new Date(field.value).toLocaleDateString() : 'Select date'}
                              <Calendar1 className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              disabled={{ before: new Date() }}
                              mode="single"
                              onSelect={(date) => field.onChange(date?.toISOString() ?? '')}
                              selected={field.value ? new Date(field.value) : undefined}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quality Grade */}
                <FormField
                  control={form.control}
                  name="quality_grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Grade</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quality grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {QUALITY_GRADES.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contamination Level */}
                <FormField
                  control={form.control}
                  name="contamination_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contamination Level (0-1)</FormLabel>
                      <FormControl>
                        <Input max="1" min="0" step="0.01" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expiry Date */}
                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button className="w-full justify-between font-normal" variant="outline">
                                {field.value ? new Date(field.value).toLocaleDateString() : 'Select date'}
                                <Calendar1 className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                disabled={{ before: new Date() }}
                                mode="single"
                                onSelect={(date) => field.onChange(date?.toISOString() ?? '')}
                                selected={field.value ? new Date(field.value) : undefined}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                {/* Properties (custom editor) */}
                <FormField
                  control={form.control}
                  name="properties"
                  render={({ field }) => <Properties field={field as never} onDirtyChange={setPropertiesDirty} />}
                />
              </div>

              <AlertDialog modal open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. This will discard any edits you made in the form, including the
                      Properties editor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        onClick={() => {
                          // User confirmed discard: reset form and clear propertiesDirty
                          form.reset()
                          setPropertiesDirty(false)
                          setOpen(false)
                          setOpenAlert(false)
                        }}>
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="sticky bottom-0 flex justify-end gap-4 border-t bg-background pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (form.formState.isDirty || propertiesDirty) {
                      setOpenAlert(true)
                    } else {
                      setOpen(false)
                    }
                  }}>
                  Cancel
                </Button>
                <Button disabled={Object.keys(form.formState.errors).length > 0} type="submit">
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

/**
 * Properties component — JS-style object editor (not JSON)
 * - Debounced validation (500ms) that updates react-hook-form when parsed successfully
 * - Notifies parent about local dirty state via onDirtyChange
 * - Format button to pretty-print (2 spaces) and show unquoted keys
 */
export function Properties({
  field,
  onDirtyChange,
}: {
  field: ControllerRenderProps<{ properties?: Record<string, any> | undefined }, 'properties'>
  onDirtyChange?: (dirty: boolean) => void
}) {
  const [open, setOpen] = React.useState(false)

  // Serialize form value into JS-style object string
  const serialize = (val: any) => (val ? JSON.stringify(val, null, 2).replace(/"(\w+)":/g, '$1:') : `{}`)

  // initial serialized value (use ref to keep stable original string)
  const initialRef = React.useRef<string>(serialize(field.value))

  // local textarea value
  const [objValue, setObjValue] = React.useState<string>(initialRef.current)

  // validation error message
  const [error, setError] = React.useState<string | null>(null)

  // If field.value changed externally (reset or loaded), update initialRef and textarea
  React.useEffect(() => {
    const serialized = serialize(field.value)
    initialRef.current = serialized
    setObjValue(serialized)
    onDirtyChange?.(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value])

  // Debounced validation: parse JS-style object and call field.onChange when valid
  React.useEffect(() => {
    const handle = setTimeout(() => {
      const parsed = parseObject(objValue)
      if (parsed) {
        // update react-hook-form with parsed object
        field.onChange(parsed)
        setError(null)
      } else {
        setError('Invalid object format')
      }
    }, 500)

    return () => clearTimeout(handle)
  }, [objValue, field])

  // Notify parent when local textarea differs from initial serialized value
  React.useEffect(() => {
    const isDirty = objValue !== initialRef.current
    onDirtyChange?.(isDirty)
  }, [objValue, onDirtyChange])

  // Format the object: parse and pretty-print with 2-space indentation and unquoted keys
  const handleFormat = React.useCallback(() => {
    const parsed = parseObject(objValue)
    if (parsed) {
      const pretty = JSON.stringify(parsed, null, 2).replace(/"(\w+)":/g, '$1:')
      setObjValue(pretty)
      setError(null)
    } else {
      setError('Cannot format invalid object')
    }
  }, [objValue])

  return (
    <FormItem>
      <FormLabel>Properties</FormLabel>
      <FormControl>
        <Popover modal onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <Button className="w-full justify-between font-normal" variant="outline">
              {Object.keys(field.value ?? {}).length > 0
                ? `${Object.keys(field.value as Record<string, any>).length} properties`
                : 'Add properties'}
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex w-[400px] flex-col gap-2 p-4">
            <textarea
              className="h-48 w-full rounded-md border p-2 font-mono text-sm"
              onChange={(e) => setObjValue(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault()
                  const start = e.currentTarget.selectionStart
                  const newValue = objValue.substring(0, start) + '  ' + objValue.substring(start)
                  setObjValue(newValue)
                  requestAnimationFrame(() => {
                    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2
                  })
                }
              }}
              placeholder={`{\n  foo: 'bar',\n  count: 2\n}`}
              value={objValue}
            />

            <div className="flex items-center justify-between">
              {error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : (
                <p className="text-muted-foreground text-xs">Valid object</p>
              )}
              <Button onClick={handleFormat} size="sm" variant="secondary">
                Format
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
