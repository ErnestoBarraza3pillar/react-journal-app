import { TYPES } from '../../types/Types'

const initialState = {
  notes: [],
  active: null
}
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ACTIVENOTES:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }
    case TYPES.ADDNEWNOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      }
    case TYPES.LOADNOTES:
      return {
        ...state,
        notes: [...action.payload]
      }
    case TYPES.UPDATEDNOTES:
      return {
        ...state,
        notes: state.notes.map(
          note => note.id === action.payload.id
            ? action.payload.note
            : note
        )
      }
    case TYPES.DELETEDNOTES:
      return {
        ...state,
        active: null,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case TYPES.LOGOUTCLEANINGNOTES:
      return {
        ...state,
        active: null,
        notes: []
      }
    default:
      return state
  }
}
