import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase";

function Post({ user, imageUrl, postId, username, userAvatar, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar className="post-avatar" alt={username} src={userAvatar} />
        <h3>{username}</h3>
      </div>
      <img className="post-image" src={imageUrl} alt="" />
      <h4 className="post-text">
        <strong>{username}</strong>: {caption}
      </h4>
      <hr />
      <div className="post-comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>: {comment.text}
          </p>
        ))}
      </div>

      {user?.displayName ? (
        <form className="post-commentBox">
          <input
            className="post-input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-comment-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      ) : (
        <h5 className="post-commentBox-error">
          Login to comment on {username}'s posts.
        </h5>
      )}
    </div>
  );
}

export default Post;
