import * as React from 'react';
import './style.css';
import CTable from './Components/CTable.jsx';
import Button from './Components/signInButton.jsx';

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
                    <button onClick={this.addItem}>Add Item</button>
                    <Button />
                </form>
                <CTable rows={this.data} />
            </div>
        );
    }
}
