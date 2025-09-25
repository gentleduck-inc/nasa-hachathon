import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
import { ReactQueryProvider, ThemeProvider } from '~/providers/react-query'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description: 'acme acme',
  title: 'acme',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = cookies().then((res) => res.get('connect.sid'))
  if (!cookie) redirect('/login')

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 antialiased min-h-svh`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableColorScheme enableSystem>
          <ReactQueryProvider>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-svh flex-col bg-background">{children}</div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
