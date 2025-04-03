import { Dispatch, SetStateAction, useCallback, useState, useMemo, useEffect } from "react";
import { Label } from "../ui/label";
import { Textarea } from '../ui/textarea';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TitleEditorProps {
    titleValue: string;
    setTitleValue: Dispatch<SetStateAction<string>>;
    error?: string;
    maxLength?: number;
    placeholder?: string;
    className?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function TitleEditor({
    titleValue,
    setTitleValue,
    error,
    maxLength = 300,
    placeholder = "Type your title here",
    className,
    label = "Post title",
    required = false,
    disabled = false,
    isLoading = false
}: TitleEditorProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasFixed, setHasFixed] = useState(false);

    const showError = error && !hasFixed;

    useEffect(() => {
        if (showError) {
            toast.error(error);
        }
    }, [showError, error]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setTitleValue(value);
            setHasFixed(true);
        }
    }, [maxLength, setTitleValue]);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const textareaClassName = useMemo(() => cn(
        "bg-zinc-100 dark:bg-zinc-800",
        "text-zinc-700 dark:text-zinc-200",
        "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        "text-sm shadow-none",
        "border border-zinc-300 dark:border-zinc-600",
        "focus:border-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0",
        "resize-none transition-colors duration-200",
        showError && "border-red-500 dark:border-red-400",
        disabled && "opacity-50 cursor-not-allowed",
        isFocused && "ring-1 ring-orange-500/20"
    ), [showError, disabled, isFocused]);

    const labelClassName = useMemo(() => cn(
        "text-zinc-700 dark:text-zinc-200",
        showError && "text-red-500 dark:text-red-400",
        disabled && "opacity-50"
    ), [showError, disabled]);

    return (
        <div className={cn("w-full flex flex-col gap-y-3", className)}>
            <Label
                className={labelClassName}
                htmlFor="title-input">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>

            <div className="relative">
                <Textarea
                    id="title-input"
                    name="title-input"
                    required={required}
                    disabled={disabled || isLoading}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={textareaClassName}
                    value={titleValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={!!showError}
                    aria-describedby={showError ? "title-error" : undefined}
                />

                {isLoading && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                    </div>
                )}
            </div>
        </div>
    );
}
