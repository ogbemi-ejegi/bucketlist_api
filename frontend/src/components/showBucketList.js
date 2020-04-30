import React, {useState, useEffect, useContext} from 'react';
import Bucket from './showBuckets';
import {BucketContext} from '../globalstore'; 

const BucketList = () => {
const [buckets, setBuckets] = useState([]);
   //const list = useContext(BucketContext);
   //console.log(list[0][1]);
    //console.log(list[0].buckets);
    useEffect(() => {
        const fetchBucket = async () => {
        const buckets = await fetch('http://localhost:5000/api/bucket/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        let data = await buckets.json();
        console.log(data);
        setBuckets(data);
        
         };
        fetchBucket();
    }, []);
    
   //Get URL from end point
    
    return(
        <div>
            {buckets.map(bucket => (
                <Bucket id= {bucket._id} bucketname={bucket.bucketname} key={bucket._id}/>
            ))}
        </div>
    )
}

export default BucketList;