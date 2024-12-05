// minimal-tiptap
import { MinimalTiptapEditor } from '../minimal-tiptap';
import { Content } from '@tiptap/react'
// Shadcui
import { Label } from '../ui/label';
import { Dispatch, SetStateAction } from 'react';

type DescriptionEditorProps = {
    descriptionValue: Content;
    setDescriptionValue: Dispatch<SetStateAction<Content>>;
}

export default function DescriptionEditor({ descriptionValue, setDescriptionValue }: DescriptionEditorProps) {
    return (
        <div className='w-1/2 flex flex-col gap-y-2'>
            <Label>Description</Label>
            <MinimalTiptapEditor
                value={descriptionValue}
                onChange={(content: Content) => setDescriptionValue(content)}
                className="w-full max-h-[30svh] overflow-scroll"
                editorContentClassName="p-5"
                output="json"
                placeholder="Type your description here..."
                autofocus={false}
                editable={true}
                editorClassName="focus:outline-none" />
        </div>
    )
}
