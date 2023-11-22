import DynamicExample from '@/components/DynamicExample'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-16">
      <div className="flex flex-col text-center gap-2">
        <h1>You're currently on Nextjs' App Router</h1>
        <Link className="hover:text-green-600" href="/page">Go To Nextjs' Pages Router</Link>
      </div>
      <DynamicExample />
    </main>
  )
}
