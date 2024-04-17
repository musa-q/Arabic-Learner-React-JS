import { useState } from 'react'
import HomePage from './pages/HomePage'
import VerbsPage from './pages/VerbsPage'
import WordsFlashcardsPage from './pages/WordsFlashcardsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/NavBar';
import WordsPracticePage from './pages/WordsPracticePage';
import './components/Scrollbar.css'
import './App.css'
import Logger from './components/Logger';

const App = () => {
  const [currentPage, setCurrentPage] = useState('start');

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dark-background light" data-bs-theme="dark">
      <MyNavBar onNavigate={navigateToPage} />
      <Logger userPage={currentPage} setPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage onNavigate={navigateToPage} />}
      {currentPage === 'verbs' && <VerbsPage />}
      {currentPage === 'wordsflashcard' && <WordsFlashcardsPage />}
      {currentPage === 'wordspractice' && <WordsPracticePage />}
    </div>
  )
}

export default App;
