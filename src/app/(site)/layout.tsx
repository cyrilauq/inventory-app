import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../_components/global/header';
import Footer from '../_components/global/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Inventory manager',
    description: 'Application to manage your inventory for anything',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header></Header>
                {children}
                <Footer></Footer>
            </body>
        </html>
    );
};
