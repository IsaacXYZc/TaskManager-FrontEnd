import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Test/Login';
import Register from './components/Test/Register';
import TaskList from './components/Test/TaskList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  )
}

export default App
