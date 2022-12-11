import axios from "axios"

const DeleteModal = ({ changeDeleteModal, currNoteID, setDeleteModal }) => {

    const cancel = () => {
        changeDeleteModal()
    }
    const deleteNote = () => {
        axios.delete('https://niklas1531-notes.herokuapp.com/delete', {params: {id: currNoteID}})
        .then(result => {
            console.log(result.data)
        })
        setDeleteModal(false)
    }

    return (
        <div className="deletemodal">
            <div className="text">
                Bist du sicher, dass du diese Notiz löschen möchtest?
            </div>
            <div className="buttons">
                <div className="btn-left">
                    <button onClick={cancel}>Abbrechen</button>
                </div>
                <div className="btn-right">
                    <button onClick={deleteNote}>Löschen</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;