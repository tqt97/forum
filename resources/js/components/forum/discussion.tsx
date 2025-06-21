import { Discussion } from '@/types';

interface DiscussionHeaderProps {
    discussion: Discussion;
}

export default function DiscussionHeader({ discussion }: DiscussionHeaderProps) {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="flex items-center space-x-6 p-6 text-gray-900">
                <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-0.5 text-sm text-gray-600">
                            {discussion.topic.title}
                        </span>
                        <h1 className="text-lg font-medium">{discussion.title}</h1>
                    </div>
                </div>
                <div>avatars</div>
            </div>
        </div>
    );
}
