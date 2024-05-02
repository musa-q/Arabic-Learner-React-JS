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
import {Helmet} from "react-helmet";

const App = () => {
  const [currentPage, setCurrentPage] = useState('start');

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="dark-background light" data-bs-theme="dark">
      <Helmet>
        <title>My Arabic Learner</title>
        <meta name="description" content="Ahlan wa Sahlan! This is your platform to learn and practice Arabic in the Levantine dialect. Explore our tools to improve your vocabulary and grammar!" />
        <script type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "My Arabic Learner",
            "url": "https://www.myarabiclearner.com",
            "description": "Ahlan wa Sahlan! This is your platform to learn and practice Arabic in the Levantine dialect. Explore our tools to improve your vocabulary and grammar!"
          }
          `}
        </script>
      </Helmet>
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
