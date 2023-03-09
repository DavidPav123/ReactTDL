import * as React from 'react';
import './style.css';
import CTable from './Components/CTable.jsx';
import './fb.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();

function signIn(auth, provider) {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
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

    handleSubmit = (event) => {
        this.data.push({
            name: this.nameHolder,
            subject: this.subjectHolder,
            dueDate: this.dueDateHolder,
            dueTime: this.dueTimeHolder,
        });
        signIn(auth, provider);
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
                        <input
                            type="text"
                            onChange={(e) => this.setName(e.target.value)}
                        />
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
                        <input
                            type="date"
                            onChange={(e) => this.setDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Due Time:
                        <input
                            type="time"
                            onChange={(e) => this.setTime(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Item</button>
                </form>
                <CTable rows={this.data} />
            </div>
        );
    }
}
