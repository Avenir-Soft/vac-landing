import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
// import Preloader from './components/Preloader';
import About from './pages/about';
import AboutGallery from './pages/about-gallery';
import AboutPartners from './pages/about-partners';
import CalculatorPage from './pages/calculator';
import Catalog from './pages/catalog';
import Contacts from './pages/contacts';
import Home from './pages/home';
import Prices from './pages/prices';
import Reference from './pages/reference';

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
          <Route path="/about" element={<About />} />
          <Route path="/about/partners" element={<AboutPartners />} />
          <Route path="/about/gallery" element={<AboutGallery />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
