import type { Metadata, Viewport } from 'next'
import { Inter, Syne, Space_Grotesk, Playfair_Display, Poppins, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const syne = Syne({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700', '800'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-accent' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'] })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['300', '400', '500', '700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-jb', weight: ['400', '500'] })

export const viewport: Viewport = {
  themeColor: '#0a0339',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Anmol Roy ',
  description: 'Build amazing, high-performance web experiences with cutting-edge AI integration and modern layout design.',
  generator: 'Anmol ',
  metadataBase: new URL('https://anmolroy.dev'),
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Vercel',
    'AI Integration',
    'Web Development',
    'Frontend Development',
    'UI/UX Design',
    'Performance Optimization',
    'Modern Web Apps',
    'Anmol Roy',
    'Portfolio Website',
    'Developer Portfolio',
    'Web Designer',
    'Creative Developer',
    'Tech Portfolio',
    'AI Developer',
    'Full Stack Developer',
    'Frontend Engineer',
    'Responsive Design',
    'SEO Optimized',
    'Vercel Deploy',
    'NextJS Portfolio',
    'Developer Blog',
    'Coding Portfolio',
    'JavaScript Developer',
    'React Developer',
    'TypeScript Developer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Anmol Roy | AI & Web Developer Portfolio',
    description: 'Custom, high-performing websites and AI integrations engineered for growth and search visibility.',
    url: 'https://anmolroy.dev',
    siteName: 'Anmol Roy |  AI & Web Developer',
    
    images: [
      {
        url: '/images/githubdp.jpg',
        width: 800,
        height: 800,
        alt: 'Anmol Roy - AI & Web Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anmol Roy |  AI & Web Developer',
    description: 'Custom, high-performing websites and AI integrations engineered for growth and search visibility.',
    creator: '@anmolroy_dev',
    images: ['/images/githubdp.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/images/mylogo.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/mylogo.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/mylogo.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/images/mylogo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${playfair.variable} ${poppins.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0339" />
        {/* Blocking script — runs before first paint, prevents theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored === 'light' || stored === 'dark' ? stored : null;
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
