import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    filtered: [],
    page: 1,
    error: false,
    loading: false,
    pages: 1
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_DATA:
            return {
                ...state,
                data: action.data,
                error: false,
                loading: true,
                page: action.page,
                filtered: action.filtered,
                pages: action.pages
            };
        case actionTypes.FETCH_DATA_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.REQUEST_SHOWS:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.TOGGLE_MODAL:
            console.log(state, action, 'TOGGLE_MODAL')
            const withModal = state.data.map((row, i) =>
                (i === action.id) ? 
                {...row, modalIsOpen: !row.modalIsOpen} :
                row  
            );
            state.data = withModal
            return {
                ...state
            };
           
        default:
            return state;
    }
};

export default reducer;