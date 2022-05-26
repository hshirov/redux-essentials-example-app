import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { useAddNewPostMutation } from '../api/apiSlice';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSave = async () => {
        if (canSave) {
            try {
                await addNewPost({ title, content, user: userId }).unwrap()
            } catch (err) {
                console.log(err);
            } finally {
                setTitle('');
                setContent('');
                setUserId('');
            }
        }
    };

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor='postAuthor'>Author:</label>
                <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                    <option value=''></option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSave} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
