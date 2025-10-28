import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';

function AboutTab({ userData }) {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Profile Created
          </Typography>
          <Typography variant="body1" paragraph>
            {new Date(userData.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Last Updated
          </Typography>
          <Typography variant="body1" paragraph>
            {new Date(userData.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Grid>
        {userData.blog && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Website
            </Typography>
            <Link href={userData.blog} target="_blank">
              {userData.blog}
            </Link>
          </Grid>
        )}
        {userData.twitter_username && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Twitter
            </Typography>
            <Link href={`https://twitter.com/${userData.twitter_username}`} target="_blank">
              @{userData.twitter_username}
            </Link>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Public Gists
          </Typography>
          <Typography variant="body1">
            {userData.public_gists}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutTab;