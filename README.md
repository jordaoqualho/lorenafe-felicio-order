# 🍬 Lorena Felicio – Online Order System

A modern, mobile-first Progressive Web App (PWA) designed for Lorena Felicio's artisanal candy store. This application provides a seamless ordering experience with offline capabilities, instant installation, and advanced analytics.

## About the System

This PWA was created to make it easy for customers to choose, quote, and send orders for artisanal sweets. The goal is to provide a simple, fast, and intuitive experience for all clients, whether on mobile or desktop, with native app-like functionality.

- **Self-service**: Customers build their own order, no manual assistance needed
- **Instant quote**: The total price is calculated in real time, with itemized details
- **Easy sending**: Orders can be sent directly to the store's WhatsApp
- **Mobile-first**: Optimized for phones, with large buttons and smooth navigation
- **PWA capabilities**: Install as native app, offline functionality, push notifications ready
- **Perfect for physical stores and delivery**: Great for counter service, events, parties, and takeout

## Main Features

### 🛒 Ordering System
- Fast search by sweet name with real-time filtering
- Category filters (Brigadeiros, Finos, Copinhos, etc.)
- Quantity selection with tap or quick input
- Always-visible order summary with real-time updates
- Sticky summary bar on mobile for easy access
- Automatic WhatsApp message generation with order details
- Optional event/delivery date selection
- Total items and final value calculation
- Accessibility and improved contrast for all users

### 📱 Progressive Web App (PWA)
- **Native app installation** on mobile and desktop
- **Offline functionality** with service worker caching
- **App-like experience** with splash screen and icons
- **Platform-specific installation prompts** (iOS, Android, Desktop)
- **Automatic updates** and background sync
- **Push notification ready** infrastructure

### 🖼️ Visual Enhancements
- **High-quality product images** for each sweet
- **Skeleton loading states** for smooth image loading
- **Error handling** for missing images
- **Responsive image optimization** with Next.js Image component
- **Modern UI/UX** with smooth animations and transitions

### 📊 Analytics & Performance
- **Microsoft Clarity integration** for user behavior analytics
- **Production-only analytics** to avoid development noise
- **Performance monitoring** and optimization
- **SEO optimized** with proper metadata and Open Graph tags

## How to Use

### For Customers
1. **Choose your sweets**: Browse categories or use the search
2. **Select quantities**: Tap + and – or edit quickly
3. **See your summary**: The order appears on the side (desktop) or in the sticky bar (mobile)
4. **Add the date**: (optional) Enter the event/delivery date
5. **Send your order**: Click "Send to WhatsApp" to finish

### For Store Owners
1. **Install the PWA**: Click the install prompt on mobile or use browser menu on desktop
2. **Access offline**: The app works without internet connection
3. **Monitor analytics**: View user behavior and popular items through Microsoft Clarity
4. **Update content**: Modify sweets, prices, and images through the data files

## Technologies

- **Next.js 14** (modern React, App Router)
- **TypeScript** for type safety
- **Tailwind CSS** (clean, responsive design)
- **PWA capabilities** (manifest, service worker, offline support)
- **Microsoft Clarity** for analytics
- **LocalStorage** (order persistence across sessions)
- **WhatsApp API integration** for order submission

## Installation & Usage

### Development
1. Clone the repository:
   ```bash
   git clone https://github.com/jordaoqualho/lorenafe-felicio-order.git
   cd lorenafe-felicio-order
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

### Production
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with PWA meta tags
│   └── page.tsx            # Main page
├── components/             # Reusable React components
│   ├── InstallPrompt.tsx   # PWA installation component
│   ├── MobileStickyBar.tsx # Mobile order summary
│   ├── QuoteSummary.tsx    # Order summary and WhatsApp
│   ├── SearchBar.tsx       # Search and filter functionality
│   └── SweetItem.tsx       # Individual sweet card with images
└── data/
    └── sweets.ts           # Sweets list and categories

public/
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker
├── browserconfig.xml       # Windows PWA configuration
└── images/
    ├── sweets/            # Product images
    └── icons/             # PWA icons
```

## PWA Features

### Installation
- **Desktop**: Native browser install prompt or menu option
- **Mobile**: Platform-specific installation instructions
- **Development**: Test installation with development prompts

### Offline Capabilities
- **Service Worker**: Caches essential resources
- **Offline-first**: Works without internet connection
- **Background sync**: Updates when connection restored

### Analytics
- **Microsoft Clarity**: User behavior tracking
- **Production-only**: No analytics in development
- **Privacy-compliant**: Respects user preferences

## Customization

### Content Management
- **Add/edit sweets**: Edit `src/data/sweets.ts`
- **Change prices/categories**: Same file
- **Update images**: Add to `public/images/sweets/`
- **Modify PWA settings**: Edit `public/manifest.json`

### Styling & Branding
- **Colors and branding**: Edit `tailwind.config.js`
- **PWA icons**: Replace files in `public/images/icons/`
- **Theme colors**: Update in `src/app/layout.tsx`

### Analytics Configuration
- **Microsoft Clarity**: Update project ID in `src/app/layout.tsx`
- **Custom events**: Add tracking in components

## Browser Support

- **Chrome/Edge**: Full PWA support with native installation
- **Safari (iOS)**: PWA support with manual installation
- **Firefox**: PWA support with browser menu installation
- **Mobile browsers**: Platform-specific installation prompts

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Image optimization**: Automatic compression and lazy loading
- **Bundle optimization**: Tree shaking and code splitting

## License

MIT. Free to use for other candy shops, but made with love for Lorena Felicio Confeitaria.

---

**Made to make life easier for customers and for my mother, the candy maker!** 🍬

*Built with modern web technologies and PWA best practices for the best user experience.*
