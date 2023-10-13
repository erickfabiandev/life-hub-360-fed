import SessionAuthProvider from '@/context/SessionAuthProvider'
import './globals.scss'
import type { Metadata } from 'next'
import { Sacramento, Poppins } from 'next/font/google'
import { SideBarProvider } from '@/context/SideBarContext'
import Head from 'next/head'

const poppins = Poppins(
  {
    weight: '300',
    subsets: ['latin'],
    variable: '--poppins-default'
  }
)
const sacramento = Sacramento(
  {
    weight: '400',
    subsets: ['latin'],
    variable: '--sacramento-default'
  }
)

export const metadata: Metadata = {
  title: 'LifeHub360',
  description: 'LIFEHUB360 es tu plataforma de gestión personal para organizar tu vida y tus tareas diarias de manera eficiente.',
  icons: {
    icon: ['/icon-life-hub.ico?v=4']
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>

      </Head>
      <body className={`${poppins.variable} ${sacramento.variable} ${poppins.className}`}>
        <SessionAuthProvider>
          <SideBarProvider>
            {children}
          </SideBarProvider>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
