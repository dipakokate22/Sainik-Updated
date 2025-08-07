/** @type {import('tailwindcss').Config} */ 
module.exports = { 
  content: [ 
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
  ], 
  theme: { 
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: { 
        'brand-background': '#F8F5F2',
        'sidebar-background': '#FFFFFF',
        'active-menu': '#E6F4F0',
        'active-menu-border': '#10B981',
        // PREVIOUSLY: 'checkin-green': '#10B981',
        'income-green': '#22C55E',
        'expense-red': '#EF4444',
        
        // --- NEW COLORS FROM THE IMAGE ---
        'badge-green': '#2D6A4F',  // For the 'Checkin' badge and Edit button
        'delete-red': '#E5383B',  
      }, 
      animation: { 
        'infinite-scroll': 'infinite-scroll 30s linear infinite', 
        // Add a second, slightly faster animation for the second row 
        'infinite-scroll-fast': 'infinite-scroll 25s linear infinite', 
      }, 
      keyframes: { 
        'infinite-scroll': { 
          from: { transform: 'translateX(0)' }, 
          to: { transform: 'translateX(-100%)' }, 
        }, 
      }, 
    }, 
  }, 
  plugins: [
    require('tailwind-scrollbar'),
  ],
};