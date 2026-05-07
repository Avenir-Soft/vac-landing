import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
// import Preloader from './components/Preloader';
import Catalog from './pages/catalog';
import Contacts from './pages/contacts';
import Home from './pages/home';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPreloader, setShowPreloader] = useState(false);

//   useEffect(() => {
//     const hasShownPreloader = sessionStorage.getItem('hasShownPreloader');

//     if (!hasShownPreloader) {
//       setShowPreloader(true);
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleLoadingComplete = () => {
//     setIsLoading(false);
//     setShowPreloader(false);
//     sessionStorage.setItem('hasShownPreloader', 'true');
  // };

  return (
    <>
      {/* {showPreloader && isLoading && (
        <Preloader onLoadingComplete={handleLoadingComplete} duration={800} />
      )} */}
      <Router>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
