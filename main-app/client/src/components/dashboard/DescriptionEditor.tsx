import { Dispatch, SetStateAction } from 'react';
import { MinimalTiptapEditor } from '../dashboard/minimal-tiptap';
import { Content } from '@tiptap/react'
import { Label } from '../ui/label';

type DescriptionEditorProps = {
    descriptionValue: Content;
    setDescriptionValue: Dispatch<SetStateAction<Content>>;
}

export default function DescriptionEditor({ descriptionValue, setDescriptionValue }: DescriptionEditorProps) {
    return (
        <div className='w-full h-full flex flex-col gap-y-3 overflow-scroll'>
            <Label className="text-zinc-700 dark:text-zinc-200">Post content</Label>
            <MinimalTiptapEditor
                aria-label="input-content"
                value={descriptionValue}
                onChange={(content: Content) => { setDescriptionValue(content) }}
                className="w-full h-full min-h-[80svh] md:min-h-0 break-all overflow-scroll bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-200 shadow-none border border-zinc-300 dark:border-zinc-600 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                editorContentClassName="p-5 text-sm text-zinc-500 dark:text-zinc-200"
                output="html"
                placeholder="Type your content here"
                autofocus={false}
                editable={true}
                editorClassName="focus:outline-none" />
        </div>
    );
}