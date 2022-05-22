import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectPostById } from './postsSlice';

const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector(state => selectPostById(state, postId));
    
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
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
        </section>
    );
};

export default SinglePostPage;