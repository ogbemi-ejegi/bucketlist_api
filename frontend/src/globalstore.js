import React, {useState, useEffect, createContext} from 'react';

export const BucketContext = createContext();

export const BucketProvider = (props) => {
    const [buckets, setBuckets] = useState([])

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
        setBuckets(data);
        console.log(data[0]);
         };
        fetchBucket();
    }, []);
    //Get URL from end point
    
    return(
        <BucketContext.Provider value={[buckets, setBuckets]}>
            {props.children}
        </BucketContext.Provider>
    );
}
