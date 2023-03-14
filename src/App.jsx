import * as React from 'react';
import './style.css';
import CTable from './Components/CTable.jsx';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

//Firebase configuration


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
        this.addData();
        this.forceUpdate();
        event.preventDefault();
    };

    signIn = (event) => {
        event.preventDefault();

        signInWithPopup(this.auth, this.provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                this.curUser = user['uid'];
                console.log(curUser);
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

    async addData() {
        await setDoc(doc(this.db, "users", this.curUser), {
            data: this.data,
        });
    }

    async readData() {
        const querySnapshot = await getDoc(doc(this.db, "users", this.curUser));
        this.data = querySnapshot;
    }

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
                    <button onClick={this.signIn}>Sign In</button>
                </form>
                <CTable rows={this.data} />
            </div>
        );
    }
}



