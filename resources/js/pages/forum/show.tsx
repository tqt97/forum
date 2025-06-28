import ListPost from '@/components/forum/list-post';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { Discussion, Paginated, Post, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import pluralize from 'pluralize';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/',
    },
    {
        title: 'Details',
        href: '#',
    },
];

export default function Forum({ discussion, posts }: { discussion: { data: Discussion }; posts: Paginated<Post> }) {
    const handleDeleteDiscussion = () => {
        if (window.confirm('Are you sure?')) {
            router.delete(route('discussions.destroy', discussion.data.slug));
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="flex items-center justify-between p-6 text-gray-900">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.data.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">
                            {discussion.data.is_pinned && <span>[Pinned]</span>}
                            {discussion.data.title}
                        </h1>
                        <ul>
                            <li>
                                <button onClick={handleDeleteDiscussion} className="cursor-pointer text-sm text-red-500">
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">{pluralize('reply', discussion.data.replies_count, true)}</div>
                </div>
            </div>
            <div className="mt-6 space-y-4">
                {posts && posts.data.map((post: Post) => <ListPost key={post.id} post={post} isBestSolutionId={discussion.data.solution.id} />)}
            </div>
            <div className="mt-6">{posts.data && <Pagination pagination={posts} />}</div>
        </AppLayout>
    );
}
