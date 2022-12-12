import axios from "axios";

const EditModal = ({ currNoteID, currTitle, setCurrTitle, currContent, setCurrContent, currCategory, setCurrCategory, changeEditModal, setEditModal }) => {
    const updateNote = () => {
        axios.put('https://niklas1531-notes.herokuapp.com/edit', { title: currTitle, content: currContent, category: currCategory, date: new Date().toLocaleString(), id: currNoteID })
    setEditModal(false)
    }

    const cancel = () => {
        changeEditModal()
    }
    return (
        <div className="editmodal input">
         <button className="close" onClick={changeEditModal}><i className="fa-regular fa-circle-xmark fa-lg"></i></button>
            <h3>Notiz Bearbeiten</h3>
            <form onSubmit={updateNote} id='neueNotiz'>
                <textarea placeholder='Titel' maxLength={30} rows='1' value={currTitle} onChange={e => setCurrTitle(e.target.value)} />
                <textarea placeholder='Teile deine Gedanken...' rows='5' value={currContent} onChange={e => setCurrContent(e.target.value)} />
                <div className="category-div">
                    <label>Kategorie:</label>
                    <select value={currCategory} onChange={e => setCurrCategory(e.target.value)}>
                        <option value='red'>Rot</option>
                        <option value='green'>Grün</option>
                        <option value='yellow'>Gelb</option>
                        <option value='blue'>Blau</option>
                        <option value='pink'>Pink</option>
                                <option value='purple'>Violett</option>
                    </select>
                </div>
                <hr />
                <button onClick={cancel}>Abbrechen</button>
                <input type='submit' value='Speichern' />
            </form>
        </div>
    );
}

export default EditModal;