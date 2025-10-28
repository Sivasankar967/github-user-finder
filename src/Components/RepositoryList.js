import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  Typography,
  Link,
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import { Book, Star } from '@mui/icons-material';
import { appendRepos, setPage, setHasMore } from '../Store/Store';

function RepositoryList() {
  const dispatch = useDispatch();
  const { repos, userData, page, hasMore } = useSelector(state => state.github);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef(null);
  const lastRepoRef = useRef(null);

  const loadMoreRepos = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(
        `https://api.github.com/users/${userData.login}/repos?per_page=30&page=${nextPage}&sort=updated`
      );
      const newRepos = await response.json();

      if (newRepos.length > 0) {
        dispatch(appendRepos(newRepos));
        dispatch(setPage(nextPage));
        dispatch(setHasMore(newRepos.length === 30));
      } else {
        dispatch(setHasMore(false));
      }
    } catch (err) {
      console.error('Error loading more repos:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [userData, page, hasMore, loadingMore, dispatch]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreRepos();
        }
      },
      { threshold: 0.1 }
    );

    if (lastRepoRef.current) {
      observerRef.current.observe(lastRepoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreRepos, hasMore, loadingMore]);

  if (!repos.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
        No repositories found
      </Typography>
    );
  }

  return (
    <Box>
      <List>
        {repos.map((repo, index) => (
          <Box
            key={repo.id}
            ref={index === repos.length - 1 ? lastRepoRef : null}
          >
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Box sx={{ width: '100%', mb: 1 }}>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                  underline="hover"
                >
                  <Book sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="h6" component="span">
                    {repo.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {repo.description || 'No description available'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {repo.language && (
                    <Chip label={repo.language} size="small" color="primary" variant="outlined" />
                  )}
                  <Chip
                    icon={<Star sx={{ fontSize: 16 }} />}
                    label={repo.stargazers_count}
                    size="small"
                  />
                  {repo.fork && (
                    <Chip label="Fork" size="small" variant="outlined" />
                  )}
                </Box>
              </Box>
            </ListItem>
            {index < repos.length - 1 && <Divider />}
          </Box>
        ))}
      </List>

      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={30} />
        </Box>
      )}

      {!hasMore && repos.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          No more repositories
        </Typography>
      )}
    </Box>
  );
}

export default RepositoryList;