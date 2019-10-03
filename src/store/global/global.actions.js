import * as types from './../types';
import { removeFromArray, ranking } from './../../util/helpers';

export function createContact(data) {
    return (dispatch) => {
        if (localStorage.contactList) {
            const contactList = JSON.parse(localStorage.getItem('contactList'));
            contactList.push(data);
            localStorage.setItem('contactList', JSON.stringify(contactList));
            dispatch({
                type: types.CREATE_NEW_CONTACT,
                data,
            });
        } else {
            localStorage.setItem('contactList', JSON.stringify([data]));
            dispatch({
                type: types.CREATE_NEW_CONTACT,
                data,
            });
        }
    }
}
export function likeOrDislikeContact(id, status) {
    return (dispatch, getState) => {
        const { contactList } = getState().global;
        const indexOfContact = contactList.findIndex(contact => id === contact.id);
        const newContactlist = [...contactList];
        newContactlist[indexOfContact] = status ? { ...newContactlist[indexOfContact], likes: newContactlist[indexOfContact].likes + 1 } : { ...newContactlist[indexOfContact], dislikes: newContactlist[indexOfContact].dislikes + 1 };

        dispatch({
            type: types.MODIFY_CONTACT,
            newContactlist,
        });
        localStorage.setItem('contactList', JSON.stringify(newContactlist));
    }
}
export function editContact(data) {
    const { id, firstName, lastName, notes } = data;
    return (dispatch, getState) => {
        const { contactList } = getState().global;
        const indexOfContact = contactList.findIndex(contact => id === contact.id);
        const newContactlist = [...contactList];
        newContactlist[indexOfContact] = {
            ...newContactlist[indexOfContact],
            firstName,
            lastName,
            notes,
        };
        dispatch({
            type: types.MODIFY_CONTACT,
            newContactlist,
        });
        localStorage.setItem('contactList', JSON.stringify(newContactlist));
    }
}
export function removeContact(id) {
    return (dispatch, getState) => {
        const { contactList } = getState().global;
        const newContactlist = removeFromArray(contactList, contact => contact.id === id);

        dispatch({
            type: types.MODIFY_CONTACT,
            newContactlist,
        });
        localStorage.setItem('contactList', JSON.stringify(newContactlist));

    }
}
export function getListOfContacts() {
    return (dispatch, getState) => {
        const { contactList } = getState().global;
        const newContactlist = ranking(contactList);

        dispatch({
            type: types.MODIFY_CONTACT,
            newContactlist,
        });
    }
}