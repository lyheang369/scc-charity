import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Impact from './components/Impact';
import EventDetails from './components/EventDetails';
import HowToHelp from './components/HowToHelp';
import Gallery from './components/Gallery';
import Organizers from './components/Organizers';
import Team from './components/Team';
import Footer from './components/Footer';
import DonatePage from './pages/DonatePage';

function usePage() {
  const [page, setPage] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return page;
}

export default function App() {
  const page = usePage();

  if (page === '#donate') return <DonatePage />;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Impact />
        <EventDetails />
        <HowToHelp />
        {/* <Gallery /> */}
        <Team />
        <Organizers />
      </main>
      <Footer />
    </>
  );
}
