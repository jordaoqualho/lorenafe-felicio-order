# 🍬 Lorena Felicio – Online Order System

A modern, mobile-first order and quote system designed for Lorena Felicio. This software is tailored for self-service by customers of my mother's real-world candy store, both in-person and online.

## About the System

This app was created to make it easy for customers to choose, quote, and send orders for artisanal sweets. The goal is to provide a simple, fast, and intuitive experience for all clients, whether on mobile or desktop.

- **Self-service**: Customers build their own order, no manual assistance needed.
- **Instant quote**: The total price is calculated in real time, with itemized details.
- **Easy sending**: Orders can be sent directly to the store's WhatsApp.
- **Mobile-first**: Optimized for phones, with large buttons and smooth navigation.
- **Perfect for physical stores and delivery**: Great for counter service, events, parties, and takeout.

## Main Features

- Fast search by sweet name
- Category filters (Brigadeiros, Finos, Copinhos, etc.)
- Quantity selection with tap or quick input
- Always-visible order summary
- Sticky summary bar on mobile
- Automatic WhatsApp message generation
- Optional event/delivery date
- Total items and final value
- Accessibility and improved contrast

## How to Use

1. **Choose your sweets**: Browse categories or use the search.
2. **Select quantities**: Tap + and – or edit quickly.
3. **See your summary**: The order appears on the side (desktop) or in the sticky bar (mobile).
4. **Add the date**: (optional) Enter the event/delivery date.
5. **Send your order**: Click “Send to WhatsApp” to finish.

## Technologies

- **Next.js 14** (modern React, App Router)
- **TypeScript**
- **Tailwind CSS** (clean, responsive design)
- **LocalStorage** (order is not lost on refresh)

## Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lorenafe-felicio-order.git
   cd lorenafe-felicio-order
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # Reusable React components
│   ├── MobileStickyBar.tsx
│   ├── QuoteSummary.tsx
│   ├── SearchBar.tsx
│   └── SweetItem.tsx
└── data/
    └── sweets.ts       # Sweets list and categories
```

## Customization

- **Add/edit sweets**: Edit `src/data/sweets.ts`.
- **Change prices/categories**: Same file.
- **Colors and branding**: Edit `tailwind.config.js`.

## License

MIT. Free to use for other candy shops, but made with love for Lorena Felicio Confeitaria.

---

**Made to make life easier for customers and for my mother, the candy maker!** 🍬
