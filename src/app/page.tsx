import Link from 'next/link'
import { Button } from './components/ui/Button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <p>Sometimes you don’t need a CMS. How about a Bucket?</p>
      <div className="text-center">
        <p className="pb-4">Try the admin interface</p>
        <Link href="/admin"><Button>Go to Demo</Button></Link>
      </div>
    </main>
  )
}
