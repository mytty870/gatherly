import { useState, useRef, useCallback } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { avatarUpload } from './action'

export const useAvatarUploader = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [isUploading, setUploading] = useState(false)

  const [zoomLevel, setZoomLevel] = useState([1.3])

  const fileInputElement = useRef<HTMLInputElement | null>(null)

  const avatarEditorRef = useRef<AvatarEditor>(null)

  const resetFileInput = useCallback(() => {
    if (fileInputElement.current) {
      fileInputElement.current.value = ''
    }
  }, [])

  const handleFileSelection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setSelectedFile(file)
        setDialogOpen(true)
        resetFileInput()
      }
    },
    [resetFileInput],
  )

  const saveAvatarImage = useCallback(async () => {
    const editor = avatarEditorRef.current
    if (editor) {
      editor.getImage().toBlob(async blob => {
        if (blob) {
          const file = new File([blob], 'image.png', { type: 'image/png' })
          const formData = new FormData()
          formData.append('profileImage', file)

          try {
            setUploading(true)
            // server actions
            await avatarUpload(formData)
            setUploading(false)
            setDialogOpen(false)
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      })
    }
  }, [])

  return {
    fileInputElement,
    avatarEditorRef,
    selectedFile,
    isDialogOpen,
    isUploading,
    zoomLevel,
    setZoomLevel,
    setDialogOpen,
    handleFileSelection,
    saveAvatarImage,
  }
}
