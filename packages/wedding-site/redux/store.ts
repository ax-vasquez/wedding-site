import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'

const reduxStore = configureStore({
    reducer: {
        nav: sidebarReducer,
    },
})

export default reduxStore
