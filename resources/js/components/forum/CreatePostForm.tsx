import { Discussion, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface NewDiscussionFormProps {
    visible: boolean;
    onClose: () => void;
    discussion?: Discussion;
}

type CreatePostForm = {
    body: string;
};

export default function CreatePostForm({ visible, onClose, discussion }: NewDiscussionFormProps) {
    const page = usePage<SharedData>();
    const { topics } = page.props;
    const [clientErrors, setClientErrors] = useState<Partial<CreatePostForm>>({});

    const { data, setData, processing, errors, reset } = useForm<Required<CreatePostForm>>({
        body: '',
    });

    const validateForm = (): boolean => {
        const errors: Partial<CreatePostForm> = {};
        let firstErrorField: string | null = null;

        if (!data.body.trim()) {
            errors.body = 'Content is required';
            firstErrorField ??= 'body';
        }

        setClientErrors(errors);

        if (firstErrorField) {
            setTimeout(() => {
                const el = document.getElementById(firstErrorField);
                el?.focus();
            }, 0);
        }

        return Object.keys(errors).length === 0;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // alert('submit');
        if (!validateForm()) return;

        const payload = {
            body: data.body,
        };
        console.log(payload);
        console.log(discussion?.slug);
        router.post(route('posts.store', discussion?.slug), payload, {
            onSuccess: () => {
                onClose();
                setClientErrors({});
            },
            onFinish: () => reset(),
        });
    };

    if (!topics) return null;

    return (
        <>
            {visible && (
                <form onSubmit={submit} className="fixed bottom-0 z-50 mx-auto w-full space-y-3 border-t-4 border-gray-100 bg-white p-6 shadow-2xl">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-end justify-between">
                            <h1 className="text-lg font-bold">Reply</h1>
                            <Button variant="destructive" onClick={onClose} className="cursor-pointer items-center p-4 text-sm">
                                x
                            </Button>
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
                            <div className="mt-4">
                                <Button className="w-full cursor-pointer" disabled={processing} type="submit">
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    <Plus /> Create a post
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
