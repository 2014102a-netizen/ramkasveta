import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import Quiz from './components/sections/Quiz';
import Catalog from './components/sections/Catalog';
import CustomWorkshop from './components/sections/CustomWorkshop';
import Phygital from './components/sections/Phygital';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navigation />
      <Hero />
      <Manifesto />
      <Quiz />
      <Catalog />
      <CustomWorkshop />
      <Phygital />
      <Footer />
    </div>
  );
}

export default App;
