import DiscussionHeader from '@/components/forum/discussion';
import ListPost from '@/components/forum/list-post';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { Discussion, Paginated, Post, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

export default function Forum({ discussion, posts }: { discussion: { data: Discussion }; posts: Paginated<Post> }) {
    console.log(posts);
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
            <div className="mt-6 space-y-4">{posts && posts.data.map((post: Post) => <ListPost key={post.id} post={post} />)}</div>
            <div className="mt-6">{posts.data.length > 9 && <Pagination pagination={posts} />}</div>
        </AppLayout>
    );
}
