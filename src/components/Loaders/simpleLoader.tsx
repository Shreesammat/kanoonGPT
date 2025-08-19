import { LoaderIcon } from "lucide-react"

export const SimpleLoader = () => {
  return (
    <div className='h-dvh w-screen fixed z-50 bg-background/70 flex gap-2 flex-col justify-center items-center'>
      <h1>Just a Second...</h1>
      <LoaderIcon className='animate-spin repeat-infinite ease-in' />
    </div>
  )
}