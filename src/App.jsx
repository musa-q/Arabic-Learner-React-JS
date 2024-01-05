import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import VerbsPage from './pages/VerbsPage'
import WordsPage from './pages/WordsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/NavBar';
import ChooseWordsPage from './pages/ChooseWordsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dark-background" data-bs-theme="dark">
      <MyNavBar onNavigate={navigateToPage} />
      {currentPage === 'home' && <HomePage onNavigate={navigateToPage} />}
      {currentPage === 'verbs' && <VerbsPage />}
      {currentPage === 'words' && <WordsPage />}
    </div>
  )
}

export default App
