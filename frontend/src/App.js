import { useState, useEffect } from 'react';
import AppNavbar from './components/Nav/AppNavbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupsPage from './pages/GroupsPage';
import GroupPage from './pages/GroupPage';
import HomePage from './pages/HomePage';
import Main from './pages/Main';

function App() {
  const [user, setUser] = useState({ authenticated: false, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetch('http://localhost:8000/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('failed to authenticate user');
        })
        .then((responseJson) => {
          setUser({
            authenticated: true,
            user: responseJson.user,
          });
        })
        .catch((error) => {
          setUser({
            authenticated: false,
            error: 'Failed to authenticate user',
          });
        });
    }
    setLoading(false);
    console.log(user);
  }, [loading, user]);

  return (
    <div className="App">
      <AppNavbar user={user} />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<HomePage user={user} />} />
          <Route
            path="/create"
            element={<CreateGroupPage user={user} loading={loading} />}
          />
          <Route path="/groups" element={<GroupsPage user={user} />} />
          <Route path="/groups/:id" element={<GroupPage user={user} />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
