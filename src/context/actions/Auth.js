import { googleAuthProvider } from '../../firebase/FirebaseConfirg'
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { TYPES } from '../../types/Types'
import { finishLoading, startLoading } from './Ui'
import Swal from 'sweetalert2'
import { noteLogOut } from './Notes'
const auth = getAuth()

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        dispatch(login(user.uid, user.displayName))
        dispatch(finishLoading())
      })
      .catch(error => {
        dispatch(finishLoading())
        Swal.fire('Error', error.message, 'error')
      })
  }
}

export const startRegisterLoginEmailPassword = (email, password, username) => {
  return (dispatch) => {
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user
        await updateProfile(auth.currentUser, {
          displayName: username
        })
          .then(() => {
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error')
          })
        dispatch(
          login(user.uid, user.displayName)
        )
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    // const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(
          login(user.uid, user.displayName)
        )
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const login = (uid, displayName) => ({
  type: TYPES.LOGIN,
  payload: {
    uid,
    displayName
  }
})

export const startLogOut = () => {
  return async (dispatch) => {
    // const auth = getAuth();
    await signOut(auth)
    dispatch(logOut())
    dispatch(noteLogOut())
  }
}

export const logOut = () => ({
  type: TYPES.LOGOUT
})
