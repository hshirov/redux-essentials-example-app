import { useMemo } from 'react';
import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';
import { useGetPostsQuery } from '../api/apiSlice';

const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice();
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
        return sortedPosts;
    }, [posts]);

    const content = isLoading
        ? <Spinner text='Loading...' />
        : isError
            ? <div>{error.toString()}</div>
            : isSuccess
                ? sortedPosts.map(post => <PostExcerpt post={post} key={post.id} />)
                : null;
            
    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
};

export default PostsList;
