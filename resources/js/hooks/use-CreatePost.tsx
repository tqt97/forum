import { useState } from 'react';

const useCreatePost = () => {
    const [visiblePost, setVisible] = useState(false);

    const showCreatePostForm = () => setVisible(true);
    const hideCreatePostForm = () => setVisible(false);

    return {
        visiblePost,
        showCreatePostForm,
        hideCreatePostForm,
    };
};

export default useCreatePost;
