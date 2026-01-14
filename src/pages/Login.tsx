import React from 'react';
import { Authenticator, useTheme, View, Text, Heading, Button, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    // Redirect to home if already authenticated
    React.useEffect(() => {
        if (authStatus === 'authenticated') {
            navigate('/');
        }
    }, [authStatus, navigate]);

    const components = {
        Header() {
            const { tokens } = useTheme();
            return (
                <View textAlign="center" padding={tokens.space.large}>
                    <Heading level={3} color="var(--neon-cyan)">GatoTech Access</Heading>
                    <Text color="var(--text-muted)">Login to manage your high-tech feline gear</Text>
                </View>
            );
        },
    };

    return (
        <div className="login-page">
            <div className="login-container glass reveal">
                <Authenticator components={components}>
                    {({ signOut, user }) => (
                        <main className="auth-success">
                            <Heading level={1} className="neon-text">Welcome, {user?.username}!</Heading>
                            <p>You are now part of the elite feline tech community.</p>
                            <div className="auth-actions">
                                <Button onClick={() => navigate('/')} variation="primary">Return Home</Button>
                                <Button onClick={signOut} variation="link">Sign Out</Button>
                            </div>
                        </main>
                    )}
                </Authenticator>
            </div>
        </div>
    );
};

export default Login;
