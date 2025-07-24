/** @type {import('tailwindcss').Config} */ 
module.exports = { 
  content: [ 
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
  ], 
  theme: { 
    extend: { 
      colors: { 
        'brand-background': '#F8F5F2', // The off-white background from the image 
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
  plugins: [], 
};