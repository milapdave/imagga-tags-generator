import React from 'react';

const Tag = ({tag, confidence}) => {
    return (
        <div className="tag">
           {tag}
        </div>
    );
};

export default Tag;