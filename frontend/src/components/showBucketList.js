import React, {useState, useEffect, useContext} from 'react';
import Bucket from './showBuckets';
import {BucketContext} from '../globalstore'; 

const BucketList = () => {
//const [buckets, setBuckets] = useState([]);
   const list = useContext(BucketContext);
    //console.log(list[0].buckets);
    
   //Get URL from end point
    
    return(
        <div>
            {/* {buckets.map(bucket => (
                <Bucket id= {bucket.id} bucketname={bucket.bucketName} key={bucket.id}/>
            ))} */}
        </div>
    )
}

export default BucketList;