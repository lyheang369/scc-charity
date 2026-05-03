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
import Sponsors from './components/Sponsors';
import Team from './components/Team';
import Footer from './components/Footer';
import DonatePage from './pages/DonatePage';
import DonorsPage from './pages/DonorsPage';
import LiveDonations from './components/LiveDonations';

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
  if (page === '#donors') return <DonorsPage />;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveDonations />
        <About />
        <VisionMission />
        <Impact />
        <EventDetails />
        <HowToHelp />
        {/* <Gallery /> */}
        <Team />
        <Sponsors />
        <Organizers />
      </main>
      <Footer />
    </>
  );
}
