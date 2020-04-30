import React, {useState, useContext} from 'react';
import {BucketContext} from '../globalstore';
import Bucket from './showBuckets';

const AddBucket = () => {
    const [bucketName, setBucketName] = useState('');
    const [done, setDone] = useState('');
    //To use the set Bucket function
    const [buckets, setBuckets] = useContext(BucketContext); 

    //function to update name
    const updateName = (e) => {
        setBucketName(e.target.value);
    }

    //function to update name
    const updateDone = (e) => {
        setDone(e.target.value);
    }

    //function to submit form
    const addBucket = e => {
        e.preventDefault();
        //... makes a copy
        setBuckets(prevBuckets => [...prevBuckets, {bucketname: bucketName, done: done}]);
    }
    return(
        <form onSubmit = {addBucket}>
            <div className="form-group">
                <label for="bucketName">Bucket Name</label>
                <input type="text" className="form-control" value={bucketName} onChange = {updateName} name= "bucketName" placeholder="Bucket Name" />
            </div>
            <div className="form-group">
                <label for="done">Done</label>
                <input type="text" className="form-control" value={done} onChange = {updateDone} placeholder="done" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default AddBucket;