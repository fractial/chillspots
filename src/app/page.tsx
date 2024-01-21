import dynamic from 'next/dynamic'
import SpotsContainer from '@/components/spotsContainer'

const Map = dynamic(() => import('@/components/map'), {
  ssr: false
})

export default function Home() {
  return (
    <main className='flex overflow-hidden'>
      <div className='w-fit h-screen'>
        <SpotsContainer />
      </div>
      <div className='w-full h-screen'>
        <Map />
      </div>
    </main>
  )
}