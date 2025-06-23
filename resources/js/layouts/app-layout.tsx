import NewDiscussionForm from '@/components/forum/CreateDiscussionForm';
import Navigation from '@/components/forum/Navigation';
import { Button } from '@/components/ui/button';
import useCreateDiscussionForm from '@/hooks/use-CreateDiscussionForm';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const ForumLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { visible, showCreateDiscussionForm, hideCreateDiscussionForm } = useCreateDiscussionForm();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="mx-auto max-w-7xl grid-cols-7 gap-6 space-y-6 py-12 sm:px-6 md:grid md:space-y-0 lg:px-4">
                <div className="sticky top-2 col-span-2 h-fit space-x-3">
                    <Button onClick={showCreateDiscussionForm} className="mb-4 flex h-10 w-full cursor-pointer justify-center">
                        Start a discussion
                    </Button>
                    <Navigation />
                </div>
                <div className="col-span-5">{children}</div>
            </div>
            <NewDiscussionForm visible={visible} onClose={hideCreateDiscussionForm} />
        </AppLayoutTemplate>
    );
};

export default ForumLayout;
