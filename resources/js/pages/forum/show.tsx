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
                <div className="flex items-center justify-between p-6 text-gray-900">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.data.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">
                            <template v-if="discussion.is_pinned">[Pinned]</template>
                            {discussion.data.title}
                        </h1>
                        <ul>
                            <li>
                                <button className="cursor-pointer text-sm text-red-500">Delete</button>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="text-sm">
                        {{ pluralize('reply', discussion.replies_count, true) }}
                    </div> */}
                </div>
            </div>
            <div className="mt-6 space-y-4">{posts && posts.data.map((post: Post) => <ListPost key={post.id} post={post} />)}</div>
            <div className="mt-6">{posts.data.length > 9 && <Pagination pagination={posts} />}</div>
        </AppLayout>
    );
}
