import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment:String) => void;
}

export const Comment = ({content, onDeleteComment}:CommentProps) => {

    const [likeCount, setLikeCount] = useState(0);

    const handleDeleteComment = () => {
        onDeleteComment(content)
    }

    const handleLikeComment = () => {
        setLikeCount((likeCount) => {
            return likeCount + 1;
        });
    }

    return(
        <div className={styles.comment}>
            <Avatar
                hasBorder={false} 
                src='https://gitlab.com/uploads/-/system/user/avatar/7423453/avatar.png'
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Guilherme Mai</strong>
                            <time title='14 de Fevereiro às 19:45' dateTime='2023-02-14 19:47:00'>Cerca de uma hora atrás</time>
                        </div>
                        <button 
                            onClick={handleDeleteComment}
                            title='Deletar comentário'
                        >
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}