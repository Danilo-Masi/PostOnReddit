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
        <div className='flex flex-col gap-y-3 w-full'>
            <Label htmlFor="title-input">Post title</Label>
            <Textarea
                id="title-input"
                name="title-input"
                required
                maxLength={300}
                placeholder="Type your title here... (max 300 characters)"
                className="focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-bold placeholder:font-light text-sm text-zinc-900 placeholder:text-zinc-400 resize-none"
                value={titleValue}
                onChange={(e: any) => setTitleValue(e.target.value)} />
        </div>
    );
}
