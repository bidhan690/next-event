import {useState, useEffect, useContext} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../../store/notification-context';

function Comments(props) {
  const {eventId} = props;
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState([]);
  const [loadingComments, isLoadingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      isLoadingComments(true);
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComment(data.comments);
          isLoadingComments(false);
        });
      
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Posting!',
      message: 'Posting.......',
      status: 'pending',
    });
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) =>
        notificationCtx.showNotification({
          title: 'Posted!',
          message: 'Successfully posted comment',
          status: 'success',
        })
      );

    await fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then((data) => {
        setComment(data.comments);
        
      });
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loadingComments && <CommentList items={comment} />}
      {showComments && loadingComments && <p>Loading....</p>}
    </section>
  );
}

export default Comments;
