import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserById } from '../users/usersSlice';
import { selectAllPosts } from '../posts/postsSlice';

const UserPage = ({ match }) => {
    const { userId } = match.params;

    const user = useSelector(state => selectUserById(state, userId));
    const postsFromUser = useSelector(state => {
        const allPosts = selectAllPosts(state);
        return allPosts.filter(post => post.user === userId);
    });

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>
                {postsFromUser.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UserPage;
