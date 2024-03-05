import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
    name: `session`,
    initialState: {
        token: null as unknown as string,
    },
    reducers: {
        setSessionToken(state, payload) {
            state.token = payload.payload as string
        },
        clearSessionToken(state) {
            state.token = null as unknown as string
        }
    },
})

export const {
    setSessionToken,
    clearSessionToken
} = sessionSlice.actions
export default sessionSlice.reducer
