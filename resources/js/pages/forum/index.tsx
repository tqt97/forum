import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

export default function Forum() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="mt-6">forum index</div>
        </AppLayout>
    );
}
