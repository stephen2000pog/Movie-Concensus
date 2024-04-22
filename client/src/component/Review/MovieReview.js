import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css'
import like from '../../images/like.png';
import dislike from '../../images/dislike.png';
import { Link } from 'react-router-dom';



function CommentSection({ id }) {
    const [comments, setComments] = useState([]);
    const [likedComments, setLikedComments] = useState([]);
    const [dislikedComments, setDislikedComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movie/${id}/comments`);
        console.log(response)
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  return (
    <div className="comment-section">
      <h2>Commentaire des utilisateurs</h2> 
      {comments.length === 0 ? (
        <p>Aucun commentaire pour ce film</p>
      ) : (
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment._id} className="comment-item">
              <div className="comment-header">
                <p className="comment-rating">Note: {comment.note}/5</p>
                <p className="comment-email">
                  Par: <Link to={`/profil/${comment.email}`}>{comment.email}</Link>
                </p>
              </div>
              <p className="comment-text">{comment.avis}</p>
              <div className="like-dislike">
              <button className="like-button">
                <img src={like} alt="Like" className="like-icon" />
                </button>

                <button className="dislike-button">
                  <img src={dislike} alt="Dislike" className="dislike-icon" />
                </button>
                <p className="like-count">{comment.likes} personnes ont trouvé ce commentaire pertinent.</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentSection;
