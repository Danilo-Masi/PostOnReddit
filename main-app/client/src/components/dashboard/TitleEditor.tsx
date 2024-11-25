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
        <div className='flex flex-col gap-y-2'>
            <Label>Title</Label>
            <Textarea
                placeholder='Type your title here...'
                className='resize-none md:w-1/2'
                value={titleValue}
                onChange={(e: any) => setTitleValue(e.target.value)} />
        </div>
    );
}
