import React from 'react';

const PostImage = ({url ,alt}) => {
    return (
        <div>
             <img
            src={url}
            className="w-full h-full object-cover rounded-lg"
            alt={alt}
          />
        </div>
    );
};

export default PostImage;