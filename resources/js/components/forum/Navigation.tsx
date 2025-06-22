import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Navigation() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const isActive = searchParams.get('filter[noreplies]') === '1';
    const isMine = searchParams.get('filter[mine]') === '1';
    const isParticipating = searchParams.get('filter[participating]') === '1';
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <nav className="space-y-3">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/">All discussions</Link>
                        </li>
                        <li>
                            <Link href="/?filter[noreplies]=1" className={isActive ? 'font-bold' : ''}>
                                No replies
                            </Link>
                        </li>
                    </ul>
                    {auth.user && (
                        <ul className="space-y-2 border-t border-t-gray-100 pt-3">
                            <li>
                                <Link href="/?filter[mine]=1" className={isMine ? 'font-bold' : ''}>
                                    My discussions
                                </Link>
                            </li>
                            <li>
                                <Link href="/?filter[participating]=1" className={isParticipating ? 'font-bold' : ''}>
                                    Participating
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </div>
    );
}
