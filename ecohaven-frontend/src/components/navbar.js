import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Assuming your CSS file is named this way

const Navbar = ({ isLoggedIn, onLogout }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">EcoHaven</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/feed">Community Feed</Link></li>
                <li><Link to="/sessions">Sessions</Link></li>
            </ul>
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <div className="profile-container">
                        <button onClick={handleProfileClick} className="profile-button">
                            Profile
                        </button>
                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <Link to="/profile" onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                                <button onClick={onLogout} className="logout-button">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="login-button">Login</Link>
                        <Link to="/register" className="signup-button">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;