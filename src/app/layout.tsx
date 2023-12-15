import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import '../styles/globals.css'
import { AppContextProvider } from '@/contexts/app'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Duotech',
}

interface LocaleLayoutParams {
  lang: string;
}
  
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: LocaleLayoutParams;
}

export default function RootLayout({children, params: {lang}} : LocaleLayoutProps) {


  return (
    <html lang={lang}>
      <body className={fredoka.className}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}