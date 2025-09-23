import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/feed.css';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
    const [showCreatePost, setShowCreatePost] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/community/posts/');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await api.post(`/community/posts/${postId}/like/`);
            setPosts(posts.map(post =>
                post.id === postId
                    ? { ...post, likes_count: response.data.likes_count, is_liked: response.data.liked }
                    : post
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/community/posts/', newPost);
            setPosts([response.data, ...posts]);
            setNewPost({ title: '', content: '', tags: [] });
            setShowCreatePost(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    if (loading) {
        return (
            <div className="feed-container">
                <div className="loading-spinner-container">
                    <motion.div
                        className="eco-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        🌱
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            {/* Header */}
            <motion.header
                className="feed-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>🌍 EcoHaven Community</h1>
                <motion.button
                    className="create-post-btn"
                    onClick={() => setShowCreatePost(!showCreatePost)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ✨ Share Your Journey
                </motion.button>
            </motion.header>

            {/* Create Post Modal */}
            <AnimatePresence>
                {showCreatePost && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCreatePost(false)}
                    >
                        <motion.div
                            className="create-post-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Share Your Eco Journey</h3>
                            <form onSubmit={handleCreatePost}>
                                <input
                                    type="text"
                                    placeholder="Post title..."
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                    required
                                />
                                <textarea
                                    placeholder="What's your eco story today?"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                    required
                                />
                                <div className="modal-actions">
                                    <button type="button" onClick={() => setShowCreatePost(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit">Share</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Posts Feed */}
            <div className="posts-container">
                <AnimatePresence>
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="post-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="post-header">
                                <div className="author-info">
                                    <div className="avatar">
                                        {post.author.avatar ? (
                                            <img src={post.author.avatar} alt={post.author.username} />
                                        ) : (
                                            <div className="avatar-placeholder">
                                                {post.author.username[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4>{post.author.username}</h4>
                                        <p className="eco-score">🌱 {post.author.eco_score} Eco Points</p>
                                    </div>
                                </div>
                                <span className="post-date">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="post-content">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>

                                {post.tags.length > 0 && (
                                    <div className="post-tags">
                                        {post.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                )}

                                {post.image && (
                                    <img src={post.image} alt="Post" className="post-image" />
                                )}
                            </div>

                            <div className="post-actions">
                                <motion.button
                                    className={`like-btn ${post.is_liked ? 'liked' : ''}`}
                                    onClick={() => handleLike(post.id)}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {post.is_liked ? '💚' : '🤍'} {post.likes_count}
                                </motion.button>

                                <button className="comment-btn">
                                    💬 {post.comments.length}
                                </button>

                                <div className="eco-impact">
                                    🌍 Impact Score: {post.eco_impact_score}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Feed;
