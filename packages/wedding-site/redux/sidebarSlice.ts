import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: `sidebar`,
    initialState: {
        showSidebar: false,
    },
    reducers: {
        toggleShowSidebar(state) {
            state.showSidebar = !state.showSidebar
        },
    },
})

export const {
    toggleShowSidebar,
} = sidebarSlice.actions
export default sidebarSlice.reducer
