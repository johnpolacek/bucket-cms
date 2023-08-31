import { getServerSession } from "next-auth/next"
import { options } from "./options"
import { Bucket } from "."

export default async function Home() {
  const session = await getServerSession(options)
  return <main>{session?.user?.name ? <Bucket /> : <div className="w-full h-full justify-center py-32 text-xl italic text-center">Not authorized</div>}</main>
}
