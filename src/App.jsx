import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import VerbsPage from './pages/VerbsPage'
import WordsFlashcardsPage from './pages/WordsFlashcardsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/NavBar';
import WordsPracticePage from './pages/WordsPracticePage';

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
      {currentPage === 'wordsflashcard' && <WordsFlashcardsPage />}
      {currentPage === 'wordspractice' && <WordsPracticePage />}
    </div>
  )
}

export default App
