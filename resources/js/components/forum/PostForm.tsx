import { useForm } from '@inertiajs/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface PostFormProps {
    visible: boolean;
    onClose: () => void;
    initialBody?: string; // Dùng cho chỉnh sửa
    onSubmit: (body: string) => void; // Hàm submit sẽ nhận body
    processing?: boolean;
}

export default function PostForm({ visible, onClose, initialBody = '', onSubmit, processing = false }: PostFormProps) {
    const [clientErrors, setClientErrors] = useState<Partial<{ body: string }>>({});
    const { data, setData, errors } = useForm<{ body: string }>({
        body: initialBody,
    });

    // const isEdit = initialBody ? true : false;
    const title = initialBody ? 'Edit' : 'Reply';
    const formStyle =
        title === 'Reply' ? 'fixed bottom-0 z-50 mx-auto w-full max-w-5xl space-y-3 border-t-4 border-gray-100 bg-white p-6 shadow-2xl' : '';

    const validateForm = (): boolean => {
        const errors: Partial<{ body: string }> = {};
        if (!data.body.trim()) {
            errors.body = 'Content is required';
        }

        setClientErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        onSubmit(data.body);
    };

    if (!visible) return null;

    return (
        <form onSubmit={handleSubmit} className={formStyle}>
            <div className="mx-auto max-w-5xl">
                <div className="flex items-end justify-between">
                    <h1 className="text-lg font-bold">{title} Post</h1>
                </div>
                <div className="mt-4">
                    <div className="flex w-full items-center space-x-3">
                        <div className="mt-4 w-full">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="body" className="flex items-center gap-4">
                                    Content
                                </Label>
                            </div>
                            <MarkdownEditor
                                value={data.body}
                                onChange={(e) => setData('body', e)}
                                height="350px"
                                className="z-10 mt-2 h-[300px] border border-gray-300"
                                onBlur={() => setClientErrors((prev) => ({ ...prev, body: undefined }))}
                                toolbarsMode={['preview']}
                            />
                            <InputError message={clientErrors.body || errors.body} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                        <Button className="cursor-pointer" disabled={processing} type="submit">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {title}
                        </Button>
                        <Button variant="ghost" onClick={onClose} className="cursor-pointer items-center p-4 text-sm">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
