'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/utils/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed, Trash2 } from 'lucide-react'
import { useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

interface UploadComponentProps {
  onImageUrlChange: (url: string) => void;
  className?: string;
}

const UploadImageComponent: React.FC<UploadComponentProps> = ({ onImageUrlChange }) => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const uploadedImageUrl = data.url;

      if (uploadedImageUrl) {
        onImageUrlChange(uploadedImageUrl);

        toast({
          title: 'Upload Successful',
          description: 'Your image has been uploaded successfully.',
          variant: 'success',
        })
        setIsConfirmed(true)
      } else {
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
    setPreviewImage(URL.createObjectURL(file))
    setSelectedFile(file)
    setIsDragOver(false)
    setIsConfirmed(false)
  }

  const handleUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedFile) {
      startUpload([selectedFile], { configId: 'imageUploader' })
    } else {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = () => {
    setPreviewImage(null)
    setSelectedFile(null)
    setIsConfirmed(false)
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
          <div className="relative flex flex-col items-center">
            <img src={previewImage} alt="Uploaded preview" className="w-48 h-48 object-cover rounded-md mb-4" />
            {isUploading && (
              <div className='flex flex-col items-center mt-4'>
                <p>Telechargement...</p>
                <Progress
                  value={uploadProgress}
                  className='mt-2 w-40 h-2 bg-gray-300'
                />
              </div>
            )}
            {!isConfirmed && (
              <div className='flex space-x-4'>
                <button
                  type='button'
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleUpload}
                >
                  Telecharger Image
                </button>
                <button
                  type='button'
                  className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center"
                  onClick={handleDelete}
                >
                  <Trash2 className='mr-2 h-4 w-4' /> Effacer
                </button>
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
                      <span className='font-semibold'>Telecharger</span> une image
                    </p>
                  ) : (
                    <p>
                      <span className='font-semibold'>Clicker pour telecharger</span> ou
                      glisser-déposer
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