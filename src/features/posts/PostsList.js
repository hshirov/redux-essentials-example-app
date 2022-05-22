import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';
import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    const content = postStatus === 'loading'
        ? <Spinner text='Loading...' />
        : postStatus === 'failed'
            ? <div>{error}</div>
            : orderedPosts.map(post => <PostExcerpt post={post} key={post.id} />);
            
    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
};

export default PostsList;
