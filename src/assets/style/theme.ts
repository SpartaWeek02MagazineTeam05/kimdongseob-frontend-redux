const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`,
  },
  size: {
    sm: "1.4rem",
    base: "1.6rem",
    lg: "2rem",
    xl: "2.5rem",
    title: "6rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const colors = {
  red: "#ff4d4d",
  yellow: "#ffff4d",
  blue: "#0099ff",
  gray50: '#F9FAFB',
  gray100: '#F6F7FB',
  gray200: '#EEF1F7',
  gray300: '#E6EAF4',
  gray400: '#CBD2E3',
  gray500: '#B5BCCD',
  gray600: '#858DA3',
  gray700: '#686C7E',
  gray800: '#363A4C',
  gray900: '#171F31',
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const lightThemeColors = {
  ...colors,
  primary: "#0095ff",
  secondary: "#848B9F",
  tertiary: "#808080",
  black: '#333',
  white: '#fff',
  globalBg:'#F6F7FB',
  grayBg:'#f7f8fc',
};

const darkThemeColors = {
  ...colors,
  primary: "#00d9ff",
  secondary: "#b5bfdb",
  tertiary: "#d4d0c4",
  black: '#fff',
  white: '#333',
  globalBg:'#333',
  grayBg:'#454545',
};

const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
};

export const darkTheme = {
  ...defalutTheme,
  colors: darkThemeColors,
};

export const lightTheme = {
  ...defalutTheme,
  colors: lightThemeColors,
};