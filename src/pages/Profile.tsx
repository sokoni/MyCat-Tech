import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes, signOut, fetchMFAPreference, updateMFAPreference } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import MFASetup from '../components/MFASetup';
import './Profile.css';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mfaEnabled, setMfaEnabled] = useState(false);
    const [showMFASetup, setShowMFASetup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authStatus !== 'authenticated') {
            navigate('/login');
            return;
        }
        loadUserData();
    }, [authStatus, navigate]);

    const loadUserData = async () => {
        try {
            // Fetch user attributes
            const attributes = await fetchUserAttributes();
            setUserEmail(attributes.email || '');
            setUsername(attributes.email?.split('@')[0] || 'User');

            // Check MFA status
            const mfaPreference = await fetchMFAPreference();
            const isMfaEnabled = mfaPreference?.preferred === 'TOTP' || mfaPreference?.enabled?.includes('TOTP');
            setMfaEnabled(isMfaEnabled || false);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleEnableMFA = () => {
        setShowMFASetup(true);
    };

    const handleDisableMFA = async () => {
        if (!confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
            return;
        }

        try {
            await updateMFAPreference({ totp: 'DISABLED' });
            setMfaEnabled(false);
            alert('Two-factor authentication has been disabled.');
        } catch (error) {
            console.error('Error disabling MFA:', error);
            alert('Failed to disable 2FA. Please try again.');
        }
    };

    const handleMFASetupComplete = () => {
        setShowMFASetup(false);
        setMfaEnabled(true);
    };

    const handleMFASetupCancel = () => {
        setShowMFASetup(false);
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-container glass">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container glass reveal">
                <h1 className="neon-text">Profile Settings</h1>
                
                <div className="profile-section">
                    <h2>Account Information</h2>
                    <div className="info-card glass">
                        <div className="info-row">
                            <span className="info-label">Username:</span>
                            <span className="info-value">{username}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{userEmail}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Security Settings</h2>
                    <div className="security-card glass">
                        <div className="security-header">
                            <div>
                                <h3>Two-Factor Authentication (2FA)</h3>
                                <p className="security-description">
                                    Add an extra layer of security to your account with authenticator apps.
                                </p>
                            </div>
                            <div className="mfa-status">
                                {mfaEnabled ? (
                                    <span className="status-badge enabled">Enabled ✓</span>
                                ) : (
                                    <span className="status-badge disabled">Disabled</span>
                                )}
                            </div>
                        </div>

                        {!showMFASetup && (
                            <div className="security-actions">
                                {mfaEnabled ? (
                                    <button onClick={handleDisableMFA} className="btn-danger">
                                        Disable 2FA
                                    </button>
                                ) : (
                                    <button onClick={handleEnableMFA} className="btn-primary">
                                        Enable 2FA
                                    </button>
                                )}
                            </div>
                        )}

                        {showMFASetup && (
                            <MFASetup 
                                onComplete={handleMFASetupComplete}
                                onCancel={handleMFASetupCancel}
                            />
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    <button onClick={() => navigate('/')} className="btn-secondary">
                        Back to Home
                    </button>
                    <button onClick={handleSignOut} className="btn-signout">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
