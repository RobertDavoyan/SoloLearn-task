import * as types from './../types';

const initialState = {
    contactList: localStorage.contactList ? JSON.parse(localStorage.getItem('contactList')) : [],
};

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_NEW_CONTACT:
            return {
                ...state,
                contactList: [...state.contactList, action.data],
            }
        case types.MODIFY_CONTACT:
            return {
                ...state,
                contactList: action.newContactlist,
            }
        default:
            return state
    }
}