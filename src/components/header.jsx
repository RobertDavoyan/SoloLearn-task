import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ImageBox } from './componentsLib/simpleUIComponents/ImageBox';

const Header = () => {
    const [t] = useTranslation();
    const [activeNav, setActivceNav] = useState('');
    return (
        <div className='header'>
            <div className='container'>
                <div className='logo-container' onClick={() => setActivceNav('')}>
                    <NavLink to='/'>
                        <ImageBox className='logo' image='/assets/images/logo.png' width='60px' height='60px' borderColor='unset' />
                    </NavLink>
                </div>
                <div className='nav-container'>
                    <NavLink to='/list'>
                        <p onClick={() => setActivceNav('list')} className={`nav-item ${activeNav === 'list' ? 'active-nav' : ''}`}>
                            {t('List of contacts')}
                        </p>
                    </NavLink>
                    <NavLink to='/create'>
                        <p onClick={() => setActivceNav('create')} className={`nav-item ${activeNav === 'create' ? 'active-nav' : ''}`}>
                            {t('Create')}
                        </p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Header