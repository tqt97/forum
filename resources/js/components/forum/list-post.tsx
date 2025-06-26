import useCreatePost from '@/hooks/use-CreatePost';
import useScrollToPost from '@/hooks/use-ScrollToPost';
import { Post } from '@/types';
import CreatePostForm from './CreatePostForm';

export default function ListPost({ post }: { post: Post }) {
    const { visiblePost, showCreatePostForm, hideCreatePostForm } = useCreatePost();
    useScrollToPost(post.id);

    return (
        <>
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
                    <div className="markdown mt-3" dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
                    <ul className="mt-6 flex items-center space-x-3">
                        {post.discussion.user_can.reply && (
                            <li>
                                <button onClick={showCreatePostForm} className="text-sm text-indigo-500">
                                    Reply
                                </button>
                            </li>
                        )}
                        {/* <li>
                        <button v-on:click="showCreatePostForm(post.discussion)" className="text-sm text-indigo-500">
                            Reply
                        </button>
                    </li> */}
                    </ul>
                </div>
            </div>
            <CreatePostForm visible={visiblePost} onClose={hideCreatePostForm} discussion={post.discussion} />
        </>
    );
}
