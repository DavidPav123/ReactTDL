import * as React from 'react';
import './style.css';
import CTable from './Components/CTable.jsx';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

//Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIX5O-TlglLId0xPyocVCoHG5xkHXhwKM',
  authDomain: 'deadline-list.firebaseapp.com',
  projectId: 'deadline-list',
  storageBucket: 'deadline-list.appspot.com',
  messagingSenderId: '131517158969',
  appId: '1:131517158969:web:fd139d919d959f9f065fe8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

let curUser = '';

export default class App extends React.Component {
  data = [];

  nameHolder = '';
  subjectHolder = '';
  dueDateHolder = 0;
  dueTimeHolder = 0;

  setName(e) {
    this.nameHolder = e;
  }

  setSubject(e) {
    this.subjectHolder = e;
  }

  setDate(e) {
    this.dueDateHolder = e;
  }

  setTime(e) {
    this.dueTimeHolder = e;
  }

  addItem = (event) => {
    this.data.push({
      name: this.nameHolder,
      subject: this.subjectHolder,
      dueDate: this.dueDateHolder,
      dueTime: this.dueTimeHolder,
    });
    this.forceUpdate();
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Deadline Tracker</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={(e) => this.setName(e.target.value)} />
          </label>
          <label>
            Subject:
            <input
              type="text"
              onChange={(e) => this.setSubject(e.target.value)}
            />
          </label>
          <label>
            Due Date:
            <input type="date" onChange={(e) => this.setDate(e.target.value)} />
          </label>
          <label>
            Due Time:
            <input type="time" onChange={(e) => this.setTime(e.target.value)} />
          </label>
          <button onClick={this.addItem}>Add Item</button>
          <button onClick={signIn}>Sign In</button>
        </form>
        <CTable rows={this.data} />
      </div>
    );
  }
}

function signIn(event) {
  event.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      curUser = user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
