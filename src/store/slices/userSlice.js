import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUser: localStorage.getItem("user") || false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserStatus(state,action) {
            state.isUser = action?.payload;
            localStorage.setItem("user",action?.payload)
        },
    },
})

export const { changeUserStatus } = userSlice.actions
export default userSlice.reducer