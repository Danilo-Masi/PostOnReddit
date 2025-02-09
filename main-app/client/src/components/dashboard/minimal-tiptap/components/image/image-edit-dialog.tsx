import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import type { toggleVariants } from '@/components/ui/toggle'
import { useState } from 'react'
import { ImageIcon } from '@radix-ui/react-icons'
import { ToolbarButton } from '../toolbar-button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('image')}
          tooltip="Coming soon"
          aria-label="Image"
          size={size}
          variant={variant}
        >
          <ImageIcon className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
    </Dialog>
  )
}

export { ImageEditDialog }
