import React from 'react'
import moment from 'moment'
import {Comment , Image} from 'semantic-ui-react';
import styles from './message.module.css';

const Message = ({ message }) => {

    const timeFromNow = (timestamp) => moment(timestamp).fromNow();

    const isMedia = (message) => message.hasOwnProperty("image")

    console.log(message)

    return (
        <Comment>
            <Comment.Avatar src = {message.user.avatar}></Comment.Avatar>
            <Comment.Content>
                <Comment.Author as = "a">{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
                {
                    isMedia(message) ? (<Image className={styles.image} src={message.image}></Image>) : (<Comment.Text>{message.content}</Comment.Text>)
                }
               
            </Comment.Content>
        </Comment>
    )
}

export default Message
