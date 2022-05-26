import { useMemo } from 'react';
import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';
import { useGetPostsQuery } from '../api/apiSlice';
import classNames from 'classnames';

const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice();
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
        return sortedPosts;
    }, [posts]);

    const containerClassname = classNames('posts-container', {
        disabled: isFetching && !isLoading
    });

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
            <div className={containerClassname}>
                {content}
            </div>
        </section>
    )
};

export default PostsList;
