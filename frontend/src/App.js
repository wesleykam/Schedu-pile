import { useState, useEffect } from 'react';
import AppNavbar from './components/Nav/AppNavbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupsPage from './pages/GroupsPage';

import { Button } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState({ authenticated: false, user: null });
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    const response = fetch('http://localhost:8000/api/user', {
      method: 'PATCH',
      body: JSON.stringify(user.user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to fetch events');
    }).then((responseJson) => {
      console.log(responseJson);
    })
  }

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
    console.log(user);
    setLoading(false);
  }, [loading]);

  return (
    <div className="App">
      <AppNavbar user={user} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateGroupPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </Router>
      <Button onClick={getEvents}>Get Events</Button>
    </div>
  );
}

export default App;
