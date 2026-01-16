import React, { useState, useEffect } from 'react';
import { fetchUserAttributes, updateMFAPreference, setUpTOTP, verifyTOTPSetup } from 'aws-amplify/auth';
import { QRCodeSVG } from 'qrcode.react';
import './MFASetup.css';

interface MFASetupProps {
    onComplete?: () => void;
    onCancel?: () => void;
}

const MFASetup: React.FC<MFASetupProps> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState<'loading' | 'setup' | 'verify' | 'success' | 'error'>('loading');
    const [totpCode, setTotpCode] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        initializeMFASetup();
    }, []);

    const initializeMFASetup = async () => {
        try {
            // Get user email for QR code
            const attributes = await fetchUserAttributes();
            const email = attributes.email || 'user';
            setUserEmail(email);

            // Set up TOTP
            const totpSetupDetails = await setUpTOTP();
            const appName = 'GatoTech';
            const setupUri = totpSetupDetails.getSetupUri(appName, email);
            
            setQrCodeUrl(setupUri.href);
            setSecretCode(totpSetupDetails.sharedSecret);
            setStep('setup');
        } catch (err) {
            console.error('Error setting up MFA:', err);
            setError('Failed to initialize MFA setup. Please try again.');
            setStep('error');
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (totpCode.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        try {
            // Verify the TOTP code
            await verifyTOTPSetup({ code: totpCode });
            
            // Enable TOTP as preferred MFA method
            await updateMFAPreference({ totp: 'PREFERRED' });
            
            setStep('success');
            
            // Call onComplete after a short delay to show success message
            setTimeout(() => {
                onComplete?.();
            }, 2000);
        } catch (err: any) {
            console.error('Error verifying MFA code:', err);
            setError(err.message || 'Invalid code. Please try again.');
            setTotpCode('');
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setTotpCode(value);
    };

    if (step === 'loading') {
        return (
            <div className="mfa-setup glass">
                <div className="mfa-loading">
                    <div className="spinner"></div>
                    <p>Initializing 2FA setup...</p>
                </div>
            </div>
        );
    }

    if (step === 'error') {
        return (
            <div className="mfa-setup glass">
                <div className="mfa-error">
                    <h3>Setup Error</h3>
                    <p>{error}</p>
                    <div className="mfa-actions">
                        <button onClick={initializeMFASetup} className="btn-primary">Try Again</button>
                        {onCancel && <button onClick={onCancel} className="btn-secondary">Cancel</button>}
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="mfa-setup glass">
                <div className="mfa-success">
                    <div className="success-icon">✓</div>
                    <h3>2FA Enabled Successfully!</h3>
                    <p>Your account is now protected with two-factor authentication.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mfa-setup glass">
            {step === 'setup' && (
                <div className="mfa-setup-content">
                    <h3 className="neon-text">Set Up Two-Factor Authentication</h3>
                    <p className="mfa-description">
                        Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                    </p>

                    <div className="qr-code-container">
                        <QRCodeSVG 
                            value={qrCodeUrl} 
                            size={200}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div className="secret-key-section">
                        <p className="secret-label">Or enter this code manually:</p>
                        <code className="secret-code">{secretCode}</code>
                    </div>

                    <button 
                        onClick={() => setStep('verify')} 
                        className="btn-primary"
                    >
                        I've Scanned the Code
                    </button>
                    {onCancel && (
                        <button onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            )}

            {step === 'verify' && (
                <div className="mfa-verify-content">
                    <h3 className="neon-text">Verify Your Setup</h3>
                    <p className="mfa-description">
                        Enter the 6-digit code from your authenticator app
                    </p>

                    <form onSubmit={handleVerifyCode}>
                        <div className="code-input-container">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={totpCode}
                                onChange={handleCodeChange}
                                placeholder="000000"
                                className="totp-input"
                                autoFocus
                                maxLength={6}
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <div className="mfa-actions">
                            <button type="submit" className="btn-primary" disabled={totpCode.length !== 6}>
                                Verify & Enable 2FA
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setStep('setup');
                                    setTotpCode('');
                                    setError('');
                                }} 
                                className="btn-secondary"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MFASetup;
