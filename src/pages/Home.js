import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import FilterModal from "../components/FilterModal";
import SortModal from "../components/SortModal";

const Home = ({ name, setName, toggleDropdown, dropdown, logged, currID, sortDir, setSortDir, setLoad}) => {
    const [notizen, setNotizen] = useState([])
    const [currNoteID, setCurrNoteID] = useState('')
    const [currTitle, setCurrTitle] = useState('')
    const [currContent, setCurrContent] = useState('')
    const [currCategory, setCurrCategory] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    const [sortModal, setSortModal] = useState(false)

    const search = () => {
        // Im Notizen Array die titles durchsuchen
        // GreenCoding tabellen suche anschauen
    }

    const refresh = () => {
        setLoad(true)
        axios.get('https://niklas1531-notes.herokuapp.com/notizen', { params: { id: currID, sortDir: sortDir } })
            .then(result => {
                setNotizen(result.data)
            })

        console.log("CurrID: " + currID)
        axios.get('https://niklas1531-notes.herokuapp.com/name', { params: { id: currID } })
            .then(result => {
                setName(result.data)
            })
            setLoad(false)
    }

    const changeDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }
    const changeEditModal = () => {
        setEditModal(!editModal)
    }
    const changeFilterModal = () => {
        setFilterModal(!filterModal)
    }
    // const changeSortModal = () => {
    //     setSortModal(!sortModal)
    // }
    const sort = () => {
        if (sortDir === 'DESC') {
            setSortDir('ASC')
        } else {
            setSortDir('DESC')
        }
        document.querySelector('.sort-btn').classList.toggle('transform')
    }
    const [neueNotiz, setNeueNotiz] = useState({
        category: "red",
        title: "",
        content: "",
        date: new Date().toLocaleString()

    })

    const editNote = (e) => {
        setEditModal(true)
    }

    const deleteNote = (e) => {
        setDeleteModal(true)
    }


    useEffect(() => {
        refresh()
    }, [neueNotiz, deleteModal, editModal, sortDir])

    const createNote = (e) => {
        e.preventDefault()
       setLoad(true)
        axios.post('https://niklas1531-notes.herokuapp.com/newnote', { user_id: currID, title: neueNotiz.title, content: neueNotiz.content, category: neueNotiz.category, date: neueNotiz.date })
            .then(result => {
                setNeueNotiz({
                    category: "red",
                    title: "",
                    content: "",
                    date: new Date().toLocaleString()
                })
                setLoad(false)
            })
    }
    return (
        <div>
            <Nav name={name} toggleDropdown={toggleDropdown} dropdown={dropdown} logged={logged} />
            <div className="home">
                <div className="input input-mobile" id="input" >
                    <h3>Neue Notiz</h3>
                    <form onSubmit={createNote} id='neueNotiz'>
                        <textarea placeholder='Titel' className='title' maxLength={30} rows='1' value={neueNotiz.title} onChange={e => setNeueNotiz(prev => ({ ...prev, ["title"]: e.target.value }))} />
                        <textarea placeholder='Teile deine Gedanken...' rows='5' value={neueNotiz.content} onChange={e => setNeueNotiz(prev => ({ ...prev, ["content"]: e.target.value }))} />
                        <div className="category-div">
                            <label>Kategorie:</label>
                            <select value={neueNotiz.category} onChange={e => setNeueNotiz(prev => ({ ...prev, ["category"]: e.target.value }))}>
                                <option value='red'>Rot</option>
                                <option value='green'>Grün</option>
                                <option value='yellow'>Gelb</option>
                                <option value='blue'>Blau</option>
                                <option value='pink'>Pink</option>
                                <option value='purple'>Violett</option>
                            </select>
                        </div>
                        <input type='submit' value='Erstellen' />
                    </form>
                </div>
                <div className="notes notes-mobile" id="notes">
                    <div className="btn-menu">
                        <button className="refresh-btn" onClick={refresh}><i className="fa-solid fa-arrow-rotate-right"></i></button>
                        <input onChange={search} className="search-btn" type='text'  disabled={true}/>
                        <button className="filter-btn"  onClick={changeFilterModal} disabled={true}><i className="fa-solid fa-filter"></i></button>
                        <button className="sort-btn" onClick={sort}><i class="fas fa-sort-down"></i></button>

                    </div>
                    {deleteModal && <DeleteModal refresh={refresh} changeDeleteModal={changeDeleteModal} currNoteID={currNoteID} setDeleteModal={setDeleteModal} />}
                    {editModal && <EditModal changeEditModal={changeEditModal} currNoteID={currNoteID} setEditModal={setEditModal} currTitle={currTitle} setCurrTitle={setCurrTitle} currContent={currContent} setCurrContent={setCurrContent} currCategory={currCategory} setCurrCategory={setCurrCategory} />}
                    {filterModal && <FilterModal changeFilterModal={changeFilterModal} currNoteID={currNoteID} setFilterModal={setFilterModal} />}
                    {sortModal && <SortModal currNoteID={currNoteID} setSortModal={setSortModal} />}

                    <div className="note-div">
                        <ul>
                            {notizen.map(note => (
                                <li key={note.id}>
                                    <div className="header">
                                        <div className="category" style={{ backgroundColor: `${note.category}` }}></div>
                                        <h3>{note.title}</h3>
                                    </div>
                                    <p>{note.content}</p>
                                    <p className="date">{note.date}</p>
                                    <div className="btn-group">
                                        <button onClick={e => {
                                            setCurrNoteID(note.id);
                                            setCurrTitle(note.title);
                                            setCurrContent(note.content);
                                            setCurrCategory(note.category);
                                            editNote()
                                        }}><i className="fa-solid fa-pen"></i></button>
                                        <button onClick={e => { setCurrNoteID(note.id); deleteNote() }}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;