import * as React from 'react';
import '../style.css';
import CTable from './CTable';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

export default class App extends React.Component {
  firebaseConfig = {
    apiKey: 'AIzaSyAIX5O-TlglLId0xPyocVCoHG5xkHXhwKM',
    authDomain: 'deadline-list.firebaseapp.com',
    projectId: 'deadline-list',
    storageBucket: 'deadline-list.appspot.com',
    messagingSenderId: '131517158969',
    appId: '1:131517158969:web:fd139d919d959f9f065fe8',
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  provider = new GoogleAuthProvider();
  auth = getAuth();
  db = getFirestore(this.app);

  curUser = '';
  data = [];

  nameHolder = '';
  subjectHolder = '';
  dueDateHolder = 0;
  dueTimeHolder = 0;

  setName(e: string) {
    this.nameHolder = e;
  }

  setSubject(e: string) {
    this.subjectHolder = e;
  }

  setDate(e: string) {
    this.dueDateHolder = e as unknown as number;
  }

  setTime(e: string) {
    this.dueTimeHolder = e as unknown as number;
  }

  addItem = (event: { preventDefault: () => void }) => {
    this.data.unshift({
      name: this.nameHolder,
      subject: this.subjectHolder,
      dueDate: this.dueDateHolder,
      dueTime: this.dueTimeHolder,
    });
    this.addData();
    this.forceUpdate();
    event.preventDefault();
  };

  removeItem = (index: number) => {
    this.data.splice(index, 1);
    this.addData();
    this.forceUpdate();
  };

  signIn = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    signInWithPopup(this.auth, this.provider)
      .then((result: { user: any }) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        this.curUser = user['uid'];
        console.log(this.curUser);
        this.readData();
      })
      .catch(
        (error: { code: any; message: any; customData: { email: any } }) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        }
      );
  };

  async addData() {
    await setDoc(doc(this.db, 'users', this.curUser), {
      data: this.data,
    });
  }

  async readData() {
    const docRef = doc(this.db, 'users', this.curUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      this.data = docSnap.data().data;
      console.log(this.data);
      this.forceUpdate();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  render() {
    return (
      <div>
        <h1>Deadline Tracker</h1>
        <form>
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
          <button onClick={this.signIn}>Sign In</button>
        </form>
        <CTable rows={this.data} onRowRemove={this.removeItem} />
      </div>
    );
  }
}
