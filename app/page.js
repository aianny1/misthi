'use client';
import { MotionConfig } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Formats from '@/components/Formats';
import Work from '@/components/Work';
import Insights from '@/components/Insights';
import Process from '@/components/Process';
import Quote from '@/components/Quote';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Formats />
        <Work />
        <Insights />
        <Process />
        <Quote />
        <Faq />
        <Contact />
      </main>
      <WhatsAppButton />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
