import { 
    createSlice,
    nanoid, 
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
};

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
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
            const post = state.entities[id];

            if (post) {
                post.title = title;
                post.content = content;
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const { postId, reaction } = action.payload;
                const post = state.entities[postId];
    
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                postsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
    }
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const response = await client.post('/fakeApi/posts', initialPost);
        return response.data;
    }
);

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
);
