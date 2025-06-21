import { Discussion } from '@/types';
import { Link } from '@inertiajs/react';

export default function DiscussionHeader({ discussion }: { discussion: Discussion }) {
    return (
        <Link href={route('discussions.show', discussion.slug)} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="flex items-center space-x-6 p-6 text-gray-900">
                <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">
                            {discussion.is_pinned && <span>[Pinned]</span>} {discussion.title}
                        </h1>
                    </div>
                    <div className="mt-3 line-clamp-1 text-sm text-gray-500">{discussion.post.body_preview}</div>
                </div>
                <div>avatars</div>
            </div>
        </Link>
    );
}
