# MediaWave 🌊

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://media-waves.vercel.app)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js-purple.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**MediaWave** is a powerful, user-friendly web application that allows you to download images and videos from popular social media platforms including Instagram, Facebook, Twitter, TikTok, and YouTube.

📱 **Live Demo**: [media-waves.vercel.app](https://media-waves.vercel.app)

![MediaWave Screenshot](public/og-image.png)

## ✨ Features

- **Multi-Platform Support**: Download from Instagram, Facebook, Twitter, TikTok, and YouTube
- **One-Click Downloads**: Simply paste a URL and click download
- **Media Preview**: View images and videos before downloading
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode Support**: Toggle between light and dark themes
- **PWA Ready**: Install as a standalone app on your device
- **No Watermarks**: Clean, original quality downloads
- **Fast Processing**: Optimized for speed and reliability

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: [Geist](https://vercel.com/font) (Sans and Mono)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **HTML Parsing**: [Cheerio](https://cheerio.js.org/)
- **Loading States**: [React Spinners](https://www.davidhu.io/react-spinners/)
- **Hosting**: [Vercel](https://vercel.com/)

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/khadka27/easy-downloader.git
cd easy-downloader
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required for production deployment
NEXT_PUBLIC_SITE_URL=https://media-waves.vercel.app
```

## 🧩 Project Structure

```
mediawave/
├── app/
│   ├── api/
│   │   ├── download/
│   │   │   └── route.ts   # API for extracting media URLs
│   │   └── fetch-media/
│   │       └── route.ts   # API for fetching and serving media
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main app page
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO robots file
│   ├── sitemap.xml        # SEO sitemap
│   └── [icons]            # Various app icons
└── [config files]         # Next.js, TypeScript, and package configs
```

## 🔍 How It Works

1. The user pastes a social media URL into the input field
2. The app sends the URL to the `/api/download` endpoint
3. The endpoint uses platform-specific extraction to find the media URL
4. The media is displayed for preview in the UI
5. When the user clicks "Save to device", the app fetches the media through `/api/fetch-media` endpoint
6. The media is downloaded directly to the user's device

## 📱 Progressive Web App

MediaWave can be installed as a Progressive Web App on supported devices:

1. Visit [media-waves.vercel.app](https://media-waves.vercel.app) in a supported browser
2. Look for the "Add to Home Screen" option in your browser menu
3. Follow the prompts to install the app

## 🌙 Dark Mode

MediaWave automatically adapts to your system's color scheme preference, but you can also manually toggle between light and dark modes using the theme switcher in the UI.

## ⚠️ Limitations

- The app relies on meta tags to extract content, which might not work for all posts
- Some platforms may block or limit scraping attempts
- YouTube extraction provides thumbnails only, not full videos
- Direct video downloads may not work on all browsers due to platform restrictions

## 🔜 Roadmap

- [ ] Add support for more platforms (Reddit, Pinterest, etc.)
- [ ] Implement server-side extraction for more reliable downloads
- [ ] Add batch download functionality
- [ ] Create browser extension version
- [ ] Implement user accounts for download history
- [ ] Add analytics for download statistics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for hosting the application
- All the open-source libraries that made this project possible

---

Made with ❤️ by [Abishek Khadka]
