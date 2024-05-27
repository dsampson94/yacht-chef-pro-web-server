import React from 'react';
import { Providers } from './providers';
import Header from '../components/Header';
import '../styles/tailwind.css';

export const metadata = {
    title: {
        template: 'Yacht Chef Pro',
        default:
            'Yacht Chef Pro - Home'
    },
    description: '',
    alternates: {
        types: {
            'application/rss+xml': `${ process.env.NEXT_PUBLIC_SITE_URL }/feed.xml`
        }
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="antialiased" suppressHydrationWarning>
        <body>
        <Providers>
            <Header />
            { children }
        </Providers>
        </body>
        </html>
    );
}