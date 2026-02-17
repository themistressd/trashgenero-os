'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Control de boot sequence via env vars
    const enableBootSequence = process.env.NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE !== 'false'
    const skipBoot = process.env.NEXT_PUBLIC_SKIP_BOOT === 'true'

    if (!enableBootSequence || skipBoot) {
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
