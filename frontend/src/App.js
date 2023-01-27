import { useState } from 'react';
import AppNavbar from './components/Nav/AppNavbar';

function App() {
  const [user, setUser] = useState(true);
  return (
    <div className="App">
      <AppNavbar></AppNavbar>
    </div>
  );
}

export default App;
