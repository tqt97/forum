import { cn } from '@/lib/utils';
import { SharedData, Topic } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface NewDiscussionFormProps {
    visible: boolean;
    onClose: () => void;
}

type CreateDiscussionForm = {
    title: string;
    topic: string;
    body: string;
};

export default function NewDiscussionForm({ visible, onClose }: NewDiscussionFormProps) {
    const page = usePage<SharedData>();
    const { topics } = page.props;

    const { data, setData, processing, errors, reset } = useForm<Required<CreateDiscussionForm>>({
        title: '',
        topic: '',
        body: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            title: data.title,
            body: data.body,
            topic_id: Number(data.topic),
        };
        router.post(route('discussions.store'), payload, {
            onFinish: () => reset(),
        });
    };

    if (!topics) return null;

    return (
        <>
            {visible && (
                <form onSubmit={submit} className="fixed bottom-0 mx-auto w-full space-y-3 border-t-4 border-gray-100 bg-white p-6">
                    <div className="mx-auto max-w-7xl">
                        <div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-medium">New discussion</h1>
                                <Button variant="destructive" onClick={onClose} className="cursor-pointer items-center p-4 text-sm">
                                    x
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex w-full items-center space-x-3">
                                <div className="w-full">
                                    <div className="mb-2 space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            value={data.title}
                                            autoFocus
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                </div>
                                <div className="w-1/4 space-y-2">
                                    <Label htmlFor="topic">Select a topic</Label>
                                    <Select value={data.topic} onValueChange={(e) => setData('topic', e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {topics &&
                                                topics.data.map((topic: Topic) => (
                                                    <SelectItem key={topic.id} value={topic.id.toString()}>
                                                        {topic.title}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.topic} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <textarea
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                    autoFocus
                                    rows={6}
                                    className={cn(
                                        'flex w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                                    )}
                                ></textarea>
                                <InputError message={errors.body} />
                            </div>
                            <div className="mt-4">
                                <Button className="w-full cursor-pointer" disabled={processing} type="submit">
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create discussion
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
