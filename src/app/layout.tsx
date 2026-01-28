import { type Metadata } from 'next'
import { Cpu } from "lucide-react"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Embedded Systems Buddy',
  description: 'IoT and Microcontroller Assistant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}>
         <nav className="bg-gray-800 w-full p-3 h-1/12 flex justify-between items-center">
  
  <div className="flex items-center gap-4">
    <Cpu size={35} color="#10b981" />
    <div className="flex flex-col text-white">
      <h4 className="font-semibold text-lg">Embedded Systems Buddy</h4>
      <p className="text-sm text-gray-400">IoT and Microcontroller Assistant</p>
    </div>
  </div>

  <div className="flex items-center gap-2">
    <SignedOut>
      <SignInButton>
        <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium text-sm h-10 px-4">
          Sign In
        </button>
      </SignInButton>

      <SignUpButton>
        <button className="bg-[#00A63E] hover:bg-[#038a34] text-white rounded-full font-medium text-sm h-10 px-4">
          Sign Up
        </button>
      </SignUpButton>
    </SignedOut>

    <SignedIn>
      <UserButton /> 
    </SignedIn>
  </div>
</nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}