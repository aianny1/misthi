// All of Mishthi's portfolio content lives here.
// Edit text, prices or videos in this file — the components read from it.

// Search engines and link previews. Set `url` to the live domain before launch.
export const site = {
  url: 'https://misthi-nu.vercel.app',
  title: 'Mishthi | UGC Creator & Fashion Influencer in Jaipur, India',
  description:
    'Mishthi is a Jaipur-based UGC creator, model and Instagram influencer making scroll-stopping reels, GRWMs, hauls, reviews and UGC ads for fashion, beauty, skincare and lifestyle brands across India.',
  keywords: [
    'UGC creator Jaipur',
    'UGC creator India',
    'Instagram influencer Jaipur',
    'fashion influencer Jaipur',
    'beauty content creator India',
    'UGC videos for brands',
    'Instagram reels for brands',
    'UGC ads',
    'GRWM creator',
    'skincare UGC creator',
    'model in Jaipur',
    'influencer marketing India',
  ],
};

export const profile = {
  name: 'Mishthi',
  role: 'UGC Creator & Model',
  city: 'Jaipur',
  email: 'kmishthi43@gmail.com',
  phone: '8000906733',
  whatsapp: '918000906733',
  instagram: 'mishthi04_',
};

// Website credit shown in the footer.
export const credit = { name: 'Evercon Digital', url: 'https://www.instagram.com/evercondigital' };

export const hero = {
  rotating: ['GRWMs', 'hauls', 'honest reviews', 'tutorials', 'unboxings', 'product demos', 'UGC ads'],
};

export const about = {
  hello: "Hi, I'm Mishthi.",
  lead:
    'A Jaipur-based UGC creator and model who turns products into stories people actually watch. My videos feel like a recommendation from a friend, not an ad, so viewers stop scrolling, trust what they see and remember your brand.',
  body:
    'I create Instagram reels and UGC videos for fashion, beauty, skincare, haircare and lifestyle brands, from face-to-camera reviews and get-ready-with-me videos to hauls, unboxings, tutorials and voiceover ads. Every video is shot vertical, opens with a strong hook, comes with captions, and is ready to post or run as a paid ad.',
  categories: ['Fashion', 'Ethnic wear', 'Beauty', 'Skincare', 'Haircare', 'Lifestyle'],
};

// Videos: put the MP4 + a poster image in /public/media/work and add a line here.
// Each clip is the first seconds of the reel at `url`, which Comment and Share open.
// `preview` is a small copy (id-sm.mp4) for the little players in the hero and format list.
export const work = [
  { id: 'maggie', title: 'Maggie free bowl', type: 'Unboxing', cat: 'Lifestyle', url: 'https://www.instagram.com/reel/DWJe47qE-HP/' },
  { id: 'skincare', title: 'Glass skin glow in one step', type: 'Product demo', cat: 'Skincare', brand: 'Nykaa', url: 'https://www.instagram.com/reel/DWNyZ0tkxJh/' },
  { id: 'cherry', title: 'Cherry dessert, on my skin', type: 'Review', cat: 'Beauty', brand: 'Nykaa Wanderlust', url: 'https://www.instagram.com/reel/DWyOEgBkyv7/' },
  { id: 'haircare', title: 'Almonds for hair fall?', type: 'Paid ad', cat: 'Haircare', brand: 'Hair & Care', url: 'https://www.instagram.com/reel/DfJdl17TtQ4/' },
  { id: 'daftar', title: 'Daftar fits', type: 'Office-wear haul', cat: 'Fashion', url: 'https://www.instagram.com/reel/DY7VdLgTISN/' },
  { id: 'grwm', title: 'GRWM × gossip', type: 'GRWM', cat: 'Lifestyle', brand: 'Urbaneigh', url: 'https://www.instagram.com/reel/Ddor-02TMfB/' },
  { id: 'lipbalm', title: 'Hydration, gloss and tint', type: 'Tutorial', cat: 'Beauty', brand: 'La Pink', url: 'https://www.instagram.com/reel/DVTdtAZkjPI/' },
  { id: 'lehenga', title: 'The festive lehenga edit', type: 'Styling', cat: 'Fashion', url: 'https://www.instagram.com/reel/DWZHhMhk_fK/' },
].map((w) => ({ ...w, src: `/media/work/${w.id}.mp4`, preview: `/media/work/${w.id}-sm.mp4`, poster: `/media/work/${w.id}.webp` }));

