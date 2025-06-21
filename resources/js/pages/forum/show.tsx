import DiscussionHeader from '@/components/forum/discussion';
import AppLayout from '@/layouts/app-layout';
import { Discussion, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

export default function Forum({ discussion }: { discussion: { data: Discussion } }) {
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
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <DiscussionHeader key={discussion.data.id} discussion={discussion.data} />
            </div>
        </AppLayout>
    );
}
