import Image from "next/image"

type SpotProps = {
  id: string
  title: string
  desc: string
  img: string
  lat: number
  lng: number
}

export default function Spot({ title, desc, img, lat, lng }: SpotProps) {
  return (
    <div className='w-80 h-fit bg-red-500 flex flex-col rounded-md p-4 mx-4'>
      <img className='w-fit h-auto rounded-md' src={img} alt='Image' />
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}