import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Dropdown from './components/Dropdown'
import Settings from './components/Settings'
import Load from './components/Load';

function App() {
  const [name, setName] = useState('')
  const [currID, setCurrID] = useState(localStorage.getItem('currID') || '')
  const [currName, setCurrName] = useState('')
  const [currEmail, setCurrEmail] = useState('')
  const [currPassword, setCurrPassword] = useState('')
  const [dropdown, toggleDropdown] = useState(false)
  const [logged, setLogged] = useState(localStorage.getItem('logged') || false)
  const [logReg, setLogReg] = useState('log')
  const [settings, setSettings] = useState(false)
  const [sortDir, setSortDir] = useState('DESC')
  const [load, setLoad] = useState(false)


  const handleLoad = () => {
  setLoad(!load)  
  }
  const handleSettings = () => {
    setSettings(!settings)
  }
  const logout = () => {
    
    setLogged(false)
    setCurrID('')
    setName('')
  }
  const hideDropdown = () => {
    toggleDropdown(false)
  }
  const changeLogReg = () => {
    if (logReg === 'log') {
      setLogReg('reg')
    } else {
      setLogReg('log')
    }
  }

  return (
    <div >
      {logged ? <Home name={name} sortDir={sortDir} setSortDir={setSortDir} setName={setName} currID={currID} toggleDropdown={toggleDropdown} dropdown={dropdown} logged={logged} logout={logout} setLoad={setLoad}/> : <Login setLoad={setLoad} name={name} setName={setName} setCurrID={setCurrID} toggleDropdown={toggleDropdown} dropdown={dropdown} logReg={logReg} changeLogReg={changeLogReg} logged={logged} setLogged={setLogged} currName={currName} setCurrName={setCurrName} currEmail={currEmail} setCurrEmail={setCurrEmail} currPassword={currPassword} setCurrPassword={setCurrPassword} />}
      {dropdown && <Dropdown logout={logout} hideDropdown={hideDropdown} handleSettings={handleSettings} />}
      {settings && <Settings  setLoad={setLoad} handleSettings={handleSettings} currID={currID} currName={currName} setCurrName={setCurrName} currEmail={currEmail} setCurrEmail={setCurrEmail} currPassword={currPassword} setCurrPassword={setCurrPassword} />}
    {load && <Load />}
    </div>
  );
}

export default App;
