import NewDiscussionForm from '@/components/forum/CreateDiscussionForm';
import CreatePostForm from '@/components/forum/CreatePostForm';
import Navigation from '@/components/forum/Navigation';
import { Button } from '@/components/ui/button';
import useCreateDiscussionForm from '@/hooks/use-CreateDiscussionForm';
import useCreatePost from '@/hooks/use-CreatePost';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const ForumLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { visibleDiscussion, showCreateDiscussionForm, hideCreateDiscussionForm } = useCreateDiscussionForm();
    const { visiblePost, showCreatePostForm, hideCreatePostForm } = useCreatePost();
    const page = usePage<SharedData>();
    const isReply = page.url.includes('discussions/');
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="mx-auto max-w-7xl grid-cols-7 gap-6 space-y-6 py-12 sm:px-6 md:grid md:space-y-0 lg:px-4">
                <div className="sticky top-2 col-span-2 h-fit space-x-3">
                    {isReply && page.props.can ? (
                        <Button onClick={showCreatePostForm} className="mb-4 flex h-10 w-full cursor-pointer justify-center">
                            Reply
                        </Button>
                    ) : (
                        <Button onClick={showCreateDiscussionForm} className="mb-4 flex h-10 w-full cursor-pointer justify-center">
                            <Plus /> Create a discussion
                        </Button>
                    )}

                    <Navigation />
                </div>
                <div className="col-span-5">{children}</div>
            </div>
            {isReply ? (
                <CreatePostForm visible={visiblePost} onClose={hideCreatePostForm} />
            ) : (
                <NewDiscussionForm visible={visibleDiscussion} onClose={hideCreateDiscussionForm} />
            )}
        </AppLayoutTemplate>
    );
};

export default ForumLayout;
