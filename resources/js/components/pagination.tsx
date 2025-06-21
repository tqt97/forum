import { Link } from '@inertiajs/react';

interface PaginationLink {
    label: string;
    url: string | null;
    active: boolean;
}

interface PaginationProps {
    pagination: {
        meta: {
            links: PaginationLink[];
        };
    };
}

export default function Pagination({ pagination }: PaginationProps) {
    const links = pagination.meta.links ?? [];

    return (
        <nav className="mt-6 flex justify-center">
            <ul className="flex items-center space-x-1">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.url ?? '#'}
                            className={`rounded border px-3 py-1.5 text-sm transition-all ${
                                link.active
                                    ? 'border-black bg-black text-white'
                                    : link.url
                                      ? 'border-gray-300 bg-white text-black hover:bg-gray-100'
                                      : 'cursor-not-allowed border-gray-200 text-gray-400'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
