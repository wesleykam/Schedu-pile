import { useState, useEffect } from 'react';
import AppNavbar from './components/Nav/AppNavbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupsPage from './pages/GroupsPage';
import GroupPage from './pages/GroupPage';
import HomePage from './pages/HomePage';
import Main from './pages/Main';
import { config } from './Constants';
import AboutPage from './pages/AboutPage';
import { checkUser } from './lib/fetchUser';

function App() {
  const [user, setUser] = useState({ authenticated: false, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      setUser(user);
      setLoading(false);
    }
    if (loading) {
      localCheckUser();
    }
  }, [loading, user]);

  return (
    <div className="App">
      <AppNavbar user={user} />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage user={user} />} />
          <Route path="/home" element={<HomePage user={user} />} />
          <Route path="/groups" element={<GroupsPage user={user} />} />
          <Route path="/groups/:id" element={<GroupPage user={user} />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
