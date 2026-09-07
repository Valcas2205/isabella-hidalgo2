import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://isabellahidalgo.com'),
  title: {
    default: 'Isabella Hidalgo — Fine Artist',
    template: '%s',
  },
  description: 'Pintura contemporánea sobre el color, la percepción, la memoria y la belleza silenciosa de lo cotidiano.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f3ee' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
