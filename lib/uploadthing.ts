import {
  generateUploadDropzone,
  generateUploadButton,
  generateReactHelpers,
} from "@uploadthing/react"

import type { OurFileRouter } from "@/app/api/uploadthing/core"

// components
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const UploadButton = generateUploadButton<OurFileRouter>()

// helpers
const helpers = generateReactHelpers<OurFileRouter>()

export const useUploadThing = helpers.useUploadThing
export const uploadFiles = helpers.uploadFiles