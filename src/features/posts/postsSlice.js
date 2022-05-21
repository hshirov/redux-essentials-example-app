import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1',
        title: 'First Post',
        content: 'Hello',
        date: sub(new Date(), { minutes: 10 }).toISOString()
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'Hello2',
        date: sub(new Date(), { minutes: 5 }).toISOString()
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const post = state.find(state => state.id === id);

            if (post) {
                post.title = title;
                post.content = content;
            }
        }
    }
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
