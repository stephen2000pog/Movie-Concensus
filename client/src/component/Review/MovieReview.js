import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css'
import like from '../../images/like.png';
import dislike from '../../images/dislike.png';


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

  const handleLike = async (commentId) => {
    try {
      // Envoyer une requête PUT au backend pour mettre à jour le like du commentaire
      await axios.post(`http://localhost:5000/api/avis/like`, { commentId});
      
      // Mettre à jour la liste des commentaires après avoir ajouté le like
      const updatedComments = await axios.get(`http://localhost:5000/api/movie/${id}/comments`);
      setComments(updatedComments.data);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };
  
  const handleDislike = async (commentId) => {
    try {
      await axios.put(`http://localhost:5000/api/comments/${commentId}/dislike`);
      const updatedComments = await axios.get(`http://localhost:5000/api/movie/${id}/comments`);
      setComments(updatedComments.data);
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

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
                <p className="comment-email">Par: {comment.email}</p>
              </div>
              <p className="comment-text">{comment.avis}</p>
              <div className="like-dislike">
              <button className="like-button" onClick={() => handleLike(comment._id)}>
                <img src={like} alt="Like" className="like-icon" />
                </button>

                <button className="dislike-button" onClick={() => handleDislike(comment._id)}>
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
