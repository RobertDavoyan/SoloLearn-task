import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { likeOrDislikeContact, removeContact, getListOfContacts } from './../../store/global/global.actions';
import Popup from './../../components/componentsLib/popup';

const ContactList = ({ contactList, likeOrDislikeContact, removeContact, getListOfContact }) => {
    const [t] = useTranslation();
    const [popup, setPopup] = useState(null);
    useEffect(() => {
        getListOfContact();
    });

    return (
        <div className='contact-list-container'>
            {contactList && contactList.map((contact) => {
                return (<div key={contact.id} className='contact'>
                    <div className='contact-header'>
                        <img
                            src='/assets/images/edit.svg'
                            className='icon-btn'
                            onClick={() => setPopup(<Popup close={() => setPopup(null)} contact={contact} />)}
                        />
                        <img
                            src='/assets/images/delete.svg'
                            className='icon-btn'
                            onClick={() => setPopup(<Popup close={() => setPopup(null)} contact={contact} isDelete={true} removeContact = {(id) => removeContact(id)}/>)}
                        />
                    </div>
                    <div className='contact-body'>
                        <div className='personal-info-container'>
                            <p><span className='personal-info-key'>{t('firstname')}: </span>{contact.firstName}</p>
                            <p><span className='personal-info-key'>{t('lastname')}: </span>{contact.lastName}</p>
                            <p><span className='personal-info-key'>{t('notes')}: </span>{contact.notes}</p>
                        </div>
                    </div>
                    <div className='contact-footer'>
                        <div className='icons-container'>
                            <div className='icon' onClick={() => likeOrDislikeContact(contact.id, true)}>
                                <img src='/assets/images/like.svg' />
                                <span>{contact.likes}</span>
                            </div>
                            <div className='icon' onClick={() => likeOrDislikeContact(contact.id, false)}>
                                <img src='/assets/images/dislike.svg' />
                                <span>{contact.dislikes}</span>
                            </div>
                        </div>
                    </div>
                </div>)
            })}
            {popup}
        </div>
    )
}
ContactList.propTypes = {
    contactList: PropTypes.array.isRequired,
    likeOrDislikeContact: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
    getListOfContact: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    return {
        contactList: state.global.contactList,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        likeOrDislikeContact: (id, status) => dispatch(likeOrDislikeContact(id, status)),
        removeContact: (id) => dispatch(removeContact(id)),
        getListOfContact: () => dispatch(getListOfContacts()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);