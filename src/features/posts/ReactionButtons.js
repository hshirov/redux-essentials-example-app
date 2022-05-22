import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
};

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const onReactionClick = (reactionName) => {
        dispatch(reactionAdded(post.id, reactionName));
    };

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                className='muted-button reaction-button'
                onClick={() => onReactionClick(name)}
            >
                {emoji} {post.reactions[name]}
            </button>
        );
    });

    return <div>{reactionButtons}</div>
};

export default ReactionButtons;