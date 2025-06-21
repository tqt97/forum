import { Discussion } from '@/types';
import { Link } from '@inertiajs/react';

export default function DiscussionHeader({ discussion }: { discussion: Discussion }) {
    return (
        <li className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            {/* <div className="p-6 text-gray-900 flex items-center space-x-6">
                <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">
                            {discussion.is_pinned && <span>[Pinned]</span>} {discussion.title}
                        </h1>
                    </div>
                </div>

                <div className="text-gray-500 text-sm mt-3 line-clamp-1">{discussion.post.body_preview}</div>
                <Link href={route('discussions.show', discussion.slug)} className="inline-block text-sm mt-3">
                    a
                </Link>
            </div>
            <div className='w-7 flex-shrink-0'>avatars</div> */}
            <div className="flex items-center space-x-6 p-6 text-gray-900">
                <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">
                            <Link href={route('discussions.show', discussion.slug)}>
                                {discussion.is_pinned && <span>[Pinned]</span>} {discussion.title}
                            </Link>
                        </h1>
                    </div>

                    <div className="mt-3 line-clamp-1 text-sm text-gray-500">{discussion.post.body_preview}</div>

                    {/* <Link href="`${route('discussions.show', discussion)}?post=${discussion.latest_post.id}`" className="text-sm mt-3 flex items-center"> */}
                    <Link href={route('discussions.show', discussion.slug)} className="mt-3 flex items-center text-sm">
                        Last post by {discussion.latest_post.user?.username || '[user deleted]'} at &nbsp;
                        <time dateTime={discussion.latest_post.created_at.datetime} title={discussion.latest_post.created_at.datetime}>
                            {discussion.latest_post.created_at.datetime}
                        </time>
                    </Link>
                </div>
                {/* <div className="flex-shrink-0 flex flex-col items-end">
            <div className="flex items-center justify-start -space-x-1">
                <img src="participant.avatar_url" v-for="participant in participants" key="participant.id" className="h-6 w-6 rounded-full ring-2 ring-white first-of-type:w-7 first-of-type:h-7" :title="participant.username">
                <span className="!ml-1 text-sm text-gray-600" v-if="discussion.participants.length > 3">+ {{ discussion.participants.length - 3 }} more</span>
            </div>

            <div className="text-sm mt-3">
                { pluralize('reply', discussion.replies_count, true) }
            </div>
        </div> */}
            </div>
        </li>
    );
}
