import { Dispatch, SetStateAction, useCallback, useState, useMemo, useEffect } from 'react';
import { MinimalTiptapEditor } from '../dashboard/minimal-tiptap';
import { Content } from '@tiptap/react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DescriptionEditorProps {
    descriptionValue: Content;
    setDescriptionValue: Dispatch<SetStateAction<Content>>;
    maxLength?: number;
    placeholder?: string;
    className?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
}

export default function DescriptionEditor({
    descriptionValue,
    setDescriptionValue,
    maxLength = 40000,
    placeholder = "Type your content here",
    className,
    label = "Post content",
    required = false,
    disabled = false,
    error
}: DescriptionEditorProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasFixed, setHasFixed] = useState(false);
    const [key, setKey] = useState(0);

    const showError = error && !hasFixed;

    useEffect(() => {
        if (showError) {
            toast.error(error);
        }
    }, [showError, error]);

    // Reset the editor when descriptionValue becomes empty
    useEffect(() => {
        if (descriptionValue === '') {
            setKey(prev => prev + 1);
        }
    }, [descriptionValue]);

    const handleChange = useCallback((content: Content) => {
        if (typeof content === 'string' && content.length > maxLength) {
            return;
        }
        setDescriptionValue(content);
        setHasFixed(true);
    }, [maxLength, setDescriptionValue]);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const editorClassName = useMemo(() => cn(
        "w-full h-full min-h-[80svh] md:min-h-0 break-all overflow-scroll",
        "bg-zinc-100 dark:bg-zinc-800",
        "text-zinc-700 dark:text-zinc-200",
        "placeholder:text-zinc-500 dark:placeholder:text-zinc-200",
        "shadow-none border border-zinc-300 dark:border-zinc-600",
        isFocused && "border-orange-500",
        "focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0",
        disabled && "opacity-50 cursor-not-allowed"
    ), [isFocused, disabled]);

    const labelClassName = useMemo(() => cn(
        "text-zinc-700 dark:text-zinc-200",
        showError && "text-red-500 dark:text-red-400",
        disabled && "opacity-50"
    ), [showError, disabled]);

    const containerClassName = useMemo(() => cn(
        "relative w-full h-full min-h-[80svh] md:min-h-0",
        showError && "border-red-500 dark:border-red-400"
    ), [showError]);

    return (
        <div className={cn('w-full h-full flex flex-col gap-y-3', className)}>
            <Label className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>

            <div className={containerClassName}>
                <MinimalTiptapEditor
                    key={key}
                    aria-label={label}
                    aria-required={required}
                    aria-invalid={!!showError}
                    aria-describedby={showError ? "description-error" : undefined}
                    value={descriptionValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={editorClassName}
                    editorContentClassName="p-5 text-sm text-zinc-500 dark:text-zinc-200"
                    output="html"
                    placeholder={placeholder}
                    autofocus={false}
                    editable={!disabled}
                    editorClassName="focus:outline-none"
                />
            </div>
        </div>
    );
}