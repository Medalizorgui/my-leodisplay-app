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
      
      
    </div>
  )
}

export default ImageUploader
