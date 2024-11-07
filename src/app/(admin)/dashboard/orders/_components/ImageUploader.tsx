'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import UploadImageComponent from '@/components/image-upload';

interface ImageUploaderProps {
  onImageUrlChange: (url: string) => void; // This prop is used to pass the image URL to the parent
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUrlChange }) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleImageUpload = (url: string) => {
    setImageUrl(url) // Store the uploaded image URL in local state
    onImageUrlChange(url) // Pass the image URL to the parent
  }

  // Log the updated imageUrl whenever it changes
  useEffect(() => {
    if (imageUrl) {
      console.log('The URL of the uploaded image is:', imageUrl)
    }
  }, [imageUrl]) // This effect runs whenever imageUrl changes

  return (
    <div>
      {/* Image upload component */}
      <UploadImageComponent onUploadComplete={handleImageUpload} />
      
      {/* Optional: Display the uploaded image preview */}
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded preview" className="w-48 h-48 object-cover rounded-md" />
        </div>
      )}
    </div>
  )
}

export default ImageUploader
