import Demo from "./components/views/Demo"
import SignIn from "./components/views/SignIn"
import { getServerSession } from "next-auth/next"
import { options } from "./options"

export default async function Home() {
  const session = await getServerSession(options)
  return <main>{session?.user?.name ? <Demo user={session.user.name} /> : <SignIn />}</main>
}
