"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventSchema, EventFormValues } from "@/lib/validators/eventSchema"
import { EVENT_CATEGORIES } from "@/constants/categories"
import { FileUploader } from "@/components/shared/FileUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function CreateEventPage() {

  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])

  const { startUpload } = useUploadThing("eventImage")

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      url: "",
      imageUrl: "",
      isFree: false,
    }
  })

  const { isSubmitting } = form.formState
  const isFree = form.watch("isFree")

  async function onSubmit(values: EventFormValues) {

    let uploadedImageUrl = values.imageUrl

    try {

      if (files.length > 0) {

        const uploadedImages = await startUpload(files)

        if (!uploadedImages || uploadedImages.length === 0) {
          return
        }

        uploadedImageUrl = uploadedImages[0].ufsUrl
      }

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          imageUrl: uploadedImageUrl
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create event")
      }

      const event = await response.json()

      form.reset()

      router.push(`/`)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">Create Event</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Event Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Event title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>

                  <Select
                    name="category"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="max-h-60 overflow-y-auto">

                      {EVENT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-72"
                      id="description"
                      rows={6}
                      placeholder="Describe your event for the participants to get a good understanding of it"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>

                  <FormLabel htmlFor="imageUrl">
                    Event Image
                  </FormLabel>

                  <FormControl id="imageUrl">
                    <FileUploader
                      imageUrl={form.watch("imageUrl") || ""}
                      onFieldChange={(url) => form.setValue("imageUrl", url)}
                      setFiles={setFiles}
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="location">
                  <img className="h-5" src="/assets/icons/location-grey.svg" alt="" />Location</FormLabel>
                <FormControl>
                  <Input
                    id="location"
                    placeholder="Event location or Online"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startDate">
                    <img className="h-5" src="/assets/icons/clock.svg" alt="" />Start Date</FormLabel>

                  <FormControl>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="datetime-local"
                      value={
                        field.value
                          ? new Date(field.value).toLocaleString("sv-SE").slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="endDate">
                    <img className="h-5" src="/assets/icons/clock.svg" alt="" />End Date</FormLabel>

                  <FormControl>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="datetime-local"
                      value={
                        field.value
                          ? new Date(field.value).toLocaleString("sv-SE").slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">
                    <img className="h-5" src="/assets/icons/dollar.svg" alt="" />Price</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={isFree ? 0 : field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url">
                    <img className="h-5" src="/assets/icons/link.svg" alt="" />Event URL</FormLabel>
                  <FormControl>
                    <Input
                      id="url"
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">

                <Checkbox
                  id="isFree"
                  name="isFree"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)

                    if (checked) {
                      form.setValue("price", 0)
                    }
                  }}
                />

                <FormLabel htmlFor="isFree">Free Ticket</FormLabel>

              </FormItem>
            )}
          />


          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg flex itmes-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <img
                  src="/assets/icons/spinner.svg"
                  className="h-5 w-5"
                />
                Creating Event...
              </>
            ) : (
              "Create Event"
            )}
          </Button>

        </form>
      </Form>

    </div>
  )
}