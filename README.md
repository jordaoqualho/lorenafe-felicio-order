# 🍰 Lorena Felício - Bakery Quote Generator

A modern, mobile-first quote generator for **Lorena Felício Doces & Sobremesas Artesanais**, designed to streamline the ordering process for artisanal sweets and desserts.

## ✨ Features

### 🔍 **Smart Search & Filtering**

- Real-time search by sweet name
- Category-based filtering with 7 distinct categories
- Collapsible filter options with item counts
- Empty state handling with helpful messaging

### 📱 **Mobile-First Design**

- Responsive design optimized for mobile devices
- Sticky bottom bar showing totals and quick actions
- Touch-friendly controls with proper tap targets
- Smooth scrolling and intuitive navigation

### ⚡ **Bulk Selection**

- Long press (500ms) for bulk quantity input
- Click-to-edit for quantities ≥10
- Modal-based number input for large orders
- Keyboard shortcuts (Enter/Escape) for efficiency

### 🏷️ **Organized Categories**

- **Brigadeiros Tradicionais** (11 items) - R$ 3.00-3.50
- **Brigadeiros Luxo** (11 items) - R$ 3.50-4.50
- **Doces Finos - Luxo** (12 items) - R$ 4.20-6.80
- **Trufas e Bombons** (6 items) - R$ 4.20-5.50
- **Doces Finos Decorativos** (8 items) - R$ 4.50-5.50
- **Copinhos** (6 items) - R$ 4.80-5.50
- **Lembranças** (4 items) - R$ 7.50-12.00

### 📋 **Quote Management**

- Real-time price calculation
- Detailed order summary with unit prices
- Optional delivery/event date selection
- WhatsApp integration for instant messaging
- Copy-to-clipboard functionality

### ♿ **Accessibility & UX**

- Proper focus states and keyboard navigation
- Screen reader friendly with ARIA labels
- High contrast mode support
- Reduced motion preferences respected
- Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom React components
- **State Management**: React hooks (useState, useMemo)
- **Build Tool**: Next.js built-in tooling
- **Linting**: ESLint with Next.js configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/lorenafe-felicio-order.git
   cd lorenafe-felicio-order
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── MobileStickyBar.tsx  # Mobile bottom navigation
│   ├── QuoteSummary.tsx     # Order summary sidebar
│   ├── SearchBar.tsx        # Search and filter component
│   └── SweetItem.tsx        # Individual sweet item card
└── data/
    └── sweets.ts          # Sweet data structure and categories
```

## 🎯 Usage

### For Customers

1. **Browse Sweets**: Scroll through categorized sweet options
2. **Search**: Use the search bar to find specific items
3. **Filter**: Click category filters to narrow down options
4. **Add Items**: Use + and - buttons or long press for bulk entry
5. **Review Order**: Check the quote summary on desktop or mobile sticky bar
6. **Set Date**: Optionally add delivery/event date
7. **Send Quote**: Click "Enviar para WhatsApp" or copy the message

### For Business Owner

- **Update Inventory**: Modify `src/data/sweets.ts` to add/remove items
- **Adjust Pricing**: Update prices in the sweets data structure
- **Customize Categories**: Modify categories in the same file
- **Styling**: Adjust colors and branding in `tailwind.config.js`

## 🎨 Customization

### Colors & Branding

The app uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Pink tones (#ec4899, #db2777, etc.)
- **Beige**: Warm beige tones (#f5c282, #fceacc, etc.)
- **Gradients**: Subtle gradients for backgrounds

### Adding New Sweets

1. Open `src/data/sweets.ts`
2. Add items to the `sweets` array:
   ```typescript
   {
     id: "unique-id",
     name: "Sweet Name",
     price: 4.50,
     category: "category_key"
   }
   ```
3. Update categories if needed in the `categories` object

## 📱 Mobile Features

- **Sticky Bar**: Always-visible totals and CTA button
- **Touch Gestures**: Long press for bulk selection
- **Optimized Layout**: Stack layout for narrow screens
- **Performance**: Smooth scrolling and fast interactions
- **Accessibility**: Large touch targets (44px minimum)

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (recommended)
- **Commit Messages**: Conventional commit format used

### Component Architecture

- **Atomic Design**: Components are self-contained and reusable
- **Props Interface**: All components use TypeScript interfaces
- **State Management**: Local state with React hooks
- **Performance**: Memoization where appropriate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `chore:` Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for **Lorena Felício Doces & Sobremesas Artesanais**
- Designed for Brazilian confectionery business needs
- Optimized for mobile-first customer experience

---

**Made with ❤️ for sweet moments of life** 🍰
