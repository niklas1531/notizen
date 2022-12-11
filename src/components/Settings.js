import axios from "axios"
import {useState } from "react"

const Settings = ({ handleSettings, currID, currName, setCurrName, currEmail, setCurrEmail, currPassword, setCurrPassword }) => {

    const updateName = () => {
        axios.put('https://niklas1531-notes.herokuapp.com/updatename', { name: currName, id: currID })
            .then(result => {
                console.log(result.data)
            })
    }

    const updateEmail = () => {
        axios.put('https://niklas1531-notes.herokuapp.com/updateemail', { email: currEmail, id: currID })
        .then(result => {
            console.log(result.data)
        })
    }

    const updatePassword = () => {
        axios.put('https://niklas1531-notes.herokuapp.com/updatepassword', { password: currPassword, id: currID })
        .then(result => {
            console.log(result.data)
        })
    }

    return (
        <div className="settings">
            <button className="close" onClick={handleSettings}><i className="fa-regular fa-circle-xmark fa-lg"></i></button>
            <h3>Settings</h3>
            <div className="name">
                <label>Name</label>
                <input type='text' value={currName} onChange={e => setCurrName(e.target.value)} />
                <button onClick={updateName}>Speichern</button>
            </div>
            <div className="email">
                <label>Email</label>
                <input type='text' value={currEmail} onChange={e => setCurrEmail(e.target.value)} />
                <button onClick={updateEmail}>Speichern</button>
            </div>
            <div className="password">
                <label>Passwort</label>
                <input type='text' value={currPassword} onChange={e => setCurrPassword(e.target.value)} />
                <button onClick={updatePassword}>Speichern</button>
            </div>
        </div>
    );
}

export default Settings;