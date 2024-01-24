'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const inter = Inter({ subsets: ['latin'] })



const theme = createTheme({
  palette: {
    primary: {
      main: '#299D91'
    },
    background: {
      default: '#F4F5F7'
    },
  },
  typography: {
    fontFamily: [ 'Poppins','sans-serif'].join(','),
    h1: {
        fontFamily: [ 'Poppins','sans-serif'].join(','),
        fontSize: '40px',
        fontWeight: '500',
        lineHeight: '32px',
        letterSpacing: '0.08rem'
    },
    h2: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '28px',
      letterSpacing: '0.0'
    }
  },

})

export default function RootLayout({ children }) {
  return (
    < ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
