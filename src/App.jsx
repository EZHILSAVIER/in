import React from 'react';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Details from './components/Details';
import Timeline from './components/Timeline';
import Quotes from './components/Quotes';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ParallaxBackground from './components/ParallaxBackground';

function App() {
  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-rose-gold selection:text-white relative">
      <Cursor />
      <ParallaxBackground />
      <div className="relative z-10">
        <Hero />
        <Quotes />
        <Carousel />
        <Details />
        <Timeline />
        <Footer />
      </div>
    </div>
  );
}

export default App;
