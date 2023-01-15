import React, { useRef } from 'react';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';
import Features from '../../pages/Features';

import './styles.scss';

function Home() {
  const ref = useRef(null);

  return (
    <main ref={ref} className="Main">
      <Carousel title="Mostly CSS Responsive Carousel" subtitle="Carousel"/>
      <Features />
      <Footer linkHrefBootstrap="https://icons.getbootstrap.com" linkHrefLicense="https://dbushell.com" target="_blank"/>
    </main>
  );
}

export default Home;
