import * as actionTypes from './actionTypes';

export const toggleModal = id => {
    return {
        type: 'TOGGLE_MODAL',
        id
    };
};

