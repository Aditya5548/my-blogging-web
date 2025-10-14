import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {ThemeProvider} from 'next-themes';
import Thememenus from '../Components/Thememenus';
export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Thememenus/>
      <Component {...pageProps} />
    </ThemeProvider>
  ) 
}
