import React from 'react';

const Bucket = ({bucketname, id}) => {
    return(
        <div>
            <h3>{id}</h3>
            <h3>{bucketname}</h3> 
        </div>
    );
};

export default Bucket;