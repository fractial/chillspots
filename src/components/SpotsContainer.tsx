import Spot from '@/components/spot'
import { prisma } from '@/db'

function getSpots() {
  return prisma.spot.findMany()
}

export default async function SpotsContainer() {
  // await prisma.spot.create({ data: { title: 'Test', desc: 'Hello, Your Computer Has Virus', img: 'abcdef', lat: 50, lng: 50, } })
  const spots = await getSpots()

  console.log('ALLLLLL SPOTS', spots)

  return (
    <div className='h-full flex flex-col gap-4 my-4 overflow-y-scroll'>
      {spots.map((spot) => (
        <Spot key={spot.id} {...spot} />
      ))}
    </div>
  )
}