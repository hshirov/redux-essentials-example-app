import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const PostsList = () => {
    const posts = useSelector(state => state.posts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {orderedPosts.map(post => (
                <article className='post-excerpt' key={post.id}>
                    <h3>{post.title}</h3>
                    <PostAuthor userId={post.user}/>
                    <TimeAgo timestamp={post.date}/>
                    <p className='post-content'>{post.content.substring(0, 100)}</p>
                    <Link to={`/posts/${post.id}`} className='button muted-button'>
                        View Post
                    </Link>
                    <ReactionButtons post={post}/>
                </article>
            ))}
        </section>
    )
};

export default PostsList;