// "What I make" — each format previews one of the reels above.
export const formats = [
  { name: 'Face-to-camera UGC', note: 'Talking straight to camera, like a friend who has actually used it. The format that builds trust fastest.', clip: 'skincare' },
  { name: 'GRWM', note: 'Your product inside a real get-ready routine, so it feels lived-in, not staged.', clip: 'grwm' },
  { name: 'Hauls & try-ons', note: 'Multiple looks, honest reactions and quick cuts that keep people watching to the end.', clip: 'daftar' },
  { name: 'Product demos', note: 'Textures, swatches and close-ups: the details that turn viewers into buyers.', clip: 'lipbalm' },
  { name: 'Honest reviews', note: 'First impressions, real results and a clear verdict that people believe.', clip: 'cherry' },
  { name: 'Styling & lookbooks', note: 'Festive, ethnic and occasion wear, shot like a fashion editorial.', clip: 'lehenga' },
  { name: 'Voiceover ads', note: 'A scripted story over b-roll, built to run as a Meta or Instagram ad.', clip: 'cherry' },
];

// Numbers as shown in Mishthi's Instagram Insights screenshots.
export const insights = {
  views: 6366466,
  fromAds: 59.5,
  reached: 2823643,
  nonFollowers: 97,
  monthViews: 500214,
  monthGrowth: 312,
  profileVisits: 148760,
  linkTaps: 3444,
  topReel: [
    { label: 'Likes', value: 73100, display: '73.1K' },
    { label: 'Shares', value: 31800, display: '31.8K' },
    { label: 'Saves', value: 5000, display: '5K' },
    { label: 'Comments', value: 3900, display: '3.9K' },
    { label: 'Reposts', value: 950, display: '950' },
  ],
  gender: [
    { label: 'Women', value: 54 },
    { label: 'Men', value: 46 },
  ],
};

export const process = [
  { title: 'Brief', text: 'Share your product, campaign goal and any must-say points. A short brief is all I need to get started.' },
  { title: 'Concept', text: 'I come back with hook ideas and a short script or shot list. Nothing gets filmed until you approve it.' },
  { title: 'Shoot & edit', text: 'Filmed in vertical 9:16 and edited with captions, on-screen text and trending-style pacing that holds attention.' },
  { title: 'Delivery', text: 'Final files, ready to post or run as ads. Raw footage and extra hooks are available as add-ons.' },
];

export const rates = {
  groups: [
    {
      name: 'Instagram reels',
      items: [
        { id: 'collab-ads', label: 'Collab reel', detail: 'With ad rights, 1–3 months', price: 8000 },
        { id: 'collab', label: 'Collab reel', detail: 'Without ad rights', price: 6000 },
        { id: 'solo-ads', label: 'Non-collab reel', detail: 'With ad rights, 1–3 months', price: 6500 },
        { id: 'solo', label: 'Non-collab reel', detail: 'Without ad rights', price: 5000 },
      ],
    },
    {
      name: 'UGC & posts',
      items: [
        { id: 'ugc', label: 'UGC video', detail: 'Ad rights included, 1–3 months', price: 5000 },
        { id: 'carousel', label: 'Carousel post', detail: 'With ad rights, 1–3 months', price: 3000 },
        { id: 'vstory', label: 'Video story', detail: 'Instagram story', price: 1000 },
        { id: 'sstory', label: 'Static story', detail: 'Instagram story', price: 700 },
      ],
    },
    {
      name: 'Add-ons',
      items: [
        { id: 'photos', label: 'UGC photos', detail: 'Added to a main deliverable', price: 2000 },
        { id: 'raw', label: 'Raw footage', detail: 'Added to a main deliverable', price: 1500 },
        { id: 'hooks', label: 'Hook & CTA variations', detail: 'Added to a main deliverable', price: 1000 },
      ],
    },
  ],
  note: 'Tips & tricks content is priced on request. Planning a bigger campaign? Send me your package and I will put together the best bundle price.',
};

export const faq = [
  {
    q: 'What is UGC, and how is it different from influencer posts?',
    a: 'UGC (user-generated content) is a video made for your brand to post on its own page or run as an ad. An influencer post goes live on my Instagram to reach my audience. I do both, and they can be combined in one package.',
  },
  {
    q: 'What does “ad rights” mean?',
    a: 'Your brand can run the video as a paid ad, for example on Meta, for 1–3 months. Without ad rights the content is for organic posting only.',
  },
  {
    q: 'What is the difference between a collab and a non-collab reel?',
    a: 'A collab reel is published as an Instagram Collab, so it shows on both your profile and mine. A non-collab reel is published from one profile only.',
  },
  {
    q: 'Do you work with brands outside Jaipur?',
    a: 'Yes, I work with brands across India. Ship the product to me in Jaipur and everything else, from concept to final edit, is handled remotely.',
  },
  {
    q: 'Can we get raw footage or extra hooks?',
    a: 'Yes, as add-ons: raw footage at ₹1,500 and hook & CTA variations at ₹1,000, on top of a main deliverable.',
  },
  {
    q: 'Do you offer bundle pricing?',
    a: 'Yes. Build a rough quote above and send it on WhatsApp, and we will shape a bundle around your campaign.',
  },
];
