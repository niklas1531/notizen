const Dropdown = ({ logout, hideDropdown, handleSettings }) => {
    const logoutHandler = () => {
        logout()
       localStorage.clear()
        hideDropdown()
    }
    const openSettings = () => {
        handleSettings()
        hideDropdown()
    }
    return (
        <div className="dropdown">
            <button onClick={logoutHandler}><span>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></span></button>
            <button onClick={openSettings}><span>Settings <i class="fa-solid fa-gear"></i></span></button>
        </div>
    );
}

export default Dropdown;