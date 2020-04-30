import React from 'react';
import {BucketProvider}  from './globalstore';
import BucketList from './components/showBucketList';
import AddBucket from './components/bucketForm';
import {Navigation} from './components/navbar';
import {AddUser} from './components/registration';
import {Login} from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <BucketProvider>
          <div className="App container">
            <Navigation />
            <Switch>
            <Route path="/" exact component={BucketList} />
            <Route path="/addBucket" component={AddBucket} />
            <Route path="/registration" component={AddUser} />
            <Route path="/login" component={Login} />
            </Switch>
            {/*<AddBucket />
            <BucketList />*/}
          </div>
      </BucketProvider>
    </Router>
  );
}

export default App;
