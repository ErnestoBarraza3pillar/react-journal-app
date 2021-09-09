import { db } from '../../firebase/FirebaseConfirg'
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { TYPES } from '../../types/Types'
import { loadNotes } from '../../helpers/loadNotes'
import Swal from 'sweetalert2'
import { fileUpload } from '../../helpers/fileUpload'

export const startNewNote = () => {
  // react-journal
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)

    dispatch(activeNote(doc.id, newNote))
    dispatch(addNewNote(doc.id, newNote))
  }
}

export const addNewNote = (id, note) => ({
  type: TYPES.ADDNEWNOTE,
  payload: {
    id,
    ...note
  }
})

export const activeNote = (id, note) => ({
  type: TYPES.ACTIVENOTES,
  payload: {
    id,
    ...note
  }
})

export const setNotes = (notes) => ({
  type: TYPES.LOADNOTES,
  payload: notes
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    const noteRef = doc(db, `${uid}/journal/notes`, `${note.id}`)

    await updateDoc(noteRef, noteToFirestore)

    dispatch(refreshNote(note.id, noteToFirestore))

    Swal.fire('Saved', note.title, 'success')
  }
}

export const refreshNote = (id, note) => ({
  type: TYPES.UPDATEDNOTES,
  payload: {
    id,
    note: {
      id,
      ...note
    }

  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: ' Uploading... ',
      text: 'Please Wait ',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })
    const fileUrl = await fileUpload(file)
    activeNote.url = fileUrl

    dispatch(startSaveNote(activeNote))

    Swal.close()
  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    try {
      await deleteDoc(doc(db, `${uid}/journal/notes`, `${id}`))
    } catch (error) {
      console.log(error)
    }

    dispatch(deleteNote(id))
  }
}

export const deleteNote = (id) => ({
  type: TYPES.DELETEDNOTES,
  payload: id
})

export const noteLogOut = () => ({
  type: TYPES.LOGOUTCLEANINGNOTES
})
