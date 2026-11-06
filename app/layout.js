import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { site, profile, about, faq, formats } from '@/data/content';

// Syne for display, Manrope for reading, JetBrains Mono for labels, Instrument Serif italic for accents.
// The font files live in app/fonts, so the site needs neither Google nor the internet to build or run.
const display = localFont({ src: './fonts/syne-latin-wght-normal.woff2', weight: '400 800', variable: '--font-display', display: 'swap' });
const body = localFont({ src: './fonts/manrope-latin-wght-normal.woff2', weight: '200 800', variable: '--font-body', display: 'swap' });
const mono = localFont({ src: './fonts/jetbrains-mono-latin-wght-normal.woff2', weight: '100 800', variable: '--font-mono', display: 'swap' });
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const fontVars = [display, body, mono, serif].map((f) => f.variable).join(' ');

const shareImage = { url: '/media/share.jpg', width: 1200, height: 630, alt: `${profile.name}, ${profile.role} in ${profile.city}` };

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
      makesOffer: formats.map((f) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: f.name, description: `${f.note} Best for: ${f.best}` },
      })),
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
        {/* Visitor counts in the Vercel dashboard (Analytics tab); it only reports once enabled there */}
        <Analytics />
      </body>
    </html>
  );
}
