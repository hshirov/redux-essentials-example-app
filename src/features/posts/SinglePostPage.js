import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Spinner } from '../../components/Spinner';
import { useGetPostQuery } from '../api/apiSlice';

const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);
    
    let content;
    if (isFetching) {
        content = <Spinner text='Loading...' />;
    } else if (isSuccess) {
        content = (
            <article className='post'>
                <h2>{post.title}</h2>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date}/>
                <p className='post-content'>{post.content}</p>
                <Link to={`/posts/edit/${post.id}`} className='button'>
                    Edit Post
                </Link>
                <ReactionButtons post={post}/>
            </article>
        );
    }

    return <section>{content}</section>
};

export default SinglePostPage;
