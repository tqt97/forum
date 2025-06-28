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
    const solved = searchParams.get('filter[solved]') === '1';
    const unsolved = searchParams.get('filter[unsolved]') === '1';
    const mentioned = searchParams.get('filter[mentioned]') === '1';

    const activeLink = 'font-bold text-indigo-600';

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <nav className="space-y-3">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/">All discussions</Link>
                        </li>
                        <li>
                            <Link href="/?filter[noreplies]=1" className={isActive ? activeLink : ''}>
                                No replies
                            </Link>
                        </li>
                    </ul>
                    {auth.user && (
                        <ul className="space-y-2 border-t border-t-gray-100 pt-3">
                            <li>
                                <Link href="/?filter[mine]=1" className={isMine ? activeLink : ''}>
                                    My discussions
                                </Link>
                            </li>
                            <li>
                                <Link href="/?filter[participating]=1" className={isParticipating ? activeLink : ''}>
                                    Participating
                                </Link>
                            </li>
                            <li>
                                <Link href="/?filter[solved]=1" className={solved ? activeLink : ''}>
                                    Solved
                                </Link>
                            </li>
                            <li>
                                <Link href="/?filter[unsolved]=1" className={unsolved ? activeLink : ''}>
                                    Unsolved
                                </Link>
                            </li>
                            <li>
                                <Link href="/?filter[mentioned]=1" className={mentioned ? activeLink : ''}>
                                    Mentioned
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </div>
    );
}
