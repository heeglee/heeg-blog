import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <AskModal visible={visible} title="Delete a post" description="Are you sure you really want to delete?" confirmText="Delete" onConfirm={onConfirm} onCancel={onCancel} />
    );
};

export default AskRemoveModal;