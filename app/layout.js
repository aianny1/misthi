import { Syne, Manrope, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { site, profile, about, faq } from '@/data/content';

// Syne for display, Manrope for reading, JetBrains Mono for labels, Instrument Serif italic for accents.
const display = Syne({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

const fontVars = [display, body, mono, serif].map((f) => f.variable).join(' ');

const shareImage = { url: '/media/portrait-red.webp', width: 518, height: 825, alt: `${profile.name}, ${profile.role} in ${profile.city}` };

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    url: '/',
    siteName: `${profile.name} · ${profile.role}`,
    title: site.title,
    description: site.description,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [shareImage.url],
  },
};

export const viewport = { themeColor: '#05060B' };

// Structured data so search engines understand who Mishthi is and can show the FAQ.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role,
      description: about.lead,
      url: site.url,
      image: new URL(shareImage.url, site.url).href,
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: profile.city, addressRegion: 'Rajasthan', addressCountry: 'IN' },
      sameAs: [`https://instagram.com/${profile.instagram}`],
      knowsAbout: ['UGC', 'Instagram Reels', 'Influencer marketing', ...about.categories],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={fontVars}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
