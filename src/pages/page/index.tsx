import Link from 'next/link';
import '../../app/globals.css'
import DynamicExample from "@/components/DynamicExample";

export default function PageExampe() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-16">
      <div className="flex flex-col text-center gap-2">
        <h1>You're currently on Nextjs' Pages Router</h1>
        <Link className="hover:text-green-600" href="/">Go To Nextjs' App Router</Link>
      </div>
      <DynamicExample />
    </main>
  )
}