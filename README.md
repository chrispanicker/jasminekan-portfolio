This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project media

Edit projects in the Sanity Studio at `/admin`. In a project's **Media** field, add **Image** entries for Sanity-hosted images and **Mux video** entries for videos. Drag entries by their handles to set the order shown on the site. Use **Download media** above the media list to download its Sanity images and legacy Sanity files together as a ZIP; this lets you retrieve old video files while migrating, but Mux videos are excluded. New Mux uploads use the **Basic** video quality level by default. Mux videos autoplay muted, loop, and hide their controls in the portfolio. Video playback is streamed from Mux; images continue to use Sanity. This setting does not change videos already uploaded to Mux.

The first time you add a Mux video, the Studio asks you to connect a Mux API access token. Create a token in your Mux dashboard with permission to read and write video and read data, then enter it in the Studio prompt. The Mux plugin stores the credentials in the Sanity dataset's protected `secrets.mux` document; do not put them in frontend environment variables or commit them to the repository.

Previously uploaded Sanity file videos remain available in the editor as **Legacy Sanity video (existing only)** and can still play on the site while you migrate them. For each one, upload a Mux video, reorder it into place, verify it plays, then remove the old file entry from the project.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
