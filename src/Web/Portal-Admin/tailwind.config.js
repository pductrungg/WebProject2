/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D62828',
          'dark-1': '#DA3E3E',
          'dark-2': '#954444',
          'dark-3': '#B63100',
          'dark-4': '#C62828',
          'light-1': 'rgba(214, 40, 40, 0.10)',
        },
        default: '#343434',
        black: '#000000',
        gray: {
          'light-1': '#7C7A78',
          'light-2': '#D2D2D2',
          'light-3': '#848484',
          'light-4': '#ECECEC',
          'light-5': '#F1F1F1',
          'light-6': '#595959',
          'light-7': '#EEEEEE',
          'dark-1': '#343434',
          'dark-2': '#2D2D2D',
          'dark-3': '#232323',
          900: '#343434',
        },
        disabled: '#A19F9D',
        warning: '#F3B948',
        pending: '#AE8701',
        success: '#107C10',
        error: '#C62828',
        danger: '#B63100',
        stroke: '#D2D2D2',
        background: '#FFF',
        overlay: 'rgba(0, 0, 0, 0.7)',
        overlay06: 'rgba(0, 0, 0, 0.2)',
        red: {
          500: '#D62828',
          700: '#DA3E3E',
          900: '#954444',
        },
      },
      fontFamily: {
        sans: ['Signika_Negative', 'Lato', 'sans-serif'],
        serif: ['Signika_Negative', 'Lato', 'serif'],
        mono: ['Signika_Negative', 'Lato'],
      },
      screens: {
        xxs: '350px',
        xs: '545px',
        xl: '1281px',
        '3xl': '1920px',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.01em',
      },
      lineHeight: {
        tight: 1.2,
        medium: 1.4,
        snug: 1.3,
      },
      fontSize: {
        xs: ['0.75rem', '1rem'], // xs: ['12px', '16px'],
        sm: ['0.875rem', '1.25rem'], // sm: ['14px', '20px'],
        base: ['1rem', '1.375rem'], // base: ['16px', '22px'],
        lg: ['1.125rem', '1.5rem'], // lg: ['18px', '24px'],
        xl: ['1.25rem', '1.75rem'], // xl: ['20px', '28px'],
        '2xl': ['1.5rem', '2.25rem'], // '2xl': ['24px', '36px'],
        '3xl': ['1.75rem', '2.25rem'], // '3xl': ['28px', '36px'],
        '4xl': ['2rem', '2.5rem'], // '4xl': ['32px', '40px'],
        '5xl': ['2.5rem', '2.75rem'], // '5xl': ['40px', '44px'],
        '6xl': ['3rem', '3.25rem'], // '6xl': ['48px', '52px'],
      },
      boxShadow: {
        'depths-4':
          '0px 0.3px 0.9px 0px rgba(0, 0, 0, 0.10), 0px 1.6px 3.6px 0px rgba(0, 0, 0, 0.13)',
        'depths-8':
          '0px 0.6px 1.8px 0px rgba(0, 0, 0, 0.10), 0px 3.2px 7.2px 0px rgba(0, 0, 0, 0.13)',
        'depths-16':
          '0px 1.2px 3.6px 0px rgba(0, 0, 0, 0.10), 0px 6.4px 14.4px 0px rgba(0, 0, 0, 0.13)',
      },
      backdropBlur: {
        small: '2px',
      },
      borderRadius: {
        md: '5px',
        lg: '10px',
      },
    },
  },
  plugins: [],
};
