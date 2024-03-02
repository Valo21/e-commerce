import { createTheme, ThemeOptions } from "@mui/material";
import CabinRegular from '@assets/fonts/Cabin-Regular.ttf'

const commonTheme: ThemeOptions = {
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Cabin'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Cabin';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Cabin'), local('Cabin-Regular'), url(${CabinRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({theme}) => ({
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
          [theme.breakpoints.up('sm')]: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        })
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({theme}) => ({
          maxWidth: 1200,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginTop: 10,
            marginBottom: 10
          },
        })
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius
        }),
        root: {
          backdropFilter: 'blur(3px)'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({theme}) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
        })
      }
    },
    MuiPaper: {
      styleOverrides: {
        root:{
          boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({theme}) => ({
          [theme.breakpoints.up('md')]: {
            maxWidth: 'fit-content',
          },
        })
      }
    }
  }
};

export const Themes = {
  LIGHT: createTheme({
    palette: {
      mode: 'light',
      gradient: 'linear-gradient(to bottom right, #FFFFFF, #E1E5F2)',
      background: {
        default: 'hsl(200 40% 90%)',
        paper: '#FFFFFF'
      },
      primary: {
        main: 'hsl(200 57% 6.37%)',
        contrastText: 'hsl(200 4% 97.45%)'
      },
      secondary: {
        main: 'hsl(200 20% 14.7%)',
        contrastText: 'hsl(200 4% 97.45%)'
      },
    },
    ...commonTheme
  }),
  DARK: createTheme({
    palette: {
      mode: 'dark',
      gradient: 'linear-gradient(to bottom right, #16222A, #3A6073, #16222A)',
      background: {
        default: 'hsl(200 26% 4.5%)',
        paper: 'hsl(200 57% 6.37%)',
      },
      primary: {
        main: 'hsl(200 40% 49%)',
        contrastText: 'hsl(200 4% 97.45%)'
      },
      secondary: {
        main: 'hsl(200 20% 14.7%)',
        contrastText: 'hsl(200 4% 97.45%)'
      },
    },
    ...commonTheme
  })
}