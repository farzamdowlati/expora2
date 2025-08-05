# Expora - Film Noir Interactive Landing Page

A minimalist, calm, and mystical landing page that guides users through a 3-step interactive experience to recommend experimental activities. Built with a sophisticated Film Noir aesthetic featuring smooth animations and elegant typography.

## ✨ Features

- **Film Noir Theme**: Sophisticated dark gradient background with elegant typography
- **Interactive 3-Step Questionnaire**: Engaging questions with smooth transitions
- **Responsive Design**: Adapts beautifully to all screen sizes
- **Smooth Animations**: Powered by Framer Motion for premium user experience
- **Google Fonts Integration**: Professional Montserrat and elegant Great Vibes calligraphy
- **Tailwind CSS**: Modern utility-first styling with custom color palette

## 🎨 Design Elements

- **Color Palette**:
  - Primary: Deep bluish violet (#4A5FB0)
  - Accent: Adventurous amber-yellow (#F1A909)
  - Background: Dark grey to black gradient
- **Typography**: 
  - Professional: Montserrat for navigation and body text
  - Calligraphy: Great Vibes for logo and buttons
- **Interactive Elements**: Hover effects, smooth transitions, and floating animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expora2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
expora2/
├── public/
│   └── Background.jpg          # Background image (placeholder)
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles and Tailwind directives
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Project dependencies
```

## 🎯 User Experience Flow

1. **Welcome Screen**: Central "Shall we?" button with floating animation
2. **Question 1**: "What's the weather like in your head tonight?" (8 options)
3. **Question 2**: "Who's in the frame with you tonight?" (3 options)
4. **Question 3**: "Where does your story begin?" (4 options)
5. **Recommendations**: Three stylish cards with experimental activities

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Professional typography

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.js`:
```javascript
colors: {
  'noir-primary': '#4A5FB0',
  'noir-accent': '#F1A909',
  'noir-dark': '#1a1a1a',
  'noir-darker': '#0a0a0a',
}
```

### Questions
Modify the questions array in `App.jsx` to customize the interactive experience.

### Recommendations
Update the recommendations array to change the final activity suggestions.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Experience the mystique of Film Noir with Expora - where every interaction tells a story.*
