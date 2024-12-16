// React
import { Dispatch, SetStateAction } from "react";
// Shadencui
import { Label } from "../ui/label";
import { Textarea } from '../ui/textarea';

type TitleEditorProps = {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
}

export default function TitleEditor({ titleValue, setTitleValue }: TitleEditorProps) {
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <Label htmlFor="title-input">Post title</Label>
            <Textarea
                id="title-input"
                name="title-input"
                required
                maxLength={100}
                placeholder="Type your title here... (max 100 characters)"
                className="resize-none border focus:border-orange-500 focus-visible:ring-offset-0 focus-visible:ring-0"
                value={titleValue}
                onChange={(e: any) => setTitleValue(e.target.value)} />
        </div>
    );
}
