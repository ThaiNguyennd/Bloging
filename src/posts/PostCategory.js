import React from 'react';

const PostCategory = ({children,className=" mt-8 px-4 py-1 rounded-lg"}) => {
    return (
        <div>
            <span className={className}>{ children}</span>
        </div>
    );
};

export default PostCategory;