"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventSchema, EventFormValues } from "@/lib/validators/eventSchema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

import ImageUpload from "@/components/ImageUpload"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateEventPage() {

  const router = useRouter()

  const [imageUrl, setImageUrl] = useState("")

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      price: 0,
      url: "",
      isFree: false
    }
  })

  const onSubmit = async (data: EventFormValues) => {

    const payload = {
      ...data,
      imageUrl
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      alert("Event created successfully")
      router.push("/")
    } else {
      alert("Failed to create event")
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

          {/* Title + Category */}

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
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
                  <FormLabel>Category</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                    </SelectContent>

                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Description + Image */}

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Event Image</FormLabel>
              <ImageUpload onChange={setImageUrl} />
            </div>

          </div>

          {/* Location */}

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Event location or Online"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dates */}

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="datetime-local"
                    onChange={(e) =>
                      field.onChange(new Date(e.target.value))
                    }
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="datetime-local"
                    onChange={(e) =>
                      field.onChange(new Date(e.target.value))
                    }
                  />
                </FormItem>
              )}
            />

          </div>

          {/* Price + URL */}

          <div className="grid grid-cols-2 gap-6">

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

          </div>

          {/* Free Ticket */}

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">

                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <FormLabel>Free Ticket</FormLabel>

              </FormItem>
            )}
          />

          {/* Submit */}

          <Button
            type="submit"
            className="w-full py-6 text-lg"
          >
            Create Event
          </Button>

        </form>
      </Form>

    </div>
  )
}