// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/components/theme-provider';
// import Navbar from '@/components/navbar';
// import { sidebar } from "@/components/sidebar";


// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'KeyMaster - Keyboard Shortcuts Directory',
//   description: 'Your ultimate guide to keyboard shortcuts for software, operating systems, games, and more',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <Navbar />
//           <div className="flex">
//             <main className="flex-1">
//               {children}
//             </main>
//             <sidebar />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

//version 2
// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SidebarWrapper from "@/components/sidebar-wrapper";
import { SectionsProvider } from "@/context/SectionsContext";
import CookieBanner from '@/components/CookieConsent'; // Ensure correct path


const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://boostmykey.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Boost My Key - Keyboard Shortcuts Directory",
  description: "Discover keyboard shortcuts for software, games, and operating systems. Boost My Key is your ultimate guide to mastering productivity.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: new URL("/", baseUrl).toString(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
   
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SectionsProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1 flex w-full max-w-screen-xl mx-auto">
                <main className="flex-1 transition-all duration-200 ease-in-out px-4 sm:px-6 py-8">
                  {children}
                  <CookieBanner  />
                </main>
                <SidebarWrapper />
              </div>
              <Footer />
            </div>
          </SectionsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
