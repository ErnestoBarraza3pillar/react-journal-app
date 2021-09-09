import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/FirebaseConfirg'

export const loadNotes = async (uid) => {
  // collection(db,  `${ uid }/journal/notes`), newNote);
  // const docRef =  doc(db, `${ uid }/journal/notes`,'notes');
  const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`))
  // const docSnap = await getDoc(docRef);

  const notes = []

  notesSnap.forEach(snapChildren => {
    notes.push({
      id: snapChildren.id,
      ...snapChildren.data()
    })
  })

  return notes
}
