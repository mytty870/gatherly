'use client'
import AvatarEditor from 'react-avatar-editor'
import { useAvatarUploader } from './useAvatarUploader'
import { Avatar } from '@/components/ui/avatar/Avatar'
import { Button } from '@/components/ui/button/Button'
import { Profile } from '@/types'
import { Dialog, DialogContent } from '@/components/ui/dialog/Dialog'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'

type AvatarUploaderProps = {
  avatarUrl: Profile['avatarUrl']
}

export const AvatarUploader = ({ avatarUrl }: AvatarUploaderProps) => {
  const {
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
  } = useAvatarUploader()

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Avatar
          className="cursor-pointer"
          onClick={() => fileInputElement.current?.click()}
        >
          <Image
            src={avatarUrl ?? ''}
            alt="Avatar Icon"
            width={500}
            height={500}
          />
        </Avatar>
        <input
          ref={fileInputElement}
          name="profileImage"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileSelection}
        />
        <Button
          variant="basic"
          radius="full"
          size="md"
          aria-label="画像をアップロード"
          onClick={() => fileInputElement.current?.click()}
        >
          プロフィール画像を変更
        </Button>
      </div>
      {selectedFile && (
        <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(false)}>
          <DialogContent
            className="max-w-[340px]"
            withCloseButton={false}
            onOpenAutoFocus={e => e.preventDefault()}
            onCloseAutoFocus={e => e.preventDefault()}
          >
            <div className="flex flex-col gap-8">
              <div className="relative pt-[100%]">
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={selectedFile}
                  width={250}
                  height={250}
                  border={50}
                  borderRadius={999}
                  color={[0, 0, 0, 0.5]}
                  scale={zoomLevel[0]}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              <Slider
                value={zoomLevel}
                onValueChange={value => setZoomLevel(value)}
                min={1}
                max={2}
                step={0.01}
              />
              <div className="flex justify-center">
                <Button
                  isLoading={isUploading}
                  size="lg"
                  radius="full"
                  type="submit"
                  onClick={saveAvatarImage}
                >
                  {isUploading ? '保存中...' : '確定する'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
