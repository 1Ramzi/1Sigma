import {  Plus_Jakarta_Sans } from 'next/font/google'
import '../common/style/globals.css'
import Navbar from '@/common/component/navbar/Navbar'
import Footer from '@/common/module/Footer'
import { Providers } from '@/common/component/element/Providers'


const plus_Jakarta_Sans = Plus_Jakarta_Sans({subsets: ['latin']});

export const metadata = {
  title: 'Tradexa - Signaux de Trading Professionnels | Crypto, Forex & Indices',
  description: 'Recevez des signaux de trading fiables émis par des traders confirmés et expérimentés. Accédez gratuitement aux signaux en ouvrant un compte chez notre broker partenaire. Fini Telegram et les faux traders, place à une vraie application certifiée.',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${plus_Jakarta_Sans.className} dark:bg-black`}>
        <Providers>
        <div className='flex justify-center items-center'>
          <Navbar />
        </div>
        {children}
        <div className='flex justify-center items-center'>
          <Footer />
        </div>
        </Providers>
        </body>
    </html>
  )
}
