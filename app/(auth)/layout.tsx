import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Generated by create next app',
}

export default function AuthLayout({children}:{children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}