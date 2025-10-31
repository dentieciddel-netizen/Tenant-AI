import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TenantAI - Property Management',
  description: 'AI-powered property management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}