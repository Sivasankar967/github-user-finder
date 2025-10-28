import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Tabs, Tab, CardContent } from '@mui/material';
import { Book, People } from '@mui/icons-material';
import { setCurrentTab } from '../Store/Store';
import RepositoryList from '../Components/RepositoryList';
import AboutTab from "../Components/AboutTab";

function TabPanel() {
  const dispatch = useDispatch();
  const { currentTab, userData } = useSelector(state => state.github);

  const handleTabChange = (event, newValue) => {
    dispatch(setCurrentTab(newValue));
  };

  return (
    <Card elevation={3}>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Repositories" icon={<Book />} iconPosition="start" />
        <Tab label="About" icon={<People />} iconPosition="start" />
      </Tabs>
      <CardContent>
        {currentTab === 0 ? <RepositoryList /> : <AboutTab userData={userData} />}
      </CardContent>
    </Card>
  );
}

export default TabPanel;