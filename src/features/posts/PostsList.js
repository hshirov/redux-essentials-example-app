import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectPostIds } from './postsSlice';
import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';

const PostsList = () => {
    const dispatch = useDispatch();
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    
    const orderedPostsIds = useSelector(selectPostIds);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    const content = postStatus === 'loading'
        ? <Spinner text='Loading...' />
        : postStatus === 'failed'
            ? <div>{error}</div>
            : orderedPostsIds.map(postId => <PostExcerpt postId={postId} key={postId} />);
            
    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
};

export default PostsList;
