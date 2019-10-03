import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input } from './../../components/componentsLib/simpleUIComponents/Input';
import { Button } from './../../components/componentsLib/simpleUIComponents/Button';
import { generateId } from './../../util/helpers';
import { createContact, editContact } from './../../store/global/global.actions';



const Create = ({ createContact, fromPopup, contact, close, editContact }) => {
    const [t] = useTranslation();
    const stateObj = fromPopup ? contact : {
        firstName: '',
        lastName: '',
        notes: '',
        likes : 0,
        dislikes : 0,
        rank: 0,
    };
    const [form, setValues] = useState(stateObj);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.firstName || !form.lastName || !form.notes) {
            alert('firstName, lastName, notes are required ');
            return;
        } 
        form.createdAt = new Date().toDateString();
        form.id = generateId();

        if(fromPopup) {
            editContact(form);
            close();
        } else {
            createContact(form);
            setValues({...form, firstName: '', lastName: '', notes: '',});
        }
    };
    const containerClass = fromPopup ? 'create-container fromEdit' : 'create-container';

    return (
        <div className={containerClass}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label className='form-label'>{t('First Name')}</label>
                    <Input
                        required
                        name='firstName'
                        borderColor='#E6E6E6'
                        value={form.firstName}
                        onChange={(name, value) => setValues({ ...form, [name]: value })}
                        className='form-input'
                    />
                </div>
                <div className="form-group">
                    <label className='form-label'>{t('Last name')}</label>
                    <Input
                        required
                        name='lastName'
                        borderColor='#E6E6E6'
                        value={form.lastName}
                        onChange={(name, value) => setValues({ ...form, [name]: value })}
                        className='form-input'
                    />
                </div>
                <div className="form-group">
                    <label className='form-label'>{t('Notes')}</label>
                    <textarea
                        name='notes'
                        value={form.notes}
                        className='form-input form-textarea'
                        onChange={(e) => setValues({ ...form, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="button-container">
                    {fromPopup && (<Button onClick={() => close()}>Close</Button>)}
                    <Button onClick={(e) => handleSubmit(e)}>{fromPopup ? 'Edit' : 'Create'}</Button>
                </div>
            </form>

        </div>
    )
};
const mapDispatchToProps = dispatch => {
    return {
        createContact: (data) => dispatch(createContact(data)),
        editContact: (data) => dispatch(editContact(data)),
    }
};
Create.propTypes = {
    createContact: PropTypes.func.isRequired,
    editContact: PropTypes.func,
    close: PropTypes.func,
    fromPopup: PropTypes.bool,
    contact: PropTypes.object,
};
export default connect(null, mapDispatchToProps)(Create);