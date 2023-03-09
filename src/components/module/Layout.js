import React, { Fragment } from 'react';
import Header from '../layout/Header';

const Layout = ({children}) => {
    return (
        <Fragment>
            <Header></Header>
            {children}
        </Fragment>
    );
};

export default Layout;