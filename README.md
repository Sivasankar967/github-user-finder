# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 🟣 GitHub User Finder

A modern GitHub user search application built with React, Material-UI, and Redux Toolkit. Search for any GitHub user and explore their profile, repositories, and statistics.

## ✨ Features

### Core Features
- 🔍 **Smart Search**: Debounced search with 500ms delay
- 👤 **User Profiles**: Display comprehensive user information
- 📚 **Repository List**: View all public repositories with details
- 🎨 **Material-UI Design**: Clean, professional interface using MUI components
- 🔄 **Redux Toolkit**: Efficient state management
- ⚡ **Loading States**: Smooth loading indicators
- ❌ **Error Handling**: Graceful error messages

### Bonus Features Implemented
- 🌙 **Dark/Light Mode**: Toggle between themes with persistence
- ♾️ **Infinite Scroll**: Load repositories in batches (30 per page)
- ⏱️ **Debounced Search**: Optimized API calls
- 💾 **Caching**: LocalStorage cache (5-minute TTL) to reduce API calls
- 📱 **Responsive Design**: Mobile, tablet, and desktop friendly
- 🎯 **Tab Navigation**: Switch between Repositories and About sections

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/github-user-finder.git
cd github-user-finder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.0",
    "@mui/icons-material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@reduxjs/toolkit": "^1.9.5",
    "react-redux": "^8.1.0"
  }
}
```

## 🏗️ Project Structure

```
github-user-finder/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── UserProfile.js
│   │   ├── RepositoryList.js
│   │   ├── TabPanel.js
│   │   └── AboutTab.js
│   ├── store/
│   │   ├── store.js
│   │  
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

## 🎯 Features Breakdown

### State Management (Redux Toolkit)
- Global state for user data, repositories, loading, and error states
- Efficient actions for data updates
- Page tracking for infinite scroll

### UI Components (Material-UI)
- **SearchBar**: TextField with search icon
- **UserProfile**: Card with Avatar, stats grid, and user info
- **TabPanel**: Tabs for navigation (Repositories/About)
- **RepositoryList**: Scrollable list with infinite loading
- **AboutTab**: Additional user information

### Performance Optimizations
1. **Debouncing**: 500ms delay on search input
2. **Caching**: 5-minute localStorage cache
3. **Lazy Loading**: Repositories load in batches of 30
4. **Intersection Observer**: Efficient infinite scroll

### API Integration
- User Profile: `https://api.github.com/users/{username}`
- Repositories: `https://api.github.com/users/{username}/repos?per_page=30&page={page}`

## 🎨 UI/UX Features

### Responsive Layout
- Mobile: Single column, stacked elements
- Tablet: 2-column grid for profile stats
- Desktop: Full 3-column layout with optimal spacing

### Theme Toggle
- Persistent dark/light mode
- Saved to localStorage
- Smooth transitions

### Loading States
- Skeleton screens during data fetch
- Loading indicators for infinite scroll
- Disabled states during operations

## 📝 Usage Examples

1. **Search for a user**:
   - Type "octocat" in the search bar
   - Results appear after 500ms

2. **View repositories**:
   - Scroll down to load more repos automatically
   - Click repo name to open on GitHub

3. **Toggle theme**:
   - Click the Dark/Light switch in the header
   - Theme persists across sessions

4. **View user details**:
   - Switch to "About" tab for additional info
   - Click profile link to open GitHub profile

## 🔧 Configuration

### Cache Duration
Modify cache TTL in `SearchBar.jsx`:
```javascript
if (Date.now() - data.timestamp < 300000) // 5 minutes
```

### Repositories Per Page
Adjust batch size in API calls:
```javascript
?per_page=30&page=${page}
```

### Debounce Delay
Change in `SearchBar.jsx`:
```javascript
setTimeout(() => fetchUserData(value), 500);
```

## 🐛 Error Handling

- Network errors display user-friendly messages
- 404 errors show "User not found"
- Rate limit warnings (GitHub API: 60 req/hour)
- Graceful fallbacks for missing data






