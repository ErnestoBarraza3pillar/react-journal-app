import { TYPES } from "../../types/Types"

export const setError = ( err ) =>({
    type: TYPES.UISETERROR,
    payload: err
})

export const removeError = () =>({
    type: TYPES.UIREMOVEERROR
})

export const startLoading  = () =>({
    type: TYPES.UISTARTLOADING
})

export const finishLoading  = () =>({
    type: TYPES.UIFINISHLOADING
})