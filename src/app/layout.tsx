import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import '../styles/globals.css'
import { AppContextProvider } from '@/contexts/app'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Duotech',
  description: 'O melhor lugar para aprender como se tornar um dev sênior',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={fredoka.className}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
