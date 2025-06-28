import useScrollToPost from '@/hooks/use-ScrollToPost';
import { Post } from '@/types';
import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import PostForm from './PostForm';

export default function ListPost({ post }: { post: Post }) {
    useScrollToPost(post.id);

    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false); // Thêm state cho Reply
    const [processing, setProcessing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleReplyClick = () => {
        setIsReplying(true); // Khi nhấn reply, mở form trả lời
    };

    const handleCancelReply = () => {
        setIsReplying(false); // Khi cancel, ẩn form trả lời
    };

    const handleCreatePostSubmit = (body: string) => {
        setProcessing(true);
        const payload = { body };
        router.post(route('posts.store', post.discussion.slug), payload, {
            onSuccess: () => {
                setProcessing(false);
                setIsReplying(false);
            },
        });
    };

    const handleEditPostSubmit = (body: string) => {
        setProcessing(true);
        const payload = { body };
        router.patch(route('posts.update', post.id), payload, {
            onSuccess: () => {
                setProcessing(false);
                setIsEditing(false);
            },
        });
    };

    const handleDeleteClick = () => {
        if (confirm('Are you sure to delete post?')) {
            router.delete(route('posts.destroy', post.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div
            key={post.id}
            id={`post-${post.id}`}
            className="relative flex items-start space-x-3 overflow-hidden border-2 bg-white p-6 text-gray-900 shadow-sm sm:rounded-lg"
        >
            <div className="w-6 flex-shrink-0">
                <img src={post.user?.avatar_url} className="h-6 w-6 rounded-full" />
            </div>
            <div className="w-full">
                <div>
                    <div>{post.user?.username || '[user deleted]'}</div>
                    <div className="text-sm text-gray-500">
                        Posted &nbsp;
                        <time dateTime={post.created_at.datetime} title={post.created_at.datetime}>
                            {post.created_at.human}
                        </time>
                    </div>
                </div>
                <div className="markdown mt-3">
                    {isEditing ? (
                        <PostForm
                            visible={isEditing}
                            onClose={handleCancelEdit}
                            initialBody={post.body}
                            onSubmit={handleEditPostSubmit}
                            processing={processing}
                        />
                    ) : isReplying ? (
                        <PostForm visible={isReplying} onClose={handleCancelReply} onSubmit={handleCreatePostSubmit} processing={processing} />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
                    )}
                </div>
                <ul className="mt-6 flex items-center space-x-3">
                    {post.discussion.user_can.reply && (
                        <li>
                            <Button
                                variant={'ghost'}
                                onClick={handleReplyClick}
                                disabled={processing}
                                className="cursor-pointer text-sm text-indigo-500"
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Reply
                            </Button>
                        </li>
                    )}
                    <li>
                        <Button variant={'ghost'} onClick={handleEditClick} disabled={processing} className="cursor-pointer text-sm text-indigo-500">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Edit
                        </Button>
                    </li>
                    <li>
                        <Button variant={'ghost'} onClick={handleDeleteClick} disabled={processing} className="cursor-pointer text-sm text-red-500">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
