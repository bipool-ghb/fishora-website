import { Plus_Jakarta_Sans, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { CustomerAuthProvider } from '@/context/CustomerAuthContext'
import AppShell from '@/components/AppShell'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--f-font',
})

const bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--f-font-bn',
})

export const metadata = {
  title: 'Fishora — Fresh Halal Protein Store',
  description: 'Fresh fish, meat, eggs and prawns. Nationwide delivery from Ishwardi, Pabna. 100% Halal. Order via WhatsApp.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bengali.variable}`}>
      <body style={{ fontFamily: 'var(--f-font)' }}>
        <ThemeProvider>
          <CustomerAuthProvider>
            <CartProvider>
              <AppShell>{children}</AppShell>
            </CartProvider>
          </CustomerAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
