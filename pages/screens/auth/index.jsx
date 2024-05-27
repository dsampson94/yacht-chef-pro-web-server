'use client';

import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import logo from '../../../images/YCPdraft-.png';

const Auth = () => {
    const router = useRouter();
    const [tab, setTab] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setError('');
        setUsername('');
        setPassword('');
        setEmail('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (tab === 0) {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result.error) setError(result.error);
            else router.push('/home');
        } else {
            try {
                await axios.post('/api/auth/signup', { username, password, email });
                setTab(0);
            } catch (error) {
                setError(error.response?.data?.error || 'An error occurred. Please try again.');
            }
        }
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 4 }} component="main" maxWidth="xs">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={logo} alt="Logo" width={80} height={80} style={{ marginTop: '16px' }} priority />
                <Typography component="h1" variant="h5">
                    {tab === 0 ? 'Sign In' : 'Sign Up'}
                </Typography>
                <Tabs value={tab} onChange={handleTabChange} centered>
                    <Tab label="Sign In" />
                    <Tab label="Sign Up" />
                </Tabs>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete={tab === 0 ? 'username' : 'new-username'}
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {tab === 1 && (
                        <TextField
                            margin="dense"
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="new-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                    <TextField
                        margin="dense"
                        size="small"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete={tab === 0 ? 'current-password' : 'new-password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {tab === 0 ? 'Sign In' : 'Sign Up'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;