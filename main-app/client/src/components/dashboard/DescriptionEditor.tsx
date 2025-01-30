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
        <div className='w-full h-full flex flex-col gap-y-3'>
            <Label htmlFor="description-input" className="text-zinc-700 dark:text-zinc-200">Post content</Label>
            <MinimalTiptapEditor
                value={descriptionValue}
                onChange={(content: Content) => setDescriptionValue(content)}
                className="w-full h-full min-h-[80svh] md:min-h-0 break-all overflow-y-scroll bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-200 shadow-none border border-zinc-300 dark:border-zinc-600 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                editorContentClassName="p-5"
                output="json"
                placeholder="Type your content here"
                autofocus={false}
                editable={true}
                editorClassName="focus:outline-none" />
        </div>
    );
}
