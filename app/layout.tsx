import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StrangerVoice - Random Voice Chat App | Talk to Strangers',
  description:
    'Meet new people worldwide with anonymous voice chat. StrangerVoice connects you with strangers instantly. Best Omegle alternative for voice calls. Free to download.',
  keywords:
    'omegle alternative, talk to strangers, random voice chat, anonymous voice call, meet new people app, stranger chat voice, random call app',
  metadataBase: new URL('https://strangervoice.net'),
  alternates: {
    canonical: 'https://strangervoice.net',
  },
  openGraph: {
    title: 'StrangerVoice - Random Voice Chat App | Talk to Strangers',
    description:
      'Meet new people worldwide with anonymous voice chat. StrangerVoice connects you with strangers instantly. Best Omegle alternative for voice calls. Free to download.',
    url: 'https://strangervoice.net',
    siteName: 'StrangerVoice',
    images: [
      {
        url: 'https://play-lh.googleusercontent.com/CdG03Ic09BqaJPpWDVLNs8BBxPm7WgxFrvkxZtDtrNot0IKDYXBxCLTRxtjdTpzTMm2UwVIvkFviIxS5nDyN=w526-h296-rw',
        width: 526,
        height: 296,
        alt: 'StrangerVoice App Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StrangerVoice - Random Voice Chat App',
    description:
      'Meet new people worldwide with anonymous voice chat. Free to download.',
    images: [
      'https://play-lh.googleusercontent.com/CdG03Ic09BqaJPpWDVLNs8BBxPm7WgxFrvkxZtDtrNot0IKDYXBxCLTRxtjdTpzTMm2UwVIvkFviIxS5nDyN=w526-h296-rw',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎙️</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
