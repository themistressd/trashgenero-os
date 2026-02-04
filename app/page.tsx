'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Verificar si queremos saltar la boot sequence (desde .env.local)
    const skipBoot = process.env.NEXT_PUBLIC_SKIP_BOOT === 'true'
    
    if (skipBoot) {
      router.push('/desktop')
    } else {
      router.push('/bios')
    }
  }, [router])
  
  // Mostrar una pantalla negra mientras redirige
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="text-green-toxic font-mono animate-pulse">
        Initializing TrashGènero OS...
      </div>
    </div>
  )
}