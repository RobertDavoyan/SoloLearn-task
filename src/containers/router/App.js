import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './../../components/header';
import Create from './../pages/create';
import ContactList from './../pages/contactList';


const App = () => {
    return (
        <React.Fragment>
            <section className='main'>
                <Header />
                <div className='main-body'>
                    <div className='container'>
                        <Switch>
                            <Route path='/create' component={(Create)} />
                            <Route path='/' component={(ContactList)} />
                        </Switch>
                    </div>
                </div>

            </section>
        </React.Fragment>
    )
}
export default withRouter(App);