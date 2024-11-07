'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/utils/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

// Define an interface for the props
interface UploadComponentProps {
  onUploadComplete: (url: string) => void;
  className?: string; // This prop is optional
}

const UploadImageComponent: React.FC<UploadComponentProps> = ({ onUploadComplete }) => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const uploadedImageUrl = data.url; // Get the uploaded image URL

      // Ensure the URL is valid before passing it to the parent
      if (uploadedImageUrl) {
        // Pass the image URL to the parent
        onUploadComplete(uploadedImageUrl);
        console.log(uploadedImageUrl);

        // Show success toast
        toast({
          title: 'Upload Successful',
          description: 'Your image has been uploaded successfully.',
          variant: 'success',
        })
      } else {
        // Handle error if URL is not returned
        toast({
          title: 'Upload Failed',
          description: 'There was an error uploading your image.',
          variant: 'destructive',
        })
      }
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
    setSelectedFile(file) // Store the file to upload
    setIsDragOver(false)
  }

  const handleUpload = () => {
    if (selectedFile) {
      startUpload([selectedFile], { configId: 'imageUploader' }) // Start the upload with the selected file
    } else {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      })
    }
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
            {isUploading && (
              <div className='flex flex-col items-center mt-4'>
                <p>Uploading...</p>
                <Progress
                  value={uploadProgress}
                  className='mt-2 w-40 h-2 bg-gray-300'
                />
              </div>
            )}
            {!isUploading && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleUpload}
              >
                Upload Image
              </button>
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
                ) : isUploading ? (
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
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  )
}

export default UploadImageComponent
