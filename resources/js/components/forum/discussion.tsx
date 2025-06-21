import { Discussion } from '@/types';
import { Link } from '@inertiajs/react';
import pluralize from 'pluralize';

export default function DiscussionHeader({ discussion }: { discussion: Discussion }) {
    const maxVisible = 3;
    const participants = discussion.participants;
    const visibleParticipants = participants.slice(0, maxVisible);
    const hiddenCount = participants.length - maxVisible;
    const unknownUser = 'UNKNOWN';

    return (
        <li className="my-6 overflow-hidden border bg-white shadow-md hover:shadow-lg sm:rounded-lg">
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

                    <div className="mt-3 line-clamp-1 text-sm text-gray-500">{discussion.post?.body_preview}</div>
                    {discussion.latest_post && (
                        <Link href={route('discussions.show', discussion.slug)} className="mt-3 flex items-center text-sm">
                            Last post by {discussion.latest_post.user?.username || unknownUser} at &nbsp;
                            <time dateTime={discussion.latest_post.created_at.datetime} title={discussion.latest_post.created_at.datetime}>
                                {discussion.latest_post.created_at.datetime}
                            </time>
                        </Link>
                    )}
                </div>
                <div className="flex flex-shrink-0 flex-col items-end">
                    <div className="flex-shrink-0">
                        <div className="mt-1 flex items-center justify-start -space-x-1">
                            {visibleParticipants.map((participant, index) => (
                                <img
                                    key={participant.id}
                                    src={participant.avatar_url}
                                    title={participant.username}
                                    className={`rounded-full ring-2 ring-white ${index === 0 ? 'h-6 w-6' : 'h-5 w-5'}`}
                                />
                            ))}

                            {hiddenCount > 0 && (
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white"
                                    title={`${hiddenCount} more`}
                                >
                                    +{hiddenCount}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-3 text-sm">{pluralize('reply', discussion.replies_count, true)}</div>
                </div>
            </div>
        </li>
    );
}
