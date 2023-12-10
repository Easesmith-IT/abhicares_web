import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserStatus(state, action) {
            return {
                userId:action.payload
            }
        },
    },
})

export const { changeUserStatus } = userSlice.actions
export default userSlice.reducer