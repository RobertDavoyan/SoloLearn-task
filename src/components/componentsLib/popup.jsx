import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Create from './../../containers/pages/create';
import {Button } from './simpleUIComponents/Button';

const Popup = ({ close, contact, isDelete, removeContact }) => {
    const [t] = useTranslation();
    const popupBody = isDelete ? <div>
        <p>{t('Do You really want to delete contact?')}</p>
        <div className="button-container">
            <Button onClick={() => close()}>Close</Button>
            <Button onClick={() => {removeContact(contact.id); close();}}>Delete</Button>
        </div>
    </div> : <Create contact={contact} fromPopup={true} close={() => close()} />
    return (
        <div id='popup' className="popup" onMouseDown={(e) => { e.target.id === "popup" && close() }}>
            <div className="popup-dialog">
                <div className='popup-header'>
                    <p>{t('Id of contact ')}{contact.id}</p>
                </div>
                <div className='popub-body'>
                    {popupBody}
                </div>
            </div>
        </div>
    )
}
Popup.propTypes = {
    close: PropTypes.func.isRequired,
    removeContact: PropTypes.func,
    contact: PropTypes.object.isRequired,
    isDelete: PropTypes.bool,
};
export default Popup;