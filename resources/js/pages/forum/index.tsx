import DiscussionHeader from '@/components/forum/discussion';
import Pagination from '@/components/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Discussion, Paginated, SharedData, Topic, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/',
    },
];

export default function Forum({ discussions }: { discussions: Paginated<Discussion> }) {
    const page = usePage<SharedData>();
    const { topics } = page.props;
    const [topic, setTopic] = useState<string | undefined>(undefined);

    const filterTopic = (topic: string) => {
        setTopic(topic);

        router.visit('/', {
            method: 'get',
            data: {
                'filter[topic]': topic,
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="flex w-full items-center gap-4">
                        <Select value={topic} onValueChange={filterTopic}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {topics &&
                                    topics.data.map((topic: Topic) => (
                                        <SelectItem key={topic.id} value={topic.title}>
                                            {topic.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-6 space-y-6">
                        <ul>
                            {discussions.data &&
                                discussions.data.map((discussion) => <DiscussionHeader key={discussion.id} discussion={discussion} />)}
                        </ul>
                    </div>
                </div>
                {discussions.data && (
                    <div className="my-6 flex justify-center">
                        <Pagination pagination={discussions} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
