"use client"

import { UploadDropzone } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

type Props = {
  onChange: (url: string) => void
}

export default function ImageUpload({ onChange }: Props) {
  return (
    <UploadDropzone<OurFileRouter, "eventImage">
      endpoint="eventImage"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onChange(res[0].url)
        }
      }}
      onUploadError={(error: Error) => {
        alert(`Upload failed: ${error.message}`)
      }}
    />
  )
}