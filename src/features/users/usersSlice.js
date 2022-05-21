import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Tim Doe' },
    { id: '3', name: 'Aaron Doe' }
];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export default userSlice.reducer;
