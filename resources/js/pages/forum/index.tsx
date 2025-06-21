import DiscussionHeader from '@/components/forum/discussion';
import Pagination from '@/components/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Discussion, Paginated, SharedData, Topic, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

export default function Forum({ discussions }: { discussions: Paginated<Discussion> }) {
    const page = usePage<SharedData>();
    const { topics } = page.props;
    const [topic, setTopic] = useState<string | undefined>(undefined);

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            side={
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">Side</div>
                </div>
            }
        >
            <Head title="Forum" />
            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="flex w-full items-center gap-4">
                        <Select value={topic} onValueChange={setTopic}>
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

                        <p className="mt-4 text-sm text-gray-600">Selected: {topic}</p>
                    </div>
                    <div className="mt-6 space-y-6">
                        <ul>
                            {discussions.data.length > 0 &&
                                discussions.data.map((discussion) => <DiscussionHeader key={discussion.id} discussion={discussion} />)}
                        </ul>
                    </div>
                </div>
                {discussions.data.length > 9 && (
                    <div className="my-6 flex justify-center">
                        <Pagination pagination={discussions} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
