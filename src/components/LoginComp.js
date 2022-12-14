import axios from "axios";
import { useState } from "react";

const Login = ({  setLoad, logReg, changeLogReg, setCurrID, setLogged, currName, setCurrName, currEmail, setCurrEmail, currPassword, setCurrPassword }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)
    const [failedlogin, setFailedLogin] = useState(false)
    const [succReg, setSuccReg] = useState(false)

    const login = (e) => {
        e.preventDefault()
        setLoad(true)
        console.log("Frontend email: " + email)
        axios.get('https://niklas1531-notes.herokuapp.com/login', { params: { email, password } })
            .then(result => {
                if (result.data === 'not found') {
                    setFailedLogin(true)
                    setLoad(false)
                } else {
                    setFailedLogin(false)
                    setCurrID(result.data.id)
                    localStorage.setItem('currID', result.data.id)
                    setCurrName(result.data.name)
                    setCurrEmail(result.data.email)
                    setCurrPassword(result.data.password)
                    localStorage.setItem('logged', true)
                    setLogged(true)
                    setLoad(false)
                }
            })
    }

    const register = (e) => { 
        e.preventDefault()
        setLoad(true)
        if (password === confirmPassword) {
            setWrongPassword(false)
            console.log("email " + email + "password " + password + "name " + name)
            axios.post('https://niklas1531-notes.herokuapp.com/register', { email, password, name })
                .then(result => {
                    console.log(result.data)
                    setSuccReg(true)
                    setWrongPassword(false)
                    changeLogReg()
                    setLoad(false)
                })
        }
        else {
            setWrongPassword(true)
            setLoad(false)
        }
    }
    return (
        <div className="logincomp">
            <h3>{logReg === 'log' ? 'Login' : 'Register'}</h3>
            {logReg === 'log' && <form onSubmit={login}>

                <input type='email' placeholder="Email" onChange={e => setEmail(e.target.value)} required value={email} />
                <input type='password' placeholder="Password" onChange={e => setPassword(e.target.value)} required value={password} />
                <input className="submit" type='submit' value='Login' />
            </form>}
            {logReg === 'reg' && <form onSubmit={register}>
                <input type='text' placeholder="Benutzername" onChange={e => setName(e.target.value)} required />
                <input type='email' placeholder="Email" onChange={e => setEmail(e.target.value)} required />
               <div className="pws">
                <input type='password' placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <input type='password' placeholder="Password bestätigen" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <input className="submit" type='submit' value='Register' />
            </form>}
            {wrongPassword && <p className="red">Passwörter stimmen nicht überein!</p>}
            {failedlogin && <p className="red">Kein Nutzer gefunden!</p>}
            {succReg && <p className="succReg">Successfully registered</p>}
            <div className="switch-div">
                <p>{logReg === 'log' ? "Noch keinen Account?" : "Account vorhanden?"}</p>
                <button onClick={changeLogReg}>{logReg === 'log' ? "Registrieren" : "Login"}</button>
            </div>
        </div>
    );
}

export default Login;