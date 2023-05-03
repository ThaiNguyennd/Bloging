import React from 'react';

const FileldLayout = ({children}) => {
    return (
        <div className='grid grid-cols-2 gap-x-10 mb-5'>
            {children}
        </div>
    );
};

export default FileldLayout;