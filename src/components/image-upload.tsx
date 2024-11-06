// components/UploadImageComponent.tsx
'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/utils/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { useRouter } from 'next/navigation'

// Define an interface for the props
interface UploadComponentProps {
  className?: string; // This prop is optional
}

const UploadImageComponent: React.FC<UploadComponentProps> = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive",
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setPreviewImage(URL.createObjectURL(file)) // Set preview image
    setSelectedFile(file) // Store the file to upload on confirmation
    setIsDragOver(false)
  }

  const [isPending, startTransition] = useTransition()

  const handleConfirmUpload = () => {
    if (selectedFile) {
      startUpload([selectedFile], { configId: undefined })
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null) // Clear the preview image
    setSelectedFile(null) // Clear the selected file
    setUploadProgress(0)  // Reset progress
  }

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-blue-900/25 bg-blue-900/10': isDragOver,
        }
      )}
    >
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        {previewImage ? (
          <div className="relative">
            <img src={previewImage} alt="Uploaded preview" className="w-48 h-48 object-cover rounded-md" />
            <button
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={handleConfirmUpload}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm Upload
            </button>
            {isUploading && (
              <div className='flex flex-col items-center mt-4'>
                <p>Uploading...</p>
                <Progress
                  value={uploadProgress}
                  className='mt-2 w-40 h-2 bg-gray-300'
                />
              </div>
            )}
          </div>
        ) : (
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpeg', '.jpg'],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className='h-full w-full flex-1 flex flex-col items-center justify-center'
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
                ) : isUploading || isPending ? (
                  <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
                ) : (
                  <Image className='h-6 w-6 text-zinc-500 mb-2' />
                )}
                <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                  {isUploading ? (
                    <div className='flex flex-col items-center'>
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className='mt-2 w-40 h-2 bg-gray-300'
                      />
                    </div>
                  ) : isPending ? (
                    <div className='flex flex-col items-center'>
                      <p>Redirecting, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className='font-semibold'>Drop file</span> to upload
                    </p>
                  ) : (
                    <p>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>
                {isPending ? null : (
                  <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                )}
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  )
}

export default UploadImageComponent
