import axios from "axios";
import { useState } from "react";

const Login = ({ logReg, changeLogReg, setCurrID, setLogged, currName, setCurrName, currEmail, setCurrEmail, currPassword, setCurrPassword }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)
    const [failedlogin, setFailedLogin] = useState(false)
    const [succReg, setSuccReg] = useState(null)
    const [style, setStyle] = useState('')

    const login = () => {
        if (logReg === 'log') {
            console.log("Frontend email: " + email)
            axios.get('https://niklas1531-notes.herokuapp.com/login', { params: { email, password } })
                .then(result => {
                    if (result.data === 'error' || result.data === 'account with mail does not exist') {
                        setFailedLogin(true)
                    } else {
                        setFailedLogin(false)
                        setCurrID(result.data.id)
                        localStorage.setItem('currID', result.data.id)
                        setCurrName(result.data.name)
                        setCurrEmail(result.data.email)
                        setCurrPassword(result.data.password)
                        localStorage.setItem('logged', true)
                        setLogged(true)
                    }
                })

        } else {
            if (password === confirmPassword) {
                setWrongPassword(false)
                console.log("email " + email + "password " + password + "name " + name)
                axios.post('https://niklas1531-notes.herokuapp.com/register', { email, password, name })
                    .then(result => {
                        console.log(result.data)
                        if (result.data === 'Account with this email already exists') {
                            setSuccReg('Account with this email already exists')
                            setStyle('red')
                        } else {
                            setSuccReg('Successfull created user')
                            setStyle('succReg')
                            changeLogReg()
                        }


                    })
            }
            else {
                setWrongPassword(true)
            }

        }
    }
    return (
        <div className="logincomp">
            <h3>{logReg === 'log' ? 'Login' : 'Register'}</h3>
            {logReg === 'reg' && <input type='text' placeholder="Benutzername" onChange={e => setName(e.target.value)} />}
            <input type='email' placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder="Password" onChange={e => setPassword(e.target.value)} />
            {logReg === 'reg' && <input type='password' placeholder="Password bestätigen" onChange={e => setConfirmPassword(e.target.value)} />}
            <button onClick={login} className="submit">{logReg === 'log' ? 'Login' : 'Register'}</button>
            {wrongPassword && <p className="red">Passwörter stimmen nicht überein!</p>}
            {failedlogin && <p className="red">Kein Nutzer gefunden!</p>}
            <p className={style}>{succReg}</p>
            <div className="switch-div">
                <p>{logReg === 'log' ? "Noch keinen Account?" : "Account vorhanden?"}</p>
                <button onClick={changeLogReg}>{logReg === 'log' ? "Registrieren" : "Login"}</button>
            </div>
        </div>
    );
}

export default Login;