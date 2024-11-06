// SomePage.tsx
import UploadImageComponent from "@/components/image-upload"

const SomePage = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Image</h1>
      {/* Define space for the upload component */}
      <div className="flex justify-center items-center">
        <UploadImageComponent className="w-64 h-40" /> {/* Adjust width and height as needed */}
      </div>
    </div>
  )
}

export default SomePage
