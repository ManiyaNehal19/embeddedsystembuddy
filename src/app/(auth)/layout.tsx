export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
            <path d="M9 9h6M9 12h6M9 15h6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Embedded Systems Buddy</h1>
      </div>

      <div className="w-full max-w-[450px]">
        {children}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Your gateway to STM32, Arduino, and IoT development
      </p>
    </div>
  )
}