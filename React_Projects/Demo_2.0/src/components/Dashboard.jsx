import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    Box, 
    Typography, 
    Grid, 
    Paper, 
    Avatar, 
    Button, 
    Container 
} from '@mui/material';
import { 
    UserCircle, 
    Mail, 
    Calendar, 
    LogOut 
} from 'lucide-react';

const Dashboard = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [activeSection, setActiveSection] = useState('profile');

    if (!isAuthenticated) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                    Please log in to access the dashboard
                </Typography>
            </Container>
        );
    }

    const renderProfileSection = () => (
        <Grid container spacing={3} columns={12}>
            <Grid xs={12} md={4}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 3, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center' 
                    }}
                >
                    <Avatar 
                        src={user?.photoURL || undefined} 
                        sx={{ 
                            width: 120, 
                            height: 120, 
                            mb: 2 
                        }}
                    >
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">
                        {user?.displayName || 'User'}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Paper>
            </Grid>
            <Grid xs={12} md={8}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Account Details
                    </Typography>
                    <Grid container spacing={2} columns={12}>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <UserCircle size={20} style={{ marginRight: 10 }} />
                                <Typography>
                                    User ID: {user?.uid?.slice(0, 10)}...
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Mail size={20} style={{ marginRight: 10 }} />
                                <Typography>
                                    {user?.emailVerified ? 'Email Verified' : 'Email Not Verified'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Calendar size={20} style={{ marginRight: 10 }} />
                                <Typography>
                                    Joined: {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );

    const renderActivitySection = () => (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
            </Typography>
            <Typography>
                No recent activity to display.
            </Typography>
        </Paper>
    );

    const renderSettingsSection = () => (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Account Settings
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid xs={12}>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Edit Profile
                    </Button>
                </Grid>
                <Grid xs={12}>
                    <Button 
                        variant="outlined" 
                        color="error"
                        fullWidth
                    >
                        Reset Password
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                }}
            >
                Dashboard
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<LogOut />}
                >
                    Logout
                </Button>
            </Typography>

            <Box sx={{ display: 'flex', mb: 3 }}>
                <Button 
                    variant={activeSection === 'profile' ? 'contained' : 'text'}
                    color="secondary"
                    sx={{ mr: 2 }}
                    onClick={() => setActiveSection('profile')}
                >
                    Profile
                </Button>
                <Button 
                    variant={activeSection === 'activity' ? 'contained' : 'text'}
                    color="secondary"
                    sx={{ mr: 2 }}
                    onClick={() => setActiveSection('activity')}
                >
                    Activity
                </Button>
                <Button 
                    variant={activeSection === 'settings' ? 'contained' : 'text'}
                    color="secondary"
                    onClick={() => setActiveSection('settings')}
                >
                    Settings
                </Button>
            </Box>

            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'activity' && renderActivitySection()}
            {activeSection === 'settings' && renderSettingsSection()}
        </Container>
    );
};

export default Dashboard;