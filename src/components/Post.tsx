import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    avatarUrl: string;
    name: string;
    role: string
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}


export interface PostProps {
    author: Author;
    content: Content[];
    publishedAt: Date;
}


export const Post = ({ author, content, publishedAt}:PostProps) => {
    
    const [comments, setComments] = useState<string[]>([]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatter = format(publishedAt, 
        "d 'de' LLLL 'às' H:mm'h'", 
        {locale: ptBr})

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true,
    })

    const handleCreateNewComment = (e:FormEvent) => {
        e.preventDefault();

        setComments(
           [...comments, newCommentText]
        )
        setNewCommentText('');
    }

    const handleNewCommentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        e.target.setCustomValidity('')
        setNewCommentText(e.target.value);
    }

    const handleNewCommentInvalid = (e:InvalidEvent<HTMLTextAreaElement>) => {
        e.target.setCustomValidity('Preenche essa porra')
    }

    const deleteComment = (commentToDelete:String) => {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        src={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatter} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if(line.type=== "paragraph") {
                        return <p key={line.content}>{line.content}</p>
                    } else if(line.type=== 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name='comment' 
                    placeholder='Digite sua comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment}
                            onDeleteComment={deleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    )
}