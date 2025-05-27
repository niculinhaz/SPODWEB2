import { TodoList } from './todo/TodoList'
import Login from './auth/Login'
import './css/App.css'
import './css/Login.css'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true)
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  return (
    <main>
      {isAuthenticated ? (
        <TodoList/>
      ) : (<Login onLoginSuccess={handleLogin}/>)}
    </main>
  )
}

export default App
