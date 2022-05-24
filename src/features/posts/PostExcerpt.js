import React from 'react';
import { Link } from "react-router-dom";
import { selectPostById } from './postsSlice';
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { useSelector } from 'react-redux';

const PostExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article className='post-excerpt'>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user}/>
            <TimeAgo timestamp={post.date}/>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className='button muted-button'>
                View Post
            </Link>
            <ReactionButtons post={post}/>
        </article>
    );
};

export default React.memo(PostExcerpt);
