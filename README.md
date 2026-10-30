# Mishthi · UGC Portfolio

Next.js 14 + Framer Motion + Lenis. Builds to a static site (`/out`) that can be hosted free.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build into /out
```

## Edit content

Everything (bio, rates, insights numbers, contact, video list) is in `data/content.js`.

## Videos

Each reel is an MP4 plus a poster image in `public/media/work/`:

```
public/media/work/skincare.mp4
public/media/work/skincare.webp
```

The current clips were cropped from a screen recording of the Canva deck, so they are low resolution.
Before launch, replace them with the original reel exports from Instagram (same file names), ideally:

- 720×1280, H.264, no audio, 4–8 seconds
- compress: `ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart out.mp4`
- poster: `ffmpeg -ss 0.5 -i out.mp4 -frames:v 1 -q:v 80 out.webp`

To add a new reel, drop both files in and add a line to `work` in `data/content.js`.

## Photos

- `public/media/portrait-red-cut.webp`: hero portrait (transparent background, shown on a cobalt glow)
- `public/media/portrait-saree-cut.webp`: About portrait (same treatment)
- `public/media/portrait-red.webp`: social share (Open Graph) image

The site theme is midnight black (#05060B), electric cobalt (#2251FF) and acid lime (#C6FF1A).
New photos should sit in that palette: dark backdrop, cobalt rim light.

## Deploy (free)

- **Vercel:** push the folder to GitHub, import it at vercel.com, deploy. No settings needed.
- **Netlify:** build command `npm run build`, publish directory `out`.
