import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Link,
  CircularProgress,
  Alert
} from '@mui/material';
import { LocationOn, Business, Link as LinkIcon } from '@mui/icons-material';
import TabPanel from './TabPanel';

function UserProfile() {
  const { userData, loading, error } = useSelector(state => state.github);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        {error}
      </Alert>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Search for a GitHub user to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={userData.avatar_url}
                alt={userData.name}
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {userData.name || userData.login}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                @{userData.login}
              </Typography>
              <Link href={userData.html_url} target="_blank" sx={{ display: 'inline-flex', alignItems: 'center', mt: 1 }}>
                <LinkIcon sx={{ mr: 0.5, fontSize: 18 }} />
                View Profile
              </Link>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {userData.bio || 'No bio available'}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  {userData.location && (
                    <Chip icon={<LocationOn />} label={userData.location} size="small" />
                  )}
                  {userData.company && (
                    <Chip icon={<Business />} label={userData.company} size="small" />
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold">
                      {userData.public_repos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Repositories
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold">
                      {userData.followers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold">
                      {userData.following}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TabPanel />
    </>
  );
}

export default UserProfile;