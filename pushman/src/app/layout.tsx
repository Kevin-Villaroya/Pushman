import type { Metadata } from 'next'

import Header from 'src/components/header'

import './globals.css'


import Provider from './provider'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Pushman',
  description: 'A postman clone'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession();

  return (
    <html lang="en">
          <body className='h-screen flex flex-col'>
              <Provider session={session}>
                <Header />
                {children}
              </Provider>
        </body>
    </html>
  )
}
