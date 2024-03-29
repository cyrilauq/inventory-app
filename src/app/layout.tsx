import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/global/header';
import Footer from '../components/global/footer';

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
                <main className="flex flex-col justify-center items-center my-14 p-5">{children}</main>
                <Footer></Footer>
            </body>
        </html>
    );
};
