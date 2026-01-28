import { Cpu } from "lucide-react"
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
          <Cpu size={35} color="#10b981" />
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