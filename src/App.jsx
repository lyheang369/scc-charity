import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Impact from './components/Impact';
import EventDetails from './components/EventDetails';
import HowToHelp from './components/HowToHelp';
import Gallery from './components/Gallery';
import Organizers from './components/Organizers';
import Footer from './components/Footer';

export default function App() {
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
        <Organizers />
      </main>
      <Footer />
    </>
  );
}
