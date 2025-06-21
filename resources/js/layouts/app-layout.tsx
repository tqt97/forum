import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    side?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, side, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="mx-auto max-w-7xl grid-cols-7 gap-6 space-y-6 py-12 sm:px-6 md:grid md:space-y-0 lg:px-4">
            <div className="col-span-2">{side}</div>
            <div className="col-span-5">{children}</div>
        </div>
    </AppLayoutTemplate>
);
