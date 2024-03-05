import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import sessionReducer from './sessionSlice'

const reduxStore = configureStore({
    reducer: {
        nav: sidebarReducer,
        session: sessionReducer
    },
})

export default reduxStore
