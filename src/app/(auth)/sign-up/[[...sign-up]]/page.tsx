import { SignUp } from '@clerk/nextjs'
import { dark } from "@clerk/themes"; 


export default function Page() {
  return <SignUp path="/sign-up"
  appearance={{
        baseTheme: dark, 
        variables: {
          colorPrimary: '#00A63E',
          colorBackground: '#000000', 
          colorText: 'white',
        },
        elements: {
          card: "bg-black shadow-none border-none", 
          rootBox: "bg-black",
          headerTitle: "text-2xl font-bold text-white",
          headerSubtitle: "text-white/60",
          socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white",
          formButtonPrimary: "bg-[#00A63E] text-black hover:bg-[#3bbd6d]",
          footer: "bg-black",
          footerAction: "bg-black",
        }
      }}/>
}