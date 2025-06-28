import DiscussionHeader from '@/components/forum/discussion';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useDebounce from '@/hooks/use-Debounce';
import AppLayout from '@/layouts/app-layout';
import { Discussion, Paginated, SharedData, Topic, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query); // Update the search query state
    };

    useEffect(() => {
        if (debouncedSearchQuery !== '') {
            // Trigger a search when the debounced search query changes
            router.visit('/', {
                method: 'get',
                data: {
                    search: debouncedSearchQuery,
                },
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            router.visit('/', {
                method: 'get',
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, [debouncedSearchQuery, topic]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="flex w-full items-center gap-4">
                        <div className="flex w-3/4">
                            <Label className="sr-only" />
                            <Input type="search" id="search" value={searchQuery} onChange={handleSearchChange} placeholder="Search discussions" />
                        </div>
                        <div className="flex w-1/4">
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
                    </div>
                    <div className="mt-6 space-y-6">
                        <ul>
                            {discussions.data ? (
                                discussions.data.map((discussion) => <DiscussionHeader key={discussion.id} discussion={discussion} />)
                            ) : (
                                <li className="my-6 overflow-hidden border bg-white shadow-md hover:shadow-lg sm:rounded-lg">
                                    <div className="p-6 text-gray-900">No discussion found</div>
                                </li>
                            )}
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
