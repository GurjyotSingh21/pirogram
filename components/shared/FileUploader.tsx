'use client'

import { useCallback, Dispatch, SetStateAction } from "react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { convertFileToUrl } from "@/lib/utils"

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    }
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-100"
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <div className="flex h-full w-full justify-center">
          <img
            src={imageUrl}
            alt="image"
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-5 text-gray-500">
          <img src="/assets/icons/upload.svg" alt="" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="mb-4 text-sm">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}