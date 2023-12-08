import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUser: localStorage.getItem("user") || false,
    userId: localStorage.getItem("userId") || ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserStatus(state, action) {
            state.isUser = action?.payload.status;
            if (action?.payload.status) {
                localStorage.setItem("user", action?.payload.status);
                localStorage.setItem("userId", action?.payload.userId);
            }
            else {
                localStorage.removeItem("user");
                localStorage.removeItem("userId");
            }
        },
    },
})

export const { changeUserStatus } = userSlice.actions
export default userSlice.reducer