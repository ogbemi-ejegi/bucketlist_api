import React, {useState, createContext} from 'react';

export const BucketContext = createContext();

export const BucketProvider = (props) => {
    const [buckets, setBuckets] = useState([

    //Get URL from end point
     function fetchUser ()  {
         fetch('http://localhost:5000/api/bucket/', {
             method: 'GET',
             mode: 'cors',
             credentials: 'same-origin',
             headers: {
                 "Content-Type": "application/json"
             }
         }).then(res => res.json()).then(response => {
            console.log(response);
         }).catch(err => {
             console.log(err)
         })
     }
    ])

    return(
        <BucketContext.Provider value={[buckets, setBuckets]}>
            {props.children}
        </BucketContext.Provider>
    );
}
