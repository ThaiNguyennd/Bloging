import React from 'react';

const Field = ({children}) => {
    return (
        <div className='flex flex-col gap-8 mb-6 mt-6'>
            {children}
        </div>
    );
};

export default Field;