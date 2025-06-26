import { useEffect } from 'react';

const useScrollToPost = (postId: number | null) => {
    useEffect(() => {
        if (!postId) return;

        // Slight delay to wait for DOM updates
        const timeout = setTimeout(() => {
            const element = document.getElementById(`post-${postId}`);
            if (element) {
                const yOffset = -50;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, [postId]);
};

export default useScrollToPost;
