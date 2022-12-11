const Nav = ({ name, toggleDropdown, dropdown, logged }) => {

    const handleChange = () => {
        toggleDropdown(!dropdown)
    }

    const newNote = () => {
        document.getElementById('notes').classList.toggle('notes-mobile')
        document.getElementById('notes').classList.toggle('notes-mobile-no')
        document.getElementById('input').classList.toggle('input-mobile')
        document.getElementById('input').classList.toggle('input-mobile-yes')
    }
    return (
        <nav>
            <div className="title">
                Deine Notizen <span>{name}</span>
            </div>
            {logged && <div className="icons">
                <button onClick={newNote}><i className="fa-solid fa-plus add"></i></button>
                <button onClick={handleChange}><i className="fa-solid fa-user fa-lg"></i></button>
            </div>}
        </nav>
    );
}

export default Nav;