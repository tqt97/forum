import { useState } from 'react';

const useCreateDiscussionForm = () => {
    const [visibleDiscussion, setVisible] = useState(false);

    const showCreateDiscussionForm = () => setVisible(true);
    const hideCreateDiscussionForm = () => setVisible(false);

    return {
        visibleDiscussion,
        showCreateDiscussionForm,
        hideCreateDiscussionForm,
    };
};

export default useCreateDiscussionForm;
