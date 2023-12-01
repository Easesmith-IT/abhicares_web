import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUser: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserStatus(state) {
            state.isUser = true;
        },
    },
})

export const { changeUserStatus } = userSlice.actions
export default userSlice.reducer