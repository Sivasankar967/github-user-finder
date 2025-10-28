import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import {
  setLoading,
  setUserData,
  setRepos,
  setHasMore,
  setError,
  resetState
} from '../Store/Store';

function SearchBar() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const fetchUserData = async (user) => {
    if (!user.trim()) {
      dispatch(resetState());
      return;
    }

    // Check cache
    const cached = localStorage.getItem(`user_${user}`);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < 300000) { // 5 min cache
        dispatch(setUserData(data.user));
        dispatch(setRepos(data.repos));
        dispatch(setLoading(false));
        return;
      }
    }

    dispatch(setLoading(true));
    dispatch(resetState());

    try {
      const userResponse = await fetch(`https://api.github.com/users/${user}`);
      if (!userResponse.ok) {
        throw new Error('User not found');
      }
      const userData = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=30&page=1&sort=updated`);
      const reposData = await reposResponse.json();

      dispatch(setUserData(userData));
      dispatch(setRepos(reposData));
      dispatch(setHasMore(reposData.length === 30));

      // Cache data
      localStorage.setItem(`user_${user}`, JSON.stringify({
        user: userData,
        repos: reposData,
        timestamp: Date.now()
      }));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchUserData(value);
    }, 500);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter GitHub username (e.g., sivasankar967)"
        value={username}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
        }}
      />
    </Paper>
  );
}

export default SearchBar;