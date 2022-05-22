import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postUpdated } from './postsSlice';
import { useHistory } from 'react-router-dom';
import { selectPostById } from './postsSlice';

const EditPostForm = ({ match }) => {
    const { postId } = match.params;
    const post = useSelector(state => selectPostById(state, postId));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onSave = () => {
        if (title && content) {
            dispatch(postUpdated({
                id: postId,
                title,
                content
            }));          
            history.push('/');
        }
    }

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <h2>Edit a Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSave}>
                    Edit Post
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;