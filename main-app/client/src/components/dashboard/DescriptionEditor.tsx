// React
import { Dispatch, SetStateAction } from 'react';
// minimal-tiptap
import { MinimalTiptapEditor } from '../dashboard/minimal-tiptap';
import { Content } from '@tiptap/react'
// Shadcui
import { Label } from '../ui/label';

type DescriptionEditorProps = {
    descriptionValue: Content;
    setDescriptionValue: Dispatch<SetStateAction<Content>>;
}

export default function DescriptionEditor({ descriptionValue, setDescriptionValue }: DescriptionEditorProps) {
    return (
        <div className='flex flex-col gap-y-3 w-full'>
            <Label htmlFor="description-input">Post content</Label>
            <MinimalTiptapEditor
                value={descriptionValue}
                onChange={(content: Content) => setDescriptionValue(content)}
                className="w-full max-w-full min-h-[64svh] break-all overflow-y-scroll"
                editorContentClassName="p-5"
                output="json"
                placeholder="Type your content here"
                autofocus={false}
                editable={true}
                editorClassName="focus:outline-none" />
        </div>
    );
}
