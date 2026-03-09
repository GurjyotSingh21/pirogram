// "use client"

// import { useState } from "react"
// import { UploadDropzone } from "@uploadthing/react"
// import type { OurFileRouter } from "@/app/api/uploadthing/core"

// type Props = {
//   id?: string
//   onChange: (url: string) => void
// }

// export default function ImageUpload({ id = "imageUrl", onChange }: Props) {
//   const [preview, setPreview] = useState<string | null>(null)

//   return (
//     <div className="space-y-4">

//       {/* Hidden input so label can connect */}
//       <input
//         type="hidden"
//         id={id}
//         name={id}
//         value={preview ?? ""}
//         readOnly
//       />

//       <UploadDropzone<OurFileRouter, "eventImage">
//         endpoint="eventImage"

//         onClientUploadComplete={(res) => {
//           if (res && res.length > 0) {
//             const uploadedUrl = res[0].ufsUrl

//             setPreview(uploadedUrl)
//             onChange(uploadedUrl)
//           }
//         }}

//         onUploadError={(error: Error) => {
//           alert(`Upload failed: ${error.message}`)
//         }}
//       />

//       {preview && (
//         <div className="border rounded-xl overflow-hidden">
//           <img
//             src={preview}
//             alt="Event preview"
//             className="w-full h-64 object-cover"
//           />
//         </div>
//       )}

//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { UploadDropzone } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"

type Props = {
  id?: string
  name?: string
  onChange: (url: string) => void
}

export default function ImageUpload({
  id = "imageUrl",
  name = "imageUrl",
  onChange
}: Props) {

  const [preview, setPreview] = useState<string | null>(null)

  const removeImage = () => {
    setPreview(null)
    onChange("")
  }

  return (
    <div className="space-y-4">

      {/* Hidden input for accessibility */}
      <input
        type="text"
        id={id}
        name={name}
        value={preview ?? ""}
        readOnly
        className="sr-only"
      />

      {/* If image uploaded → show banner preview */}
      {preview ? (
        <div className="relative border rounded-xl overflow-hidden">

          <img
            src={preview}
            alt="Event banner"
            className="w-full h-64 object-cover"
          />

          <div className="absolute bottom-3 right-3 flex gap-2">

            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={removeImage}
            >
              Remove
            </Button>

          </div>

        </div>
      ) : (

        <UploadDropzone
          endpoint="eventImage"

          className="ut-button:bg-purple-600 ut-button:ut-readying:bg-purple-600/50 border-dashed border-2 rounded-xl p-8"

          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              const uploadedUrl = res[0].ufsUrl

              setPreview(uploadedUrl)
              onChange(uploadedUrl)

              console.log("Uploaded Image url:", uploadedUrl)
            }
          }}

          onUploadError={(error: Error) => {
            console.error(error)
            alert(`Upload failed: ${error.message}`)
          }}
        />

      )}

    </div>
  )
}