import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
};

const initialState = [
    {
        id: '1',
        title: 'First Post',
        content: 'Hello',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: initialReactions
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'Hello2',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: initialReactions
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
                        user: userId,
                        reactions: initialReactions
                    }
                };
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const post = state.find(state => state.id === id);

            if (post) {
                post.title = title;
                post.content = content;
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const { postId, reaction } = action.payload;
                const post = state.find(state => state.id === postId);
    
                if (post && reaction) {
                    post.reactions[reaction]++;
                }
            },
            prepare(postId, reaction) {
                return {
                    payload: {
                        postId,
                        reaction
                    }
                };
            }
        },
    }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
