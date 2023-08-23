import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Rights from '@/components/Rights'

export const metadata: Metadata = {
    title: 'Main',
    description: 'Generated by create next app',
}

export default function MainLayout({children}:{children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className="bg-C6">
                <Navbar />
                    {children}
                {/* <Footer/> */}
                <Rights />
            </body>
        </html>
    )
}