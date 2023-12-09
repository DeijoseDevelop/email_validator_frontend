import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { mainBackground } from '@/utils/images';

const inter = Roboto({
  weight: ["400", "500", "700"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Email validator',
  description: 'App to validate emails',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Image
          alt="background"
          src={mainBackground}
          fill
          style={{ zIndex: 1 }}
        />
        <main
          style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            left: 0,
            top: 0,
            position: "fixed",
            zIndex: 2,
          }}>
          {children}
        </main>
      </body>
    </html>
  )
}
