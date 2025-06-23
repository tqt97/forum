import { useState } from 'react';

const useCreateDiscussionForm = () => {
    const [visible, setVisible] = useState(false);

    const showCreateDiscussionForm = () => setVisible(true);
    const hideCreateDiscussionForm = () => setVisible(false);

    return {
        visible,
        showCreateDiscussionForm,
        hideCreateDiscussionForm,
    };
};

export default useCreateDiscussionForm;
