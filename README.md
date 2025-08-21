# Aureole Pharma Tech - Next.js Website

A modern, responsive website for Aureole Pharma Tech built with Next.js 14, Tailwind CSS, and Framer Motion. This is a complete conversion from the original HTML/CSS/JavaScript website to a modern React-based application.

## 🚀 Features

### ✨ **Modern Technology Stack**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Three.js** for 3D graphics (ready for implementation)

### 🎨 **Design System**
- **Glassmorphism effects** with backdrop blur
- **Custom color palette** matching the original brand
- **Responsive design** for all devices
- **Smooth animations** and transitions
- **Interactive elements** with hover effects

### 🎯 **Key Components**
- **Preloader** with animated logo
- **Floating Navigation** with glassmorphism
- **Hero Section** with 3D molecule animation
- **About Section** with company stats
- **Values Section** with interactive AUREOLE animation
- **Custom cursor** effects
- **Particle system** animations

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error UI
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Preloader.tsx      # Animated preloader
│   ├── Navigation.tsx     # Floating navigation
│   └── sections/          # Page sections
│       ├── Hero.tsx       # Hero with 3D molecule
│       ├── About.tsx      # About section
│       └── Values.tsx     # AUREOLE values
├── lib/                   # Utility functions
│   ├── utils.ts           # Helper functions
│   ├── constants.ts       # App constants
│   └── validations.ts     # Form schemas
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
└── data/                  # Static data
    └── navigation.ts      # Navigation data
```

## 🎨 Design System

### **Colors**
- **Primary**: `#2298d2` (Blue)
- **Secondary**: `#455975` (Gray-Blue)
- **Accent**: `#01042d` (Dark Blue)
- **Dark**: `#1b243f` (Navy)
- **Background**: `#fafafb` (Light Gray)

### **Typography**
- **Inter** - Primary font for body text
- **Space Grotesk** - Secondary font for headings

### **Animations**
- **Framer Motion** for smooth transitions
- **CSS animations** for particles and effects
- **Hover effects** with scale and glow
- **Scroll-triggered animations**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd aureole-pharma-tech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Component Breakdown

### **Preloader Component**
- Animated logo with SVG paths
- Loading text with pulse animation
- Smooth fade-out transition
- 2-second display duration

### **Navigation Component**
- Floating glassmorphism design
- Responsive mobile menu
- Contact information display
- Social media links
- Smooth scroll effects

### **Hero Section**
- Full-screen gradient background
- Animated particle system
- 3D molecule visualization
- Call-to-action buttons
- Scroll indicator

### **About Section**
- Company information
- Animated statistics
- Director card with glassmorphism
- Responsive grid layout

### **Values Section**
- Interactive AUREOLE letters
- Click-to-reveal meanings
- Animated background particles
- Values grid with hover effects

## 🔧 Customization

### **Adding New Pages**
1. Create new files in `src/app/`
2. Add navigation items in `src/data/navigation.ts`
3. Update the Navigation component

### **Modifying Colors**
1. Update `tailwind.config.js` color palette
2. Modify CSS variables in `src/app/globals.css`

### **Adding Animations**
1. Use Framer Motion components
2. Add CSS animations in `globals.css`
3. Create custom keyframes

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Animation Features

### **Framer Motion Animations**
- Page transitions
- Scroll-triggered animations
- Hover effects
- Stagger animations

### **CSS Animations**
- Particle floating
- Molecule rotation
- Logo drawing
- Loading pulses

## 🔍 SEO Optimization

- **Meta tags** for all pages
- **Open Graph** support
- **Twitter Cards** integration
- **Structured data** ready
- **Performance optimized**

## 🚀 Performance Features

- **Image optimization** with Next.js Image
- **Code splitting** with dynamic imports
- **CSS optimization** with Tailwind
- **Bundle analysis** ready
- **Lighthouse** optimized

## 🔧 Development Notes

### **Migration from Original**
- ✅ All original design elements preserved
- ✅ Interactive features maintained
- ✅ Responsive design improved
- ✅ Performance optimized
- ✅ Code maintainability enhanced

### **Improvements Made**
- **Component-based architecture** for better maintainability
- **TypeScript** for type safety
- **Modern React patterns** with hooks
- **Optimized animations** with Framer Motion
- **Better accessibility** features
- **Enhanced SEO** capabilities

## 📄 License

This project is proprietary to Aureole Pharma Tech.

## 🤝 Support

For support or questions, please contact:
- **Email**: enquiry@aureolepharmatech.com
- **Phone**: +91 86005 22240

---

**Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion**
