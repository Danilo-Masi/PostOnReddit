// React
import { Dispatch, SetStateAction } from "react";
// Shadcnui
import { Label } from "../ui/label";
import { Textarea } from '../ui/textarea';

type TitleEditorProps = {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
}

export default function TitleEditor({ titleValue, setTitleValue }: TitleEditorProps) {
    return (
        <div className='w-full h-fit flex flex-col gap-y-3'>
            <Label htmlFor="title-input" className="text-zinc-700 dark:text-zinc-200">Post title</Label>
            <Textarea
                aria-label="input-title"
                id="title-input"
                name="title-input"
                required
                maxLength={300}
                placeholder="Type your title here"
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-sm shadow-none border border-zinc-300 dark:border-zinc-600 focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                value={titleValue}
                onChange={(e: any) => setTitleValue(e.target.value)} />
        </div>
    );
}
