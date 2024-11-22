import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4'>
      <SignUp />
    </div>
  )
}