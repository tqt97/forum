import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface PaginationLink {
    label: string;
    url: string | null;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    links: PaginationLink[];
}

export interface Paginated<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
    topics: { data: Topic[] };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Topic {
    id: number;
    title: string;
    slug: string;
}
export interface Discussion {
    id: number;
    title: string;
    slug: string;
    is_pinned: boolean;
    replies_count: number;
    topic: Topic;
    post: Post;
    latest_post: Post;
    participants: PublicUser[];
    user_can: UserCan;
    created_at: string;
}

export interface UserCan {
    reply: boolean;
}

export interface PublicUser {
    id: number;
    username: string;
    avatar_url: string;
}

export interface Post {
    id: number;
    body: string;
    body_preview: string;
    body_markdown: string;
    user: PublicUser;
    discussion: Discussion;
    user_can: UserCan;
    created_at: {
        human: string;
        datetime: string;
    };
    // discussion: Discussion;
}
