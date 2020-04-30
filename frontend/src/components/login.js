import React, {useState, useContext} from 'react';
import axios from 'axios';
//import {BucketContext} from '../globalstore';
//import Bucket from './showBuckets';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   

    //function to update name
    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    

    //function to submit form
    const loginUser = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
        fetch('http://localhost:5000/api/user/login', {
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
        <form id="userForm" onSubmit = {loginUser}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange = {updateUsername} name= "username" placeholder="Username" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange = {updatePassword} name= "password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

//export default AddUser;