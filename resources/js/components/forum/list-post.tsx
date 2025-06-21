import { Post } from '@/types';

export default function ListPost({ post }: { post: Post }) {
    return (
        <div className="block overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="flex items-center space-x-6 p-6 text-gray-900">
                <div className="w-7 flex-shrink-0">
                    <img src={post.user.avatar_url} className="h-7 w-7 rounded-full" />
                </div>
                <div className="w-full">
                    <div>
                        <div>{post.user.username}</div>
                        <div className="text-sm text-gray-500">Posted {post.created_at.human}</div>
                    </div>
                    <div className="mt-3">{post.body}</div>
                </div>
            </div>
        </div>
    );
}
