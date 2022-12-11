import LoginComp from "../components/LoginComp";
import Nav from "../components/Nav";

const Login = ({ name,setName, toggleDropdown, dropdown, logReg, changeLogReg, logged, setCurrID , setLogged, currName, setCurrName, currEmail, setCurrEmail, currPassword, setCurrPassword}) => {
    return (
        <div className="login">
            <Nav name={name} toggleDropdown={toggleDropdown} dropdown={dropdown} logged={logged}/>
           
            <LoginComp logReg={logReg} changeLogReg={changeLogReg} setCurrID={setCurrID} setName={setName} setLogged={setLogged} currName={currName} setCurrName={setCurrName} currEmail={currEmail} setCurrEmail={setCurrEmail} currPassword={currPassword} setCurrPassword={setCurrPassword}/>
        
        
        </div>
    );
}

export default Login;