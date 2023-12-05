import type { Metadata } from 'next'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Inter, Kanit, Lato, Montserrat } from 'next/font/google'
import localFont from 'next/font/local';
import { NextFont, NextFontWithVariable } from 'next/dist/compiled/@next/font';

const soriafont = localFont({ src: "../public/fonts/soria-font.ttf", variable: "--font-soria" })
const montserrat = Montserrat({ variable: "--font-montserrat", weight: ['400', '600', '700', '800'], subsets: ["latin", 'latin-ext'] })
const kanit = Kanit({ weight: ['300', '400', '600', '700', '800'], subsets: ['latin', 'latin-ext'], variable: "--font-kanit" })
const lato = Lato({weight: ['300', '400', '700'], subsets: ['latin', 'latin-ext'], variable: '--font-lato'})
const inter = Inter({ weight: ['300', '400', '600', '700', '800'], subsets: ['latin', 'latin-ext'], variable: "--font-inter" })

export const metadata: Metadata = {
    title: 'Harvest Craft',
    description: 'A game make that you relaxing',
}

// convert font object to font class in string form
function generateFontclass() {
    const classList = [soriafont, montserrat, kanit, lato, inter] as NextFont[] | NextFontWithVariable[]
    let class_string = ""
    classList.map((item, index) => {
        if ('variable' in item) {
            class_string += item.variable
            if (index + 1 != classList.length) {
                class_string += " "
            }
        }
    })

    return class_string
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${generateFontclass()}`}>{children}</body>
        </html>
    )
}
