import { TYPES } from '../../types/Types'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        // ...state,
        uid: action.payload.uid,
        name: action.payload.displayName
      }
    case TYPES.LOGOUT:
      return {}
    default:
      return state
  }
}
