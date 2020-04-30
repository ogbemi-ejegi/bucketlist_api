import React, {useState, useContext} from 'react';
import axios from 'axios';
//import {BucketContext} from '../globalstore';
//import Bucket from './showBuckets';

export const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    //To use the set Bucket function
    //const [buckets, setBuckets] = useContext(BucketContext); 

    //function to update name
    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    //function to update name
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    //function to update name
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    //function to update name
    const updatePasswordAgain = (e) => {
        setPasswordAgain(e.target.value);
    }

    //function to submit form
    const addUser = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            email: email,
            password: password,
            passwordAgain: passwordAgain
        }
        fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(responseData => {
            let status = responseData.message;
            console.log(status);
        })
         
    }
    return(
        <form id="userForm" onSubmit = {addUser}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange = {updateUsername} name= "username" placeholder="Username" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={email} onChange = {updateEmail} placeholder="Email" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange = {updatePassword} placeholder="password" />
            </div>
            <div className="form-group">
                <label>Password Again</label>
                <input type="password" className="form-control" value={passwordAgain} onChange = {updatePasswordAgain} placeholder="Re-enter password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

//export default AddUser;